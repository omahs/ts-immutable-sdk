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
import { MarketPriceDetails } from './market-price-details';

/**
 * Last trade
 * @export
 * @interface LastTrade
 */
export interface LastTrade {
    /**
     * Trade ID
     * @type {string}
     * @memberof LastTrade
     */
    'trade_id': string;
    /**
     * Token id of the traded asset (uint256 as string)
     * @type {string}
     * @memberof LastTrade
     */
    'token_id': string;
    /**
     * Price details, list of payments involved in this trade
     * @type {Array<MarketPriceDetails>}
     * @memberof LastTrade
     */
    'price_details': Array<MarketPriceDetails>;
    /**
     * Amount of the trade (uint256 as string)
     * @type {string}
     * @memberof LastTrade
     */
    'amount': string;
    /**
     * When the trade was created
     * @type {string}
     * @memberof LastTrade
     */
    'created_at': string;
}

