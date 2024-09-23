/* tslint:disable */
/* eslint-disable */
/**
 * Immutable zkEVM API
 * Immutable Multi Rollup API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { ERC20Token } from './erc20-token';
// May contain unused imports in some cases
// @ts-ignore
import { NativeToken } from './native-token';

/**
 * @type PricingDataToken
 * Token details
 * @export
 */
export type PricingDataToken = { type: 'ERC20' } & ERC20Token | { type: 'NATIVE' } & NativeToken;


