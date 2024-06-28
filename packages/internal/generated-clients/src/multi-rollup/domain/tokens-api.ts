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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { APIError400 } from '../models';
// @ts-ignore
import { APIError404 } from '../models';
// @ts-ignore
import { APIError500 } from '../models';
// @ts-ignore
import { AssetVerificationStatus } from '../models';
// @ts-ignore
import { GetTokenResult } from '../models';
// @ts-ignore
import { ListTokensResult } from '../models';
/**
 * TokensApi - axios parameter creator
 * @export
 */
export const TokensApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get single ERC20 token
         * @summary Get single ERC20 token
         * @param {string} contractAddress The address of contract
         * @param {string} chainName The name of chain
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getERC20Token: async (contractAddress: string, chainName: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'contractAddress' is not null or undefined
            assertParamExists('getERC20Token', 'contractAddress', contractAddress)
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('getERC20Token', 'chainName', chainName)
            const localVarPath = `/v1/chains/{chain_name}/tokens/{contract_address}`
                .replace(`{${"contract_address"}}`, encodeURIComponent(String(contractAddress)))
                .replace(`{${"chain_name"}}`, encodeURIComponent(String(chainName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * List ERC20 tokens
         * @summary List ERC20 tokens
         * @param {string} chainName The name of chain
         * @param {string} [fromUpdatedAt] Datetime to use as the oldest updated timestamp
         * @param {Array<AssetVerificationStatus>} [verificationStatus] List of verification status to filter by
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {number} [pageSize] Maximum number of items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listERC20Tokens: async (chainName: string, fromUpdatedAt?: string, verificationStatus?: Array<AssetVerificationStatus>, pageCursor?: string, pageSize?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('listERC20Tokens', 'chainName', chainName)
            const localVarPath = `/v1/chains/{chain_name}/tokens`
                .replace(`{${"chain_name"}}`, encodeURIComponent(String(chainName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (fromUpdatedAt !== undefined) {
                localVarQueryParameter['from_updated_at'] = (fromUpdatedAt as any instanceof Date) ?
                    (fromUpdatedAt as any).toISOString() :
                    fromUpdatedAt;
            }

            if (verificationStatus) {
                localVarQueryParameter['verification_status'] = verificationStatus;
            }

            if (pageCursor !== undefined) {
                localVarQueryParameter['page_cursor'] = pageCursor;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['page_size'] = pageSize;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TokensApi - functional programming interface
 * @export
 */
export const TokensApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TokensApiAxiosParamCreator(configuration)
    return {
        /**
         * Get single ERC20 token
         * @summary Get single ERC20 token
         * @param {string} contractAddress The address of contract
         * @param {string} chainName The name of chain
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getERC20Token(contractAddress: string, chainName: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetTokenResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getERC20Token(contractAddress, chainName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List ERC20 tokens
         * @summary List ERC20 tokens
         * @param {string} chainName The name of chain
         * @param {string} [fromUpdatedAt] Datetime to use as the oldest updated timestamp
         * @param {Array<AssetVerificationStatus>} [verificationStatus] List of verification status to filter by
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {number} [pageSize] Maximum number of items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listERC20Tokens(chainName: string, fromUpdatedAt?: string, verificationStatus?: Array<AssetVerificationStatus>, pageCursor?: string, pageSize?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListTokensResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listERC20Tokens(chainName, fromUpdatedAt, verificationStatus, pageCursor, pageSize, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TokensApi - factory interface
 * @export
 */
export const TokensApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TokensApiFp(configuration)
    return {
        /**
         * Get single ERC20 token
         * @summary Get single ERC20 token
         * @param {TokensApiGetERC20TokenRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getERC20Token(requestParameters: TokensApiGetERC20TokenRequest, options?: AxiosRequestConfig): AxiosPromise<GetTokenResult> {
            return localVarFp.getERC20Token(requestParameters.contractAddress, requestParameters.chainName, options).then((request) => request(axios, basePath));
        },
        /**
         * List ERC20 tokens
         * @summary List ERC20 tokens
         * @param {TokensApiListERC20TokensRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listERC20Tokens(requestParameters: TokensApiListERC20TokensRequest, options?: AxiosRequestConfig): AxiosPromise<ListTokensResult> {
            return localVarFp.listERC20Tokens(requestParameters.chainName, requestParameters.fromUpdatedAt, requestParameters.verificationStatus, requestParameters.pageCursor, requestParameters.pageSize, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getERC20Token operation in TokensApi.
 * @export
 * @interface TokensApiGetERC20TokenRequest
 */
export interface TokensApiGetERC20TokenRequest {
    /**
     * The address of contract
     * @type {string}
     * @memberof TokensApiGetERC20Token
     */
    readonly contractAddress: string

    /**
     * The name of chain
     * @type {string}
     * @memberof TokensApiGetERC20Token
     */
    readonly chainName: string
}

/**
 * Request parameters for listERC20Tokens operation in TokensApi.
 * @export
 * @interface TokensApiListERC20TokensRequest
 */
export interface TokensApiListERC20TokensRequest {
    /**
     * The name of chain
     * @type {string}
     * @memberof TokensApiListERC20Tokens
     */
    readonly chainName: string

    /**
     * Datetime to use as the oldest updated timestamp
     * @type {string}
     * @memberof TokensApiListERC20Tokens
     */
    readonly fromUpdatedAt?: string

    /**
     * List of verification status to filter by
     * @type {Array<AssetVerificationStatus>}
     * @memberof TokensApiListERC20Tokens
     */
    readonly verificationStatus?: Array<AssetVerificationStatus>

    /**
     * Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
     * @type {string}
     * @memberof TokensApiListERC20Tokens
     */
    readonly pageCursor?: string

    /**
     * Maximum number of items to return
     * @type {number}
     * @memberof TokensApiListERC20Tokens
     */
    readonly pageSize?: number
}

/**
 * TokensApi - object-oriented interface
 * @export
 * @class TokensApi
 * @extends {BaseAPI}
 */
export class TokensApi extends BaseAPI {
    /**
     * Get single ERC20 token
     * @summary Get single ERC20 token
     * @param {TokensApiGetERC20TokenRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TokensApi
     */
    public getERC20Token(requestParameters: TokensApiGetERC20TokenRequest, options?: AxiosRequestConfig): Promise<AxiosResponse<GetTokenResult, any>> {
        return TokensApiFp(this.configuration).getERC20Token(requestParameters.contractAddress, requestParameters.chainName, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List ERC20 tokens
     * @summary List ERC20 tokens
     * @param {TokensApiListERC20TokensRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TokensApi
     */
    public listERC20Tokens(requestParameters: TokensApiListERC20TokensRequest, options?: AxiosRequestConfig): Promise<AxiosResponse<ListTokensResult, any>> {
        return TokensApiFp(this.configuration).listERC20Tokens(requestParameters.chainName, requestParameters.fromUpdatedAt, requestParameters.verificationStatus, requestParameters.pageCursor, requestParameters.pageSize, options).then((request) => request(this.axios, this.basePath));
    }
}

