import queryString from 'query-string';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

/**
 * get(url)
 * simple wrapper providing an authenticated Http client get action
 * @param {string} url - target url
 */
export const get = (...args) => getAuthenticatedHttpClient().get(...args);
/**
 * post(url, data)
 * simple wrapper providing an authenticated Http client post action
 * @param {string} url - target url
 * @param {object|string} data - post payload
 */
export const post = (...args) => getAuthenticatedHttpClient().post(...args);

export const client = getAuthenticatedHttpClient;

/**
 * stringifyUrl(url, query)
 * simple wrapper around queryString.stringifyUrl that sets skip behavior
 * @param {string} url - base url string
 * @param {object} query - query parameters
 */
export const stringifyUrl = (url, query) => queryString.stringifyUrl(
  { url, query },
  { skipNull: true, skipEmptyString: true },
);
