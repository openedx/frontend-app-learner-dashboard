export const mockSuccess = (returnValFn) => (...args) => (
  new Promise((resolve) => resolve(returnValFn(...args)))
);

export const mockFailure = (returnValFn) => (...args) => (
  new Promise((resolve, reject) => reject(returnValFn(...args)))
);
