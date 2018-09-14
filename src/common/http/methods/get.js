import { API_URL } from '../../../application/config/backend';
import { doFetch } from '../../http/http';
import { paramsToQueryString } from '../../util/url';

const DEFAULT_GET_OPTIONS = {
    method: 'GET',
    credentials: 'same-origin',
};

/**
 * Performs a GET request to the given path.
 *
 * @param path
 * @param params
 * @param options
 */
export default (path, params, options) => {
    const requestOptions = { ...DEFAULT_GET_OPTIONS, ...options };
    const queryString = paramsToQueryString(params) || '';
    return doFetch(API_URL + path + queryString, requestOptions);
};

