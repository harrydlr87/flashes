import Auth from './auth';

/**
 * Factory for creating an Error
 * @param hash
 * @return {Error}
 */
export const createHttpError = (hash) => {
    const error = new Error(`${hash.statusCode} ${hash.statusMessage}`);
    error.type = 'httpError';
    error.statusCode = hash.statusCode;
    error.http = hash;
    return error;
};

/** Create a promise that rejects in <ms> milliseconds */
const createRequestTimeout = setTimeoutReference => new Promise((resolve, reject) => {
    setTimeoutReference(setTimeout(() => {
        reject(createHttpError({
            statusCode: 504,
            statusMessage: 'Request timeout error',
        }));
    }, 10000));
});

/**
 * Checks a response's overall status code, bailing out on anything that is not within the 2XX range.
 *
 * @param response
 */
export const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    throw createHttpError({ statusCode: response.status, statusMessage: response.statusText });
};

/**
 * Performs a request using the fetch api
 */
export const doFetch = (path, options = {}) => {
    let timeoutId;
    const setTimeoutReference = (timeout) => { timeoutId = timeout; };
    const timeoutPromise = createRequestTimeout(setTimeoutReference);
    const requestOptions = {
        ...options,
        headers: {
            ...options.headers,
          ...Auth.credentials, // Bind credentials
        },
    };

    const request = fetch(path, requestOptions)
        .then(res => checkStatus(res))
        .then(res => res.text())
        .then(res => res && JSON.parse(res));

    return Promise.race([
        request,
        timeoutPromise,
    ]).then((res) => {
        clearTimeout(timeoutId);
        return res;
    });
};
