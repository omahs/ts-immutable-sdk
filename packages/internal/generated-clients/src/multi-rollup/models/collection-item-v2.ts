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
import { ItemMarketData } from './item-market-data';
// May contain unused imports in some cases
// @ts-ignore
import { Network } from './network';
// May contain unused imports in some cases
// @ts-ignore
import { TokenType } from './token-type';

/**
 * Item in a collection V2
 * @export
 * @interface CollectionItemV2
 */
export interface CollectionItemV2 {
    /**
     * 
     * @type {Network}
     * @memberof CollectionItemV2
     */
    'network': Network;
    /**
     * Name
     * @type {string}
     * @memberof CollectionItemV2
     */
    'name'?: string;
    /**
     * Description
     * @type {string}
     * @memberof CollectionItemV2
     */
    'description'?: string;
    /**
     * Image
     * @type {string}
     * @memberof CollectionItemV2
     */
    'image'?: string;
    /**
     * Image
     * @type {string}
     * @memberof CollectionItemV2
     */
    'animation_url'?: string;
    /**
     * Token ID
     * @type {string}
     * @memberof CollectionItemV2
     */
    'token_id': string;
    /**
     * Ethereum address
     * @type {string}
     * @memberof CollectionItemV2
     */
    'owner': string;
    /**
     * Balance
     * @type {string}
     * @memberof CollectionItemV2
     */
    'balance': string;
    /**
     * 
     * @type {TokenType}
     * @memberof CollectionItemV2
     */
    'token_type': TokenType;
    /**
     * 
     * @type {ItemMarketData}
     * @memberof CollectionItemV2
     */
    'market_data'?: ItemMarketData;
    /**
     * Acquired at
     * @type {string}
     * @memberof CollectionItemV2
     */
    'acquired_at'?: string;
}



