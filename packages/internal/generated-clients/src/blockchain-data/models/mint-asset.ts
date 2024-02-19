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
import { NFTMetadataRequest } from './nftmetadata-request';

/**
 * 
 * @export
 * @interface MintAsset
 */
export interface MintAsset {
    /**
     * The ID of this asset in the system that originates the mint request
     * @type {string}
     * @memberof MintAsset
     */
    'reference_id': string;
    /**
     * The address of the receiver
     * @type {string}
     * @memberof MintAsset
     */
    'owner_address': string;
    /**
     * 
     * @type {NFTMetadataRequest}
     * @memberof MintAsset
     */
    'metadata'?: NFTMetadataRequest;
}

