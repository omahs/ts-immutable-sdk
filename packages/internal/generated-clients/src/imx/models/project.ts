/* tslint:disable */
/* eslint-disable */
/**
 * Immutable X API
 * Immutable X API
 *
 * The version of the OpenAPI document: 3.0.0
 * Contact: support@immutable.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface Project
 */
export interface Project {
    /**
     * API key for the project. This is only for zkevm project. This API is not for increasing rate limit yet.
     * @type {string}
     * @memberof Project
     */
    'api_key'?: string;
    /**
     * The project ChainType
     * @type {string}
     * @memberof Project
     */
    'chain_type'?: string;
    /**
     * The current period expiry date for collection limit
     * @type {string}
     * @memberof Project
     */
    'collection_limit_expires_at': string;
    /**
     * The total monthly collection limit
     * @type {number}
     * @memberof Project
     */
    'collection_monthly_limit': number;
    /**
     * The number of collection remaining in the current period
     * @type {number}
     * @memberof Project
     */
    'collection_remaining': number;
    /**
     * The company name
     * @type {string}
     * @memberof Project
     */
    'company_name': string;
    /**
     * The project contact email (must be registered as a developer account with Immutable at https://hub.immutable.com)
     * @type {string}
     * @memberof Project
     */
    'contact_email': string;
    /**
     * The environment ID
     * @type {string}
     * @memberof Project
     */
    'environment_id'?: string;
    /**
     * The user environment name correlating to this project
     * @type {string}
     * @memberof Project
     */
    'environment_name'?: string;
    /**
     * The project ID
     * @type {number}
     * @memberof Project
     */
    'id': number;
    /**
     * The current period expiry date for mint operation limit
     * @type {string}
     * @memberof Project
     */
    'mint_limit_expires_at': string;
    /**
     * The total monthly mint operation limit
     * @type {number}
     * @memberof Project
     */
    'mint_monthly_limit': number;
    /**
     * The number of mint operation remaining in the current period
     * @type {number}
     * @memberof Project
     */
    'mint_remaining': number;
    /**
     * The project name
     * @type {string}
     * @memberof Project
     */
    'name': string;
    /**
     * The organisation ID that the project belongs to
     * @type {string}
     * @memberof Project
     */
    'org_id'?: string;
    /**
     * Project group id
     * @type {string}
     * @memberof Project
     */
    'project_group_id'?: string;
    /**
     * The public publishable_key for the project
     * @type {string}
     * @memberof Project
     */
    'publishable_key'?: string;
    /**
     * The public publishable_key created time
     * @type {string}
     * @memberof Project
     */
    'publishable_key_created_at'?: string;
}

