import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { TradeType } from '@uniswap/sdk-core';
import { SecondaryFee } from 'lib';
import { Exchange } from './exchange';
import {
  mockRouterImplementation,
  setupSwapTxTest,
  TEST_PERIPHERY_ROUTER_ADDRESS,
  TEST_DEX_CONFIGURATION,
  TEST_GAS_PRICE,
  decodeMulticallExactInputOutputSingleWithoutFees,
  TEST_FEE_RECIPIENT,
  TEST_MAX_FEE_BASIS_POINTS,
  decodeMulticallExactInputOutputSingleWithFees,
  TEST_SECONDARY_FEE_ADDRESS,
} from './test/utils';
import { BASIS_POINT_PRECISION } from './constants';

jest.mock('@ethersproject/providers');
jest.mock('@ethersproject/contracts');
jest.mock('./lib/router');
jest.mock('./lib/utils', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esmodule: true,
  ...jest.requireActual('./lib/utils'),
  getERC20Decimals: async () => 18,
}));

const exactOutputSingleSignature = '0x5023b4df';
const exactOutputSingleWithFeesSignature = '0xed921d3c';

const DEFAULT_SLIPPAGE = 0.1; // 1/1000 = 0.001 = 0.1%
const APPROVED_AMOUNT = BigNumber.from('1000000000000000000');
const APPROVE_GAS_ESTIMATE = BigNumber.from('100000');

/**
 * Tests for getUnsignedSwapTxFromAmountOut are limited in scope compared to getUnsignedSwapTxFromAmountIn.
 * This is because the underlying logic is the same, and the tests for getUnsignedSwapTxFromAmountIn are more
 * comprehensive.
 * We therefore only test the happy path here to make sure the tokenIn and tokenOut are correctly set.
 */
describe('getUnsignedSwapTxFromAmountOut', () => {
  beforeAll(() => {
    (Contract as unknown as jest.Mock).mockImplementation(
      () => ({
        allowance: jest.fn().mockResolvedValue(APPROVED_AMOUNT),
        estimateGas: { approve: jest.fn().mockResolvedValue(APPROVE_GAS_ESTIMATE) },
      }),
    );

    (JsonRpcProvider as unknown as jest.Mock).mockImplementation(
      () => ({
        getFeeData: async () => ({
          maxFeePerGas: null,
          gasPrice: TEST_GAS_PRICE,
        }),
      }),
    ) as unknown as JsonRpcProvider;
  });

  describe('Swap with single pool with fees', () => {
    it('generates valid swap calldata', async () => {
      const secondaryFees: SecondaryFee[] = [
        { feeRecipient: TEST_FEE_RECIPIENT, feeBasisPoints: TEST_MAX_FEE_BASIS_POINTS },
      ];

      const params = setupSwapTxTest(DEFAULT_SLIPPAGE);

      mockRouterImplementation(params, TradeType.EXACT_OUTPUT);

      const exchange = new Exchange({ ...TEST_DEX_CONFIGURATION, secondaryFees });

      const { swap } = await exchange.getUnsignedSwapTxFromAmountOut(
        params.fromAddress,
        params.inputToken,
        params.outputToken,
        params.amountOut,
      );

      // The maxAmountIn is the amount out + fees + slippage
      const amountInBigNum = BigNumber.from(params.maxAmountIn);
      const expectedMaxAmountIn = amountInBigNum
        .add(amountInBigNum.mul(secondaryFees[0].feeBasisPoints).div(BASIS_POINT_PRECISION));

      const data = swap.transaction.data?.toString() || '';

      const { topLevelParams, swapParams } = decodeMulticallExactInputOutputSingleWithFees(data);

      expect(topLevelParams[1][0].slice(0, 10)).toBe(exactOutputSingleWithFeesSignature);

      expect(swapParams.tokenIn).toBe(params.inputToken); // input token
      expect(swapParams.tokenOut).toBe(params.outputToken); // output token
      expect(swapParams.fee).toBe(10000); // fee
      expect(swapParams.recipient).toBe(params.fromAddress); // recipient
      expect(swap.transaction.to).toBe(TEST_SECONDARY_FEE_ADDRESS); // to address
      expect(swap.transaction.from).toBe(params.fromAddress); // from address
      expect(swap.transaction.value).toBe('0x00'); // refers to 0ETH
      expect(swapParams.firstAmount.toString()).toBe(params.amountOut.toString()); // amount out
      expect(swapParams.secondAmount.toString()).toBe(expectedMaxAmountIn.toString()); // max amount in
      expect(swapParams.sqrtPriceLimitX96.toString()).toBe('0'); // sqrtPriceX96Limit
    });
  });

  describe('Swap with single pool without fees and default slippage tolerance', () => {
    it('generates valid swap calldata', async () => {
      const params = setupSwapTxTest(DEFAULT_SLIPPAGE);

      mockRouterImplementation(params, TradeType.EXACT_OUTPUT);

      const exchange = new Exchange(TEST_DEX_CONFIGURATION);

      const { swap } = await exchange.getUnsignedSwapTxFromAmountOut(
        params.fromAddress,
        params.inputToken,
        params.outputToken,
        params.amountOut,
      );

      const data = swap.transaction.data?.toString() || '';

      const { topLevelParams, swapParams } = decodeMulticallExactInputOutputSingleWithoutFees(data);

      expect(topLevelParams[1][0].slice(0, 10)).toBe(exactOutputSingleSignature);

      expect(swapParams.tokenIn).toBe(params.inputToken); // input token
      expect(swapParams.tokenOut).toBe(params.outputToken); // output token
      expect(swapParams.fee).toBe(10000); // fee
      expect(swapParams.recipient).toBe(params.fromAddress); // recipient
      expect(swap.transaction.to).toBe(TEST_PERIPHERY_ROUTER_ADDRESS); // to address
      expect(swap.transaction.from).toBe(params.fromAddress); // from address
      expect(swap.transaction.value).toBe('0x00'); // refers to 0ETH
      expect(swapParams.firstAmount.toString()).toBe(params.amountOut.toString()); // amount out
      expect(swapParams.secondAmount.toString()).toBe(params.maxAmountIn.toString()); // max amount in
      expect(swapParams.sqrtPriceLimitX96.toString()).toBe('0'); // sqrtPriceX96Limit
    });

    it('returns valid swap quote', async () => {
      const params = setupSwapTxTest(DEFAULT_SLIPPAGE);
      mockRouterImplementation(params, TradeType.EXACT_OUTPUT);

      const exchange = new Exchange(TEST_DEX_CONFIGURATION);

      const { quote } = await exchange.getUnsignedSwapTxFromAmountOut(
        params.fromAddress,
        params.inputToken,
        params.outputToken,
        params.amountIn,
      );

      expect(quote.amount.token.address).toEqual(params.inputToken);
      expect(quote.slippage).toBe(0.1);
      expect(quote.amount.value.toString()).toEqual('12300000000000');
      expect(quote.amountWithMaxSlippage.token.address).toEqual(
        params.inputToken,
      );
      expect(quote.amountWithMaxSlippage.value.toString()).toEqual(
        '12312300000000',
      );
    });
  });
});
