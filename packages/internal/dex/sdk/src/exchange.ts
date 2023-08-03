import { ethers } from 'ethers';
import { CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core';
import assert from 'assert';
import {
  DuplicateAddressesError, InvalidAddressError, InvalidMaxHopsError, InvalidSlippageError,
} from 'errors';
import { fetchGasPrice } from 'lib/transactionUtils/gas';
import { getApproval } from 'lib/transactionUtils/approval';
import { getQuote } from 'lib/transactionUtils/getQuote';
import {
  BASIS_POINT_PRECISION,
  DEFAULT_DEADLINE, DEFAULT_MAX_HOPS, DEFAULT_SLIPPAGE, MAX_MAX_HOPS, MIN_MAX_HOPS,
} from './constants';

import { Router } from './lib/router';
import { getERC20Decimals, isValidNonZeroAddress } from './lib/utils';
import {
  ExchangeModuleConfiguration, SecondaryFee, TokenInfo, TransactionResponse,
} from './types';
import { getSwap } from './lib/transactionUtils/swap';
import { ExchangeConfiguration } from './config';

function subtractSecondaryFeesIfNecessary(
  amount: CurrencyAmount<Token>,
  secondaryFees: SecondaryFee[],
  tradeType: TradeType,
) {
  if (tradeType === TradeType.EXACT_OUTPUT) {
    // For an exact output swap, we do not need to subtract fees from the given amount
    return amount;
  }

  let totalFees = CurrencyAmount.fromRawAmount(amount.currency, 0);
  for (let i = 0; i < secondaryFees.length; i++) {
    const feeAmount = amount.multiply(secondaryFees[i].feeBasisPoints).divide(BASIS_POINT_PRECISION);
    totalFees = totalFees.add(feeAmount);
  }

  // Subtract the fee amount from the given amount
  return amount.subtract(totalFees);
}

function addSecondaryFeesIfNecessary(
  amount: ethers.BigNumber,
  secondaryFees: SecondaryFee[],
  tradeType: TradeType,
) {
  if (tradeType === TradeType.EXACT_INPUT) {
    // For an exact input swap, we do not need to add fees to the given amount
    return amount;
  }

  let totalFees = ethers.BigNumber.from(0);
  for (let i = 0; i < secondaryFees.length; i++) {
    const feeAmount = amount.mul(secondaryFees[i].feeBasisPoints).div(BASIS_POINT_PRECISION);
    totalFees = totalFees.add(feeAmount);
  }

  // Add the fee amount to the given amount
  return amount.add(totalFees);
}

export class Exchange {
  private provider: ethers.providers.JsonRpcProvider;

  private router: Router;

  private chainId: number;

  private nativeToken: TokenInfo;

  private secondaryFees: SecondaryFee[];

  constructor(configuration: ExchangeModuleConfiguration) {
    const config = new ExchangeConfiguration(configuration);

    this.chainId = config.chain.chainId;
    this.nativeToken = config.chain.nativeToken;
    this.secondaryFees = config.secondaryFees;

    this.provider = new ethers.providers.JsonRpcProvider(
      config.chain.rpcUrl,
    );

    this.router = new Router(
      this.provider,
      config.chain.commonRoutingTokens,
      {
        multicallAddress: config.chain.contracts.multicall,
        factoryAddress: config.chain.contracts.coreFactory,
        quoterAddress: config.chain.contracts.quoterV2,
        peripheryRouterAddress: config.chain.contracts.peripheryRouter,
        secondaryFeeAddress: config.chain.contracts.secondaryFee,
      },
    );
  }

  private static validate(
    tokenInAddress: string,
    tokenOutAddress: string,
    maxHops: number,
    slippagePercent: number,
    fromAddress: string,
  ) {
    assert(isValidNonZeroAddress(fromAddress), new InvalidAddressError('invalid from address'));
    assert(isValidNonZeroAddress(tokenInAddress), new InvalidAddressError('invalid token in address'));
    assert(isValidNonZeroAddress(tokenOutAddress), new InvalidAddressError('invalid token out address'));
    assert(tokenInAddress.toLocaleLowerCase() !== tokenOutAddress.toLocaleLowerCase(), new DuplicateAddressesError());
    assert(maxHops <= MAX_MAX_HOPS, new InvalidMaxHopsError('max hops must be less than or equal to 10'));
    assert(maxHops >= MIN_MAX_HOPS, new InvalidMaxHopsError('max hops must be greater than or equal to 1'));
    assert(slippagePercent <= 50, new InvalidSlippageError('slippage percent must be less than or equal to 50'));
    assert(slippagePercent >= 0, new InvalidSlippageError('slippage percent must be greater than or equal to 0'));
  }

  private async getUnsignedSwapTx(
    fromAddress: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    amount: ethers.BigNumberish,
    slippagePercent: number,
    maxHops: number,
    deadline: number,
    tradeType: TradeType,
  ): Promise<TransactionResponse> {
    Exchange.validate(tokenInAddress, tokenOutAddress, maxHops, slippagePercent, fromAddress);

    // get the decimals of the tokens that will be swapped
    const [tokenInDecimals, tokenOutDecimals] = await Promise.all([
      getERC20Decimals(tokenInAddress, this.provider),
      getERC20Decimals(tokenOutAddress, this.provider),
    ]);

    const tokenIn: Token = new Token(
      this.chainId,
      tokenInAddress,
      tokenInDecimals,
    );
    const tokenOut: Token = new Token(
      this.chainId,
      tokenOutAddress,
      tokenOutDecimals,
    );

    // determine which amount was specified for the swap from the TradeType
    let amountSpecified: CurrencyAmount<Token>;
    let otherToken: Token;
    if (tradeType === TradeType.EXACT_INPUT) {
      amountSpecified = CurrencyAmount.fromRawAmount(tokenIn, amount.toString());
      otherToken = tokenOut;
    } else {
      amountSpecified = CurrencyAmount.fromRawAmount(tokenOut, amount.toString());
      otherToken = tokenIn;
    }

    // Handle fees for exact input trades
    const amountWithFees = subtractSecondaryFeesIfNecessary(amountSpecified, this.secondaryFees, tradeType);

    const routeAndQuote = await this.router.findOptimalRoute(
      amountWithFees,
      otherToken,
      tradeType,
      this.secondaryFees,
      maxHops,
    );

    // get gas details
    const gasPrice = await fetchGasPrice(this.provider);

    // we always use the tokenIn address because we are always selling the tokenIn
    const approval = await getApproval(
      this.nativeToken,
      this.provider,
      fromAddress,
      tokenInAddress,
      ethers.BigNumber.from(amount),
      this.router.routingContracts.peripheryRouterAddress,
      gasPrice,
    );

    // Handle amount out trades here (post-quote)
    routeAndQuote.trade.amountIn = addSecondaryFeesIfNecessary(
      routeAndQuote.trade.amountIn,
      this.secondaryFees,
      tradeType,
    );

    // This should have the amount in that the USER specifies,
    // not the modified amount in for the quote
    const swap = getSwap(
      this.nativeToken,
      routeAndQuote,
      fromAddress,
      slippagePercent,
      deadline,
      this.router.routingContracts.peripheryRouterAddress,
      this.router.routingContracts.secondaryFeeAddress,
      gasPrice,
      this.secondaryFees,
    );

    const quote = getQuote(otherToken, tradeType, routeAndQuote.trade, slippagePercent);

    return {
      approval,
      swap,
      quote,
    };
  }

  /**
   * Get the unsigned swap transaction given the amount to sell.
   * Includes quote details for the swap.
   *
   * @param {string} fromAddress The public address that will sign and submit the transaction.
   * @param {string} tokenInAddress Token address to sell.
   * @param {string} tokenOutAddress Token address to buy.
   * @param {ethers.BigNumberish} amountIn Amount to sell.
   * @param {number} slippagePercent (optional) The percentage of slippage tolerance. Default = 0.1. Max = 50. Min = 0.
   * @param {number} maxHops (optional) Maximum hops allowed in optimal route. Default is 2.
   * @param {number} deadline (optional) Latest time swap can execute. Default is 15 minutes.
   * @return {TransactionResponse} The result containing the unsigned transaction and details of the swap.
   */
  public async getUnsignedSwapTxFromAmountIn(
    fromAddress: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    amountIn: ethers.BigNumberish,
    slippagePercent: number = DEFAULT_SLIPPAGE,
    maxHops: number = DEFAULT_MAX_HOPS,
    deadline: number = DEFAULT_DEADLINE,
  ): Promise<TransactionResponse> {
    return await this.getUnsignedSwapTx(
      fromAddress,
      tokenInAddress,
      tokenOutAddress,
      amountIn,
      slippagePercent,
      maxHops,
      deadline,
      TradeType.EXACT_INPUT,
    );
  }

  /**
   * Get the unsigned swap transaction given the amount to buy.
   * Includes quote details for the swap.
   *
   * @param {string} fromAddress The public address that will sign and submit the transaction.
   * @param {string} tokenInAddress Token address to sell.
   * @param {string} tokenOutAddress Token address to buy.
   * @param {ethers.BigNumberish} amountOut Amount to buy.
   * @param {number} slippagePercent (optional) The percentage of slippage tolerance. Default = 0.1. Max = 50. Min = 0.
   * @param {number} maxHops (optional) Maximum hops allowed in optimal route. Default is 2.
   * @param {number} deadline (optional) Latest time swap can execute. Default is 15 minutes.
   * @return {TransactionResponse} The result containing the unsigned transaction and details of the swap.
   */
  public async getUnsignedSwapTxFromAmountOut(
    fromAddress: string,
    tokenInAddress: string,
    tokenOutAddress: string,
    amountOut: ethers.BigNumberish,
    slippagePercent: number = DEFAULT_SLIPPAGE,
    maxHops: number = DEFAULT_MAX_HOPS,
    deadline: number = DEFAULT_DEADLINE,
  ): Promise<TransactionResponse> {
    return await this.getUnsignedSwapTx(
      fromAddress,
      tokenInAddress,
      tokenOutAddress,
      amountOut,
      slippagePercent,
      maxHops,
      deadline,
      TradeType.EXACT_OUTPUT,
    );
  }
}
