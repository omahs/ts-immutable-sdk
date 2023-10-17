/* eslint-disable max-len */
import { Pool } from '@uniswap/v3-sdk';
import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { ethers } from 'ethers';
import { ProviderCallError } from 'errors';
import {
  Coin,
  ERC20, Native, Amount,
} from '../types';

export const quoteReturnMapping: { [signature: string]: string[] } = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '0xcdca1753': ['uint256', 'uint160[]', 'uint32[]', 'uint256'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '0xc6a5026a': ['uint256', 'uint160', 'uint32', 'uint256'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '0x2f80bb1d': ['uint256', 'uint160[]', 'uint32[]', 'uint256'],
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '0xbd21704a': ['uint256', 'uint160', 'uint32', 'uint256'],
};

/**
 * Returns true if poolA is equivalent to poolB
 * @param poolA one of the two pools
 * @param poolB the other pool
 */
export function poolEquals(poolA: Pool, poolB: Pool): boolean {
  return (
    poolA === poolB
    || (poolA.token0.equals(poolB.token0)
      && poolA.token1.equals(poolB.token1)
      && poolA.fee === poolB.fee)
  );
}

export async function getTokenDecimals(
  tokenAddress: string,
  nativeToken: Native,
  provider: ethers.providers.JsonRpcProvider,
): Promise<number> {
  if (tokenAddress === 'native') {
    return nativeToken.decimals;
  }

  const decimalsFunctionSig = ethers.utils.id('decimals()').substring(0, 10);

  try {
    const decimalsResult = await provider.call({
      to: tokenAddress,
      data: decimalsFunctionSig,
    });

    return parseInt(
      decimalsResult,
      16,
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown Error';
    throw new ProviderCallError(`failed to get ERC20 decimals: ${message}`);
  }
}

/**
 * Based on https://github.com/ethers-io/ethers.js/blob/main/src.ts/address/checks.ts#L51
 */
export function isValidNonZeroAddress(address: string): boolean {
  if (address === ethers.constants.AddressZero) {
    return false;
  }

  try {
    ethers.utils.getAddress(address);
    return true;
  } catch (error) {
    return false;
  }
}

export const erc20ToUniswapToken = (token: ERC20): Token => new Token(
  token.chainId,
  token.address,
  token.decimals,
  token.symbol,
  token.name,
);

export const uniswapTokenToERC20 = (token: Token): ERC20 => ({
  chainId: token.chainId,
  address: token.address,
  decimals: token.decimals,
  symbol: token.symbol,
  name: token.name,
  type: 'erc20',
});

export const toBigNumber = (amount: CurrencyAmount<Token>): ethers.BigNumber => (
  ethers.BigNumber.from(amount.multiply(amount.decimalScale).toExact())
);

export const toAmount = (amount: CurrencyAmount<Token>): Amount<ERC20> => ({
  token: uniswapTokenToERC20(amount.currency),
  value: toBigNumber(amount),
});

export const toCurrencyAmount = (amount: Amount<ERC20>): CurrencyAmount<Token> => {
  const token = erc20ToUniswapToken(amount.token);
  return CurrencyAmount.fromRawAmount(token, amount.value.toString());
};

export const newAmount = <T extends Coin>(amount: ethers.BigNumber, token: T): Amount<T> => ({
  value: amount,
  token,
});

export const isERC20 = (token: Coin): token is ERC20 => ('address' in token);

export const isERC20Amount = (amount: Amount<Coin>): amount is Amount<ERC20> => ('address' in amount.token);

export const isNative = (token: Coin): token is Native => !('address' in token);

export const addAmount = <T extends Coin>(a: Amount<T>, b: Amount<T>) => {
  if (isERC20(a.token) && isERC20(b.token)) {
    // Make sure the ERC20s have the same address
    if (a.token.address !== b.token.address) throw new Error('Token mismatch: token addresses must be the same');
    return { value: a.value.add(b.value), token: a.token };
  }

  // Native tokens have no address so there is nothing to validate
  return { value: a.value.add(b.value), token: a.token };
};

export const subtractAmount = <T extends Coin>(a: Amount<T>, b: Amount<T>) => {
  if (isERC20(a.token) && isERC20(b.token)) {
    // Make sure the ERC20s have the same address
    if (a.token.address !== b.token.address) throw new Error('Token mismatch: token addresses must be the same');
    return { value: a.value.sub(b.value), token: a.token };
  }

  // Native tokens have no address so there is nothing to validate
  return { value: a.value.sub(b.value), token: a.token };
};

export function maybeWrapToken(token: Coin, wrappedNativeToken: ERC20): ERC20 {
  // if it's already an ERC20, we don't need to wrap it, just return it
  if (isERC20(token)) return token;

  // if it's the native token, return it's wrapped version
  return wrappedNativeToken;
}

export function maybeWrapAmount(amount: Amount<Coin>, wrappedNativeToken: ERC20): Amount<ERC20> {
  return newAmount(amount.value, maybeWrapToken(amount.token, wrappedNativeToken));
}
