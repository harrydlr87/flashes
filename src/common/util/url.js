import queryString from 'query-string';
import { filter, identity } from 'ramda';

/**
 * Convert the specified object into query string params
 */
export const paramsToQueryString = params => params && `?${queryString.stringify(filter(identity)(params))}`;

export const queryStringToParams = qs => qs && queryString.parse(qs);
