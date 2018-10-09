import { API_URL } from '../../../application/config/backend';
import { doFetch } from '../../http/http';

const DEFAULT_POST_OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

/**
 * Performs a POST request to the given path and with the given data.
 *
 * @param path
 * @param data
 * @param options
 */
export default (path, data, options) => {
  const requestOptions = {
    body: JSON.stringify(data),
    ...DEFAULT_POST_OPTIONS,
    ...options,
  };
  return doFetch(API_URL + path, requestOptions);
};

