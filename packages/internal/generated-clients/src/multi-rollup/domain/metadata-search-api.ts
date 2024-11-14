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
import { APIError429 } from '../models';
// @ts-ignore
import { APIError500 } from '../models';
// @ts-ignore
import { ListFiltersResult } from '../models';
// @ts-ignore
import { SearchNFTsResult } from '../models';
// @ts-ignore
import { SearchStacksResult } from '../models';
/**
 * MetadataSearchApi - axios parameter creator
 * @export
 */
export const MetadataSearchApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get list of metadata filters
         * @summary Get list of metadata attribute filters
         * @param {string} chainName The name of chain
         * @param {string} contractAddress Contract addresses for collection
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFilters: async (chainName: string, contractAddress: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('listFilters', 'chainName', chainName)
            // verify required parameter 'contractAddress' is not null or undefined
            assertParamExists('listFilters', 'contractAddress', contractAddress)
            const localVarPath = `/v1/chains/{chain_name}/search/filters/{contract_address}`
                .replace(`{${"chain_name"}}`, encodeURIComponent(String(chainName)))
                .replace(`{${"contract_address"}}`, encodeURIComponent(String(contractAddress)));
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
         * Search NFTs
         * @summary Search NFTs
         * @param {string} chainName The name of chain
         * @param {Array<string>} contractAddress List of contract addresses to filter by
         * @param {string} [accountAddress] Account address to filter by
         * @param {Array<string>} [stackId] Filters NFTs that belong to any of these stacks
         * @param {boolean} [onlyIncludeOwnerListings] Whether the listings should include only the owner created listings
         * @param {number} [pageSize] Number of results to return per page
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchNFTs: async (chainName: string, contractAddress: Array<string>, accountAddress?: string, stackId?: Array<string>, onlyIncludeOwnerListings?: boolean, pageSize?: number, pageCursor?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('searchNFTs', 'chainName', chainName)
            // verify required parameter 'contractAddress' is not null or undefined
            assertParamExists('searchNFTs', 'contractAddress', contractAddress)
            const localVarPath = `/v1/chains/{chain_name}/search/nfts`
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

            if (accountAddress !== undefined) {
                localVarQueryParameter['account_address'] = accountAddress;
            }

            if (stackId) {
                localVarQueryParameter['stack_id'] = stackId;
            }

            if (onlyIncludeOwnerListings !== undefined) {
                localVarQueryParameter['only_include_owner_listings'] = onlyIncludeOwnerListings;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['page_size'] = pageSize;
            }

            if (pageCursor !== undefined) {
                localVarQueryParameter['page_cursor'] = pageCursor;
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
         * Search NFT stacks
         * @summary Search NFT stacks
         * @param {string} chainName The name of chain
         * @param {Array<string>} contractAddress List of contract addresses to filter by
         * @param {string} [accountAddress] Account address to filter by
         * @param {boolean} [onlyIncludeOwnerListings] Whether to the listings should include only the owner created listings
         * @param {boolean} [onlyIfHasActiveListings] Filters results to include only stacks that have a current active listing. False and \&#39;null\&#39; return all unfiltered stacks.
         * @param {string} [traits] JSON encoded traits to filter by. e.g. encodeURIComponent(JSON.stringify({\&quot;rarity\&quot;: {\&quot;values\&quot;: [\&quot;common\&quot;, \&quot;rare\&quot;], \&quot;condition\&quot;: \&quot;eq\&quot;}}))
         * @param {string} [keyword] Keyword to search NFT name and description. Alphanumeric characters only.
         * @param {SearchStacksSortByEnum} [sortBy] Sort results in a specific order
         * @param {number} [pageSize] Number of results to return per page
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchStacks: async (chainName: string, contractAddress: Array<string>, accountAddress?: string, onlyIncludeOwnerListings?: boolean, onlyIfHasActiveListings?: boolean, traits?: string, keyword?: string, sortBy?: SearchStacksSortByEnum, pageSize?: number, pageCursor?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'chainName' is not null or undefined
            assertParamExists('searchStacks', 'chainName', chainName)
            // verify required parameter 'contractAddress' is not null or undefined
            assertParamExists('searchStacks', 'contractAddress', contractAddress)
            const localVarPath = `/v1/chains/{chain_name}/search/stacks`
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

            if (accountAddress !== undefined) {
                localVarQueryParameter['account_address'] = accountAddress;
            }

            if (onlyIncludeOwnerListings !== undefined) {
                localVarQueryParameter['only_include_owner_listings'] = onlyIncludeOwnerListings;
            }

            if (onlyIfHasActiveListings !== undefined) {
                localVarQueryParameter['only_if_has_active_listings'] = onlyIfHasActiveListings;
            }

            if (traits !== undefined) {
                localVarQueryParameter['traits'] = traits;
            }

            if (keyword !== undefined) {
                localVarQueryParameter['keyword'] = keyword;
            }

            if (sortBy !== undefined) {
                localVarQueryParameter['sort_by'] = sortBy;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['page_size'] = pageSize;
            }

            if (pageCursor !== undefined) {
                localVarQueryParameter['page_cursor'] = pageCursor;
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
 * MetadataSearchApi - functional programming interface
 * @export
 */
export const MetadataSearchApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MetadataSearchApiAxiosParamCreator(configuration)
    return {
        /**
         * Get list of metadata filters
         * @summary Get list of metadata attribute filters
         * @param {string} chainName The name of chain
         * @param {string} contractAddress Contract addresses for collection
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listFilters(chainName: string, contractAddress: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListFiltersResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listFilters(chainName, contractAddress, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Search NFTs
         * @summary Search NFTs
         * @param {string} chainName The name of chain
         * @param {Array<string>} contractAddress List of contract addresses to filter by
         * @param {string} [accountAddress] Account address to filter by
         * @param {Array<string>} [stackId] Filters NFTs that belong to any of these stacks
         * @param {boolean} [onlyIncludeOwnerListings] Whether the listings should include only the owner created listings
         * @param {number} [pageSize] Number of results to return per page
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async searchNFTs(chainName: string, contractAddress: Array<string>, accountAddress?: string, stackId?: Array<string>, onlyIncludeOwnerListings?: boolean, pageSize?: number, pageCursor?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SearchNFTsResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.searchNFTs(chainName, contractAddress, accountAddress, stackId, onlyIncludeOwnerListings, pageSize, pageCursor, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Search NFT stacks
         * @summary Search NFT stacks
         * @param {string} chainName The name of chain
         * @param {Array<string>} contractAddress List of contract addresses to filter by
         * @param {string} [accountAddress] Account address to filter by
         * @param {boolean} [onlyIncludeOwnerListings] Whether to the listings should include only the owner created listings
         * @param {boolean} [onlyIfHasActiveListings] Filters results to include only stacks that have a current active listing. False and \&#39;null\&#39; return all unfiltered stacks.
         * @param {string} [traits] JSON encoded traits to filter by. e.g. encodeURIComponent(JSON.stringify({\&quot;rarity\&quot;: {\&quot;values\&quot;: [\&quot;common\&quot;, \&quot;rare\&quot;], \&quot;condition\&quot;: \&quot;eq\&quot;}}))
         * @param {string} [keyword] Keyword to search NFT name and description. Alphanumeric characters only.
         * @param {SearchStacksSortByEnum} [sortBy] Sort results in a specific order
         * @param {number} [pageSize] Number of results to return per page
         * @param {string} [pageCursor] Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async searchStacks(chainName: string, contractAddress: Array<string>, accountAddress?: string, onlyIncludeOwnerListings?: boolean, onlyIfHasActiveListings?: boolean, traits?: string, keyword?: string, sortBy?: SearchStacksSortByEnum, pageSize?: number, pageCursor?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SearchStacksResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.searchStacks(chainName, contractAddress, accountAddress, onlyIncludeOwnerListings, onlyIfHasActiveListings, traits, keyword, sortBy, pageSize, pageCursor, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MetadataSearchApi - factory interface
 * @export
 */
export const MetadataSearchApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MetadataSearchApiFp(configuration)
    return {
        /**
         * Get list of metadata filters
         * @summary Get list of metadata attribute filters
         * @param {MetadataSearchApiListFiltersRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFilters(requestParameters: MetadataSearchApiListFiltersRequest, options?: AxiosRequestConfig): AxiosPromise<ListFiltersResult> {
            return localVarFp.listFilters(requestParameters.chainName, requestParameters.contractAddress, options).then((request) => request(axios, basePath));
        },
        /**
         * Search NFTs
         * @summary Search NFTs
         * @param {MetadataSearchApiSearchNFTsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchNFTs(requestParameters: MetadataSearchApiSearchNFTsRequest, options?: AxiosRequestConfig): AxiosPromise<SearchNFTsResult> {
            return localVarFp.searchNFTs(requestParameters.chainName, requestParameters.contractAddress, requestParameters.accountAddress, requestParameters.stackId, requestParameters.onlyIncludeOwnerListings, requestParameters.pageSize, requestParameters.pageCursor, options).then((request) => request(axios, basePath));
        },
        /**
         * Search NFT stacks
         * @summary Search NFT stacks
         * @param {MetadataSearchApiSearchStacksRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchStacks(requestParameters: MetadataSearchApiSearchStacksRequest, options?: AxiosRequestConfig): AxiosPromise<SearchStacksResult> {
            return localVarFp.searchStacks(requestParameters.chainName, requestParameters.contractAddress, requestParameters.accountAddress, requestParameters.onlyIncludeOwnerListings, requestParameters.onlyIfHasActiveListings, requestParameters.traits, requestParameters.keyword, requestParameters.sortBy, requestParameters.pageSize, requestParameters.pageCursor, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for listFilters operation in MetadataSearchApi.
 * @export
 * @interface MetadataSearchApiListFiltersRequest
 */
export interface MetadataSearchApiListFiltersRequest {
    /**
     * The name of chain
     * @type {string}
     * @memberof MetadataSearchApiListFilters
     */
    readonly chainName: string

    /**
     * Contract addresses for collection
     * @type {string}
     * @memberof MetadataSearchApiListFilters
     */
    readonly contractAddress: string
}

/**
 * Request parameters for searchNFTs operation in MetadataSearchApi.
 * @export
 * @interface MetadataSearchApiSearchNFTsRequest
 */
export interface MetadataSearchApiSearchNFTsRequest {
    /**
     * The name of chain
     * @type {string}
     * @memberof MetadataSearchApiSearchNFTs
     */
    readonly chainName: string

    /**
     * List of contract addresses to filter by
     * @type {Array<string>}
     * @memberof MetadataSearchApiSearchNFTs
     */
    readonly contractAddress: Array<string>

    /**
     * Account address to filter by
     * @type {string}
     * @memberof MetadataSearchApiSearchNFTs
     */
    readonly accountAddress?: string

    /**
     * Filters NFTs that belong to any of these stacks
     * @type {Array<string>}
     * @memberof MetadataSearchApiSearchNFTs
     */
    readonly stackId?: Array<string>

    /**
     * Whether the listings should include only the owner created listings
     * @type {boolean}
     * @memberof MetadataSearchApiSearchNFTs
     */
    readonly onlyIncludeOwnerListings?: boolean

    /**
     * Number of results to return per page
     * @type {number}
     * @memberof MetadataSearchApiSearchNFTs
     */
    readonly pageSize?: number

    /**
     * Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
     * @type {string}
     * @memberof MetadataSearchApiSearchNFTs
     */
    readonly pageCursor?: string
}

/**
 * Request parameters for searchStacks operation in MetadataSearchApi.
 * @export
 * @interface MetadataSearchApiSearchStacksRequest
 */
export interface MetadataSearchApiSearchStacksRequest {
    /**
     * The name of chain
     * @type {string}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly chainName: string

    /**
     * List of contract addresses to filter by
     * @type {Array<string>}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly contractAddress: Array<string>

    /**
     * Account address to filter by
     * @type {string}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly accountAddress?: string

    /**
     * Whether to the listings should include only the owner created listings
     * @type {boolean}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly onlyIncludeOwnerListings?: boolean

    /**
     * Filters results to include only stacks that have a current active listing. False and \&#39;null\&#39; return all unfiltered stacks.
     * @type {boolean}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly onlyIfHasActiveListings?: boolean

    /**
     * JSON encoded traits to filter by. e.g. encodeURIComponent(JSON.stringify({\&quot;rarity\&quot;: {\&quot;values\&quot;: [\&quot;common\&quot;, \&quot;rare\&quot;], \&quot;condition\&quot;: \&quot;eq\&quot;}}))
     * @type {string}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly traits?: string

    /**
     * Keyword to search NFT name and description. Alphanumeric characters only.
     * @type {string}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly keyword?: string

    /**
     * Sort results in a specific order
     * @type {'cheapest_first'}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly sortBy?: SearchStacksSortByEnum

    /**
     * Number of results to return per page
     * @type {number}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly pageSize?: number

    /**
     * Encoded page cursor to retrieve previous or next page. Use the value returned in the response.
     * @type {string}
     * @memberof MetadataSearchApiSearchStacks
     */
    readonly pageCursor?: string
}

/**
 * MetadataSearchApi - object-oriented interface
 * @export
 * @class MetadataSearchApi
 * @extends {BaseAPI}
 */
export class MetadataSearchApi extends BaseAPI {
    /**
     * Get list of metadata filters
     * @summary Get list of metadata attribute filters
     * @param {MetadataSearchApiListFiltersRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MetadataSearchApi
     */
    public listFilters(requestParameters: MetadataSearchApiListFiltersRequest, options?: AxiosRequestConfig) {
        return MetadataSearchApiFp(this.configuration).listFilters(requestParameters.chainName, requestParameters.contractAddress, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Search NFTs
     * @summary Search NFTs
     * @param {MetadataSearchApiSearchNFTsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MetadataSearchApi
     */
    public searchNFTs(requestParameters: MetadataSearchApiSearchNFTsRequest, options?: AxiosRequestConfig) {
        return MetadataSearchApiFp(this.configuration).searchNFTs(requestParameters.chainName, requestParameters.contractAddress, requestParameters.accountAddress, requestParameters.stackId, requestParameters.onlyIncludeOwnerListings, requestParameters.pageSize, requestParameters.pageCursor, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Search NFT stacks
     * @summary Search NFT stacks
     * @param {MetadataSearchApiSearchStacksRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MetadataSearchApi
     */
    public searchStacks(requestParameters: MetadataSearchApiSearchStacksRequest, options?: AxiosRequestConfig) {
        return MetadataSearchApiFp(this.configuration).searchStacks(requestParameters.chainName, requestParameters.contractAddress, requestParameters.accountAddress, requestParameters.onlyIncludeOwnerListings, requestParameters.onlyIfHasActiveListings, requestParameters.traits, requestParameters.keyword, requestParameters.sortBy, requestParameters.pageSize, requestParameters.pageCursor, options).then((request) => request(this.axios, this.basePath));
    }
}

/**
 * @export
 */
export const SearchStacksSortByEnum = {
    CheapestFirst: 'cheapest_first'
} as const;
export type SearchStacksSortByEnum = typeof SearchStacksSortByEnum[keyof typeof SearchStacksSortByEnum];