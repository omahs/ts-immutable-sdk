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



/**
 * Analysis severity level
 * @export
 * @enum {string}
 */

export const Severity = {
    Malicious: 'malicious',
    Benign: 'benign',
    Warning: 'warning',
    Unknown: 'unknown',
    Info: 'info'
} as const;

export type Severity = typeof Severity[keyof typeof Severity];



