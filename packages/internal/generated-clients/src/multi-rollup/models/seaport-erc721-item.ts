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
import { ImmutableVerificationStatusEnum } from './immutable-verification-status-enum';

/**
 * 
 * @export
 * @interface SeaportERC721Item
 */
export interface SeaportERC721Item {
    /**
     * Token type user is offering, which in this case is ERC721
     * @type {string}
     * @memberof SeaportERC721Item
     */
    'type': SeaportERC721ItemTypeEnum;
    /**
     * Address of ERC721 token
     * @type {string}
     * @memberof SeaportERC721Item
     */
    'contract_address': string;
    /**
     * The name of the collection
     * @type {string}
     * @memberof SeaportERC721Item
     */
    'contract_name'?: string | null;
    /**
     * The URL of the NFT
     * @type {string}
     * @memberof SeaportERC721Item
     */
    'image_url'?: string;
    /**
     * The name of the NFT
     * @type {string}
     * @memberof SeaportERC721Item
     */
    'name'?: string | null;
    /**
     * ID of ERC721 token
     * @type {string}
     * @memberof SeaportERC721Item
     */
    'token_id': string;
    /**
     * 
     * @type {ImmutableVerificationStatusEnum}
     * @memberof SeaportERC721Item
     */
    'immutable_verification_status': ImmutableVerificationStatusEnum;
}

export const SeaportERC721ItemTypeEnum = {
    Erc721: 'ERC721'
} as const;

export type SeaportERC721ItemTypeEnum = typeof SeaportERC721ItemTypeEnum[keyof typeof SeaportERC721ItemTypeEnum];


