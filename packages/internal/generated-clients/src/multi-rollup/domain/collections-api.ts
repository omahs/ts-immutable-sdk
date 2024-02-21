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
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { APIError400 } from '../models';
// @ts-ignore
import { APIError401 } from '../models';
// @ts-ignore
import { APIError403 } from '../models';
// @ts-ignore
import { APIError404 } from '../models';
// @ts-ignore
import { APIError500 } from '../models';
// @ts-ignore
import { GetCollectionResult } from '../models';
// @ts-ignore
import { ListCollectionsResult } from '../models';
// @ts-ignore
import { RefreshCollectionMetadataRequest } from '../models';
// @ts-ignore
import { RefreshCollectionMetadataResult } from '../models';
/**
 * CollectionsApi - axios parameter creator
 * @export
 */
export const CollectionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get collection by contract address
         * @summary Get collection by contract address
         * @param {string} contractAddress The address contract
         * @param {string} chainName The name of chain
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCollection: async (contractAddress: string, chainName: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'contractAddress' is not null or undefined
            assertParamExists('getCollection', 'contractAddress', contractAddress)
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('getCollection', 'chainName', chainName)
            const localVarPath = `/v1/chains/{chain_name}/collections/{contract_address}`
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
         * List all collections
         * @summary List all collections
         * @param {string} chainName The name of chain
         * @param {Array<string>} [contractAddress] List of contract addresses to filter by
         * @param {string} [fromUpdatedAt] Datetime to use as the oldest updated timestamp
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {number} [pageSize] Maximum number of items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCollections: async (chainName: string, contractAddress?: Array<string>, fromUpdatedAt?: string, pageCursor?: string, pageSize?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('listCollections', 'chainName', chainName)
            const localVarPath = `/v1/chains/{chain_name}/collections`
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

            if (contractAddress) {
                localVarQueryParameter['contract_address'] = contractAddress;
            }

            if (fromUpdatedAt !== undefined) {
                localVarQueryParameter['from_updated_at'] = (fromUpdatedAt as any instanceof Date) ?
                    (fromUpdatedAt as any).toISOString() :
                    fromUpdatedAt;
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
        /**
         * List collections by NFT owner account address
         * @summary List collections by NFT owner
         * @param {string} accountAddress Account address
         * @param {string} chainName The name of chain
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {number} [pageSize] Maximum number of items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCollectionsByNFTOwner: async (accountAddress: string, chainName: string, pageCursor?: string, pageSize?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'accountAddress' is not null or undefined
            assertParamExists('listCollectionsByNFTOwner', 'accountAddress', accountAddress)
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('listCollectionsByNFTOwner', 'chainName', chainName)
            const localVarPath = `/v1/chains/{chain_name}/accounts/{account_address}/collections`
                .replace(`{${"account_address"}}`, encodeURIComponent(String(accountAddress)))
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
        /**
         * Refresh collection metadata
         * @summary Refresh collection metadata
         * @param {string} contractAddress The address contract
         * @param {string} chainName The name of chain
         * @param {RefreshCollectionMetadataRequest} refreshCollectionMetadataRequest The request body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshCollectionMetadata: async (contractAddress: string, chainName: string, refreshCollectionMetadataRequest: RefreshCollectionMetadataRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'contractAddress' is not null or undefined
            assertParamExists('refreshCollectionMetadata', 'contractAddress', contractAddress)
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('refreshCollectionMetadata', 'chainName', chainName)
            // verify required parameter 'refreshCollectionMetadataRequest' is not null or undefined
            assertParamExists('refreshCollectionMetadata', 'refreshCollectionMetadataRequest', refreshCollectionMetadataRequest)
            const localVarPath = `/v1/chains/{chain_name}/collections/{contract_address}/refresh-metadata`
                .replace(`{${"contract_address"}}`, encodeURIComponent(String(contractAddress)))
                .replace(`{${"chain_name"}}`, encodeURIComponent(String(chainName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ImmutableApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "x-immutable-api-key", configuration)

            // authentication BearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(refreshCollectionMetadataRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CollectionsApi - functional programming interface
 * @export
 */
export const CollectionsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CollectionsApiAxiosParamCreator(configuration)
    return {
        /**
         * Get collection by contract address
         * @summary Get collection by contract address
         * @param {string} contractAddress The address contract
         * @param {string} chainName The name of chain
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCollection(contractAddress: string, chainName: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetCollectionResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCollection(contractAddress, chainName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List all collections
         * @summary List all collections
         * @param {string} chainName The name of chain
         * @param {Array<string>} [contractAddress] List of contract addresses to filter by
         * @param {string} [fromUpdatedAt] Datetime to use as the oldest updated timestamp
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {number} [pageSize] Maximum number of items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listCollections(chainName: string, contractAddress?: Array<string>, fromUpdatedAt?: string, pageCursor?: string, pageSize?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListCollectionsResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listCollections(chainName, contractAddress, fromUpdatedAt, pageCursor, pageSize, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * List collections by NFT owner account address
         * @summary List collections by NFT owner
         * @param {string} accountAddress Account address
         * @param {string} chainName The name of chain
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {number} [pageSize] Maximum number of items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listCollectionsByNFTOwner(accountAddress: string, chainName: string, pageCursor?: string, pageSize?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListCollectionsResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listCollectionsByNFTOwner(accountAddress, chainName, pageCursor, pageSize, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Refresh collection metadata
         * @summary Refresh collection metadata
         * @param {string} contractAddress The address contract
         * @param {string} chainName The name of chain
         * @param {RefreshCollectionMetadataRequest} refreshCollectionMetadataRequest The request body
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async refreshCollectionMetadata(contractAddress: string, chainName: string, refreshCollectionMetadataRequest: RefreshCollectionMetadataRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RefreshCollectionMetadataResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.refreshCollectionMetadata(contractAddress, chainName, refreshCollectionMetadataRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CollectionsApi - factory interface
 * @export
 */
export const CollectionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CollectionsApiFp(configuration)
    return {
        /**
         * Get collection by contract address
         * @summary Get collection by contract address
         * @param {CollectionsApiGetCollectionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCollection(requestParameters: CollectionsApiGetCollectionRequest, options?: AxiosRequestConfig): AxiosPromise<GetCollectionResult> {
            return localVarFp.getCollection(requestParameters.contractAddress, requestParameters.chainName, options).then((request) => request(axios, basePath));
        },
        /**
         * List all collections
         * @summary List all collections
         * @param {CollectionsApiListCollectionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCollections(requestParameters: CollectionsApiListCollectionsRequest, options?: AxiosRequestConfig): AxiosPromise<ListCollectionsResult> {
            return localVarFp.listCollections(requestParameters.chainName, requestParameters.contractAddress, requestParameters.fromUpdatedAt, requestParameters.pageCursor, requestParameters.pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * List collections by NFT owner account address
         * @summary List collections by NFT owner
         * @param {CollectionsApiListCollectionsByNFTOwnerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCollectionsByNFTOwner(requestParameters: CollectionsApiListCollectionsByNFTOwnerRequest, options?: AxiosRequestConfig): AxiosPromise<ListCollectionsResult> {
            return localVarFp.listCollectionsByNFTOwner(requestParameters.accountAddress, requestParameters.chainName, requestParameters.pageCursor, requestParameters.pageSize, options).then((request) => request(axios, basePath));
        },
        /**
         * Refresh collection metadata
         * @summary Refresh collection metadata
         * @param {CollectionsApiRefreshCollectionMetadataRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshCollectionMetadata(requestParameters: CollectionsApiRefreshCollectionMetadataRequest, options?: AxiosRequestConfig): AxiosPromise<RefreshCollectionMetadataResult> {
            return localVarFp.refreshCollectionMetadata(requestParameters.contractAddress, requestParameters.chainName, requestParameters.refreshCollectionMetadataRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getCollection operation in CollectionsApi.
 * @export
 * @interface CollectionsApiGetCollectionRequest
 */
export interface CollectionsApiGetCollectionRequest {
    /**
     * The address contract
     * @type {string}
     * @memberof CollectionsApiGetCollection
     */
    readonly contractAddress: string

    /**
     * The name of chain
     * @type {string}
     * @memberof CollectionsApiGetCollection
     */
    readonly chainName: string
}

/**
 * Request parameters for listCollections operation in CollectionsApi.
 * @export
 * @interface CollectionsApiListCollectionsRequest
 */
export interface CollectionsApiListCollectionsRequest {
    /**
     * The name of chain
     * @type {string}
     * @memberof CollectionsApiListCollections
     */
    readonly chainName: string

    /**
     * List of contract addresses to filter by
     * @type {Array<string>}
     * @memberof CollectionsApiListCollections
     */
    readonly contractAddress?: Array<string>

    /**
     * Datetime to use as the oldest updated timestamp
     * @type {string}
     * @memberof CollectionsApiListCollections
     */
    readonly fromUpdatedAt?: string

    /**
     * Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
     * @type {string}
     * @memberof CollectionsApiListCollections
     */
    readonly pageCursor?: string

    /**
     * Maximum number of items to return
     * @type {number}
     * @memberof CollectionsApiListCollections
     */
    readonly pageSize?: number
}

/**
 * Request parameters for listCollectionsByNFTOwner operation in CollectionsApi.
 * @export
 * @interface CollectionsApiListCollectionsByNFTOwnerRequest
 */
export interface CollectionsApiListCollectionsByNFTOwnerRequest {
    /**
     * Account address
     * @type {string}
     * @memberof CollectionsApiListCollectionsByNFTOwner
     */
    readonly accountAddress: string

    /**
     * The name of chain
     * @type {string}
     * @memberof CollectionsApiListCollectionsByNFTOwner
     */
    readonly chainName: string

    /**
     * Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
     * @type {string}
     * @memberof CollectionsApiListCollectionsByNFTOwner
     */
    readonly pageCursor?: string

    /**
     * Maximum number of items to return
     * @type {number}
     * @memberof CollectionsApiListCollectionsByNFTOwner
     */
    readonly pageSize?: number
}

/**
 * Request parameters for refreshCollectionMetadata operation in CollectionsApi.
 * @export
 * @interface CollectionsApiRefreshCollectionMetadataRequest
 */
export interface CollectionsApiRefreshCollectionMetadataRequest {
    /**
     * The address contract
     * @type {string}
     * @memberof CollectionsApiRefreshCollectionMetadata
     */
    readonly contractAddress: string

    /**
     * The name of chain
     * @type {string}
     * @memberof CollectionsApiRefreshCollectionMetadata
     */
    readonly chainName: string

    /**
     * The request body
     * @type {RefreshCollectionMetadataRequest}
     * @memberof CollectionsApiRefreshCollectionMetadata
     */
    readonly refreshCollectionMetadataRequest: RefreshCollectionMetadataRequest
}

/**
 * CollectionsApi - object-oriented interface
 * @export
 * @class CollectionsApi
 * @extends {BaseAPI}
 */
export class CollectionsApi extends BaseAPI {
    /**
     * Get collection by contract address
     * @summary Get collection by contract address
     * @param {CollectionsApiGetCollectionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CollectionsApi
     */
    public getCollection(requestParameters: CollectionsApiGetCollectionRequest, options?: AxiosRequestConfig) {
        return CollectionsApiFp(this.configuration).getCollection(requestParameters.contractAddress, requestParameters.chainName, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List all collections
     * @summary List all collections
     * @param {CollectionsApiListCollectionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CollectionsApi
     */
    public listCollections(requestParameters: CollectionsApiListCollectionsRequest, options?: AxiosRequestConfig) {
        return CollectionsApiFp(this.configuration).listCollections(requestParameters.chainName, requestParameters.contractAddress, requestParameters.fromUpdatedAt, requestParameters.pageCursor, requestParameters.pageSize, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List collections by NFT owner account address
     * @summary List collections by NFT owner
     * @param {CollectionsApiListCollectionsByNFTOwnerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CollectionsApi
     */
    public listCollectionsByNFTOwner(requestParameters: CollectionsApiListCollectionsByNFTOwnerRequest, options?: AxiosRequestConfig) {
        return CollectionsApiFp(this.configuration).listCollectionsByNFTOwner(requestParameters.accountAddress, requestParameters.chainName, requestParameters.pageCursor, requestParameters.pageSize, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Refresh collection metadata
     * @summary Refresh collection metadata
     * @param {CollectionsApiRefreshCollectionMetadataRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CollectionsApi
     */
    public refreshCollectionMetadata(requestParameters: CollectionsApiRefreshCollectionMetadataRequest, options?: AxiosRequestConfig) {
        return CollectionsApiFp(this.configuration).refreshCollectionMetadata(requestParameters.contractAddress, requestParameters.chainName, requestParameters.refreshCollectionMetadataRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

