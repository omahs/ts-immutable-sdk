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
 * 
 * @export
 * @interface Listing
 */
export interface Listing {
    /**
     * Global Order identifier
     * @type {string}
     * @memberof Listing
     */
    'listing_id': string;
    /**
     * 
     * @type {MarketPriceDetails}
     * @memberof Listing
     */
    'price_details': MarketPriceDetails;
    /**
     * Token ID
     * @type {string}
     * @memberof Listing
     */
    'token_id': string;
    /**
     * ETH Address of collection that the asset belongs to
     * @type {string}
     * @memberof Listing
     */
    'contract_address': string;
    /**
     * ETH Address of listing creator
     * @type {string}
     * @memberof Listing
     */
    'creator': string;
    /**
     * Amount of token included in the listing
     * @type {string}
     * @memberof Listing
     */
    'amount': string;
}
