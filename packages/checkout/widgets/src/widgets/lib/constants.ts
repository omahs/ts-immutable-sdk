import { Environment } from '@imtbl/config';
import { CheckoutErrorType, WalletProviderName } from '@imtbl/checkout-sdk';
import { WidgetTheme } from './types';
import { RetryType } from './retry';

export const NATIVE = 'NATIVE';

export const DEFAULT_TOKEN_DECIMALS = 18;
export const DEFAULT_TOKEN_FORMATTING_DECIMALS = 6;
// Used to enforce the number of decimals to show if the number is greater than 1
export const DEFAULT_GT_ONE_TOKEN_FORMATTING_DECIMALS = 2;
// Used to enforce the number of decimals in the input fields
export const DEFAULT_TOKEN_VALIDATION_DECIMALS = DEFAULT_TOKEN_FORMATTING_DECIMALS;

export const IMX_TOKEN_SYMBOL = 'IMX';
export const ETH_TOKEN_SYMBOL = 'ETH';

export const ZERO_BALANCE_STRING = '0.0';

export const IMX_ADDRESS_ZKEVM = '0x0000000000000000000000000000000000001010';

export const FAQS_LINK = 'https://support.immutable.com/en/';

/**
 * Delay between retries (milliseconds)
 */
export const DEFAULT_RETRY_DELAY = 10 * 1000;

/**
 * Default retry policy for fetching balances from remote.
 */
export const DEFAULT_BALANCE_RETRY_POLICY: RetryType = {
  retryIntervalMs: DEFAULT_RETRY_DELAY,
  retries: 60, // retry up to DEFAULT_RETRY_DELAY / 1000 minutes
  nonRetryable: (err: any) => err?.data?.code >= 500 || err.type === CheckoutErrorType.GET_ERC20_BALANCE_ERROR,
};

/**
 * Checkout Widget default env
 */
export const DEFAULT_ENV = Environment.SANDBOX;

/**
 * Checkout Widget default theme
 */
export const DEFAULT_THEME = WidgetTheme.DARK;

/**
 * Checkout Widget default provider
 */
export const DEFAULT_PROVIDER = WalletProviderName.METAMASK;

/**
 * Checkout Widget default onramp enabled flag
 */
export const DEFAULT_ON_RAMP_ENABLED = true;

/**
 * Checkout Widget default swap enabled flag
 */
export const DEFAULT_SWAP_ENABLED = true;

/**
 * Checkout Widget default bridge enabled flag
 */
export const DEFAULT_BRIDGE_ENABLED = true;

/**
 * Checkout Widget default refresh quote interval
 */
export const DEFAULT_QUOTE_REFRESH_INTERVAL = 30000;