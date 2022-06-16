import { RequestStates } from 'data/constants/requests';

import selectors from './selectors';

jest.mock('reselect', () => ({
  createSelector: jest.fn((preSelectors, cb) => ({ preSelectors, cb })),
}));

const requestKey = 'my-test-request-key';
const requestData = { some: 'request-data' };
const inactiveRequest = { status: RequestStates.inactive, some: 'request-data' };
const pendingRequest = { status: RequestStates.pending, some: 'request-data' };
const completedRequest = { status: RequestStates.completed, some: 'request-data' };
const failedRequest = { status: RequestStates.failed, some: 'request-data' };

const testValue = 'my-test-value';

const testState = {
  requests: {
    [requestKey]: requestData,
  },
};
const genRequests = (request) => ({
  requests: { [requestKey]: request },
});
const select = (selector, request) => (
  selector(genRequests(request), { requestKey })
);
describe('requests selectors unit tests', () => {
  test('requestStatus returns data associated with given key', () => {
    expect(selectors.requestStatus(testState, { requestKey })).toEqual(requestData);
  });
  const testStatusSelector = (selector, matchingRequest) => {
    expect(selector(testState, { requestKey })).toEqual(false);
    expect(selector(
      { requests: { [requestKey]: matchingRequest } },
      { requestKey },
    )).toEqual(true);
  };
  test('isInactive returns true iff the given request is inactive', () => {
    testStatusSelector(selectors.isInactive, inactiveRequest);
  });
  test('isPending returns true iff the given request is pending', () => {
    testStatusSelector(selectors.isPending, pendingRequest);
  });
  test('isCompleted returns true iff the given request is completed', () => {
    testStatusSelector(selectors.isCompleted, completedRequest);
  });
  test('isFailed returns true iff the given request is failed', () => {
    testStatusSelector(selectors.isFailed, failedRequest);
  });
  test('error returns the error from the request', () => {
    expect(select(selectors.error, { error: testValue })).toEqual(testValue);
  });
  test('errorStatus returns the error response status', () => {
    expect(select(selectors.errorStatus, {})).toEqual(undefined);
    expect(select(selectors.errorStatus, { error: {} })).toEqual(undefined);
    expect(select(selectors.errorStatus, { error: { response: {} } })).toEqual(undefined);
    expect(select(selectors.errorStatus, { error: { response: { status: testValue } } }))
      .toEqual(testValue);
  });
  test('errorCode returns the error response data', () => {
    expect(select(selectors.errorCode, {})).toEqual(undefined);
    expect(select(selectors.errorCode, { error: {} })).toEqual(undefined);
    expect(select(selectors.errorCode, { error: { response: {} } })).toEqual(undefined);
    expect(select(selectors.errorCode, { error: { response: { data: testValue } } }))
      .toEqual(testValue);
  });
  test('data reurns the request data', () => {
    expect(select(selectors.data, { data: testValue })).toEqual(testValue);
  });
});
