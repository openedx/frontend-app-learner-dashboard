import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

/**
 * stringify(query, existingQuery)
 * simple wrapper to convert an object to a query string
 * @param {object} query - object to convert
 * @param {string} existingQuery - existing query string
 * @returns {string} - query string
 */

export const stringify = (query, existingQuery = '') => {
  const searchParams = new URLSearchParams(existingQuery);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      searchParams.delete(key);
    } else if (Array.isArray(value)) {
      searchParams.delete(key);
      value.forEach((val) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.append(key, val);
        }
      });
    } else {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
};

/**
 * get(url)
 * simple wrapper providing an authenticated Http client get action
 * @param {string} url - target url
 */
export const get = (...args) => getAuthenticatedHttpClient().get(...args);
/**
 * post(url, data)
 * simple wrapper providing an authenticated Http client post action
 * stringify is used to convert the object to query string with = and &
 * @param {string} url - target url
 * @param {object|string} body - post payload
 */
export const post = (url, body = {}) => getAuthenticatedHttpClient().post(url, stringify(body));

export const client = getAuthenticatedHttpClient;

/**
 * stringifyUrl(url, query)
 * simple wrapper to convert a url and query object to a full url
 * @param {string} url - base url string
 * @param {object} query - query parameters
 * @returns {string} - full url
 */
export const stringifyUrl = (url, query) => {
  const [baseUrl, existingQuery = ''] = url.split('?');
  const queryString = stringify(query, existingQuery);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
