export const mockSuccess = (returnValFn) => (...args) => Promise.resolve(returnValFn(...args));

export const mockFailure = (returnValFn) => (...args) => Promise.reject(returnValFn(...args));
