import { actions } from 'data/redux';
import { RequestKeys } from 'data/constants/requests';
import api from 'data/services/lms/api';
import * as requests from './requests';

jest.mock('data/services/lms/api', () => ({
  batchUnlockSubmissions: (submissionUUIDs) => ({ batchUnlockSubmissions: submissionUUIDs }),
  initializeApp: (locationId) => ({ initializeApp: locationId }),
  fetchSubmissionStatus: (submissionUUID) => ({ fetchSubmissionStatus: submissionUUID }),
  fetchSubmission: (submissionUUID) => ({ fetchSubmission: submissionUUID }),
  lockSubmission: ({ submissionUUID }) => ({ lockSubmission: { submissionUUID } }),
  unlockSubmission: ({ submissionUUID }) => ({ unlockSubmission: { submissionUUID } }),
  updateGrade: (submissionUUID, gradeData) => ({ updateGrade: { submissionUUID, gradeData } }),
}));

const dispatch = jest.fn();
const onSuccess = jest.fn();
const onFailure = jest.fn();
describe('requests thunkActions module', () => {
  beforeEach(jest.clearAllMocks);
  describe('networkRequest', () => {
    const requestKey = 'test-request';
    const testData = { some: 'test data' };
    let resolveFn;
    let rejectFn;
    describe('with both handlers', () => {
      beforeEach(() => {
        requests.networkRequest({
          requestKey,
          promise: new Promise((resolve, reject) => {
            resolveFn = resolve;
            rejectFn = reject;
          }),
          onSuccess,
          onFailure,
        })(dispatch);
      });
      test('calls startRequest action with requestKey', async () => {
        expect(dispatch.mock.calls).toEqual([[actions.requests.startRequest(requestKey)]]);
      });
      describe('on success', () => {
        beforeEach(async () => {
          await resolveFn(testData);
        });
        it('dispatches completeRequest', async () => {
          expect(dispatch.mock.calls).toEqual([
            [actions.requests.startRequest(requestKey)],
            [actions.requests.completeRequest({ requestKey, response: testData })],
          ]);
        });
        it('calls onSuccess with response', async () => {
          expect(onSuccess).toHaveBeenCalledWith(testData);
          expect(onFailure).not.toHaveBeenCalled();
        });
      });
      describe('on failure', () => {
        beforeEach(async () => {
          await rejectFn(testData);
        });
        test('dispatches completeRequest', async () => {
          expect(dispatch.mock.calls).toEqual([
            [actions.requests.startRequest(requestKey)],
            [actions.requests.failRequest({ requestKey, error: testData })],
          ]);
        });
        test('calls onSuccess with response', async () => {
          expect(onFailure).toHaveBeenCalledWith(testData);
          expect(onSuccess).not.toHaveBeenCalled();
        });
      });
    });
    describe('without onSuccess and onFailure', () => {
      test('calls startRequest action with requestKey', async () => {
        requests.networkRequest({ requestKey, promise: Promise.resolve(testData) })(dispatch);
        expect(dispatch.mock.calls).toEqual([[actions.requests.startRequest(requestKey)]]);
      });
      it('on success dispatches completeRequest', async () => {
        await requests.networkRequest({ requestKey, promise: Promise.resolve(testData) })(dispatch);
        expect(dispatch.mock.calls).toEqual([
          [actions.requests.startRequest(requestKey)],
          [actions.requests.completeRequest({ requestKey, response: testData })],
        ]);
      });
      it('on failure disaptches completeRequest', async () => {
        await requests.networkRequest({ requestKey, promise: Promise.reject(testData) })(dispatch);
        expect(dispatch.mock.calls).toEqual([
          [actions.requests.startRequest(requestKey)],
          [actions.requests.failRequest({ requestKey, error: testData })],
        ]);
      });
    });
  });

  const testNetworkRequestAction = ({
    action,
    args,
    expectedData,
    expectedString,
  }) => {
    let dispatchedAction;
    beforeEach(() => {
      action({ ...args, onSuccess, onFailure })(dispatch);
      [[dispatchedAction]] = dispatch.mock.calls;
    });
    it('dispatches networkRequest', () => {
      expect(dispatchedAction.networkRequest).not.toEqual(undefined);
    });
    test('forwards onSuccess and onFailure', () => {
      expect(dispatchedAction.networkRequest.onSuccess).toEqual(onSuccess);
      expect(dispatchedAction.networkRequest.onFailure).toEqual(onFailure);
    });
    test(expectedString, () => {
      expect(dispatchedAction.networkRequest).toEqual({
        ...expectedData,
        onSuccess,
        onFailure,
      });
    });
  };

  describe('network request actions', () => {
    const submissionUUID = 'test-submission-id';
    const locationId = 'test-location-id';
    beforeEach(() => {
      requests.networkRequest = jest.fn(args => ({ networkRequest: args }));
    });
    describe('initializeApp', () => {
      testNetworkRequestAction({
        action: requests.initializeApp,
        args: { locationId },
        expectedString: 'with initialize key, initializeApp promise',
        expectedData: {
          requestKey: RequestKeys.initialize,
          promise: api.initializeApp(locationId),
        },
      });
    });
    describe('fetchSubmissionStatus', () => {
      testNetworkRequestAction({
        action: requests.fetchSubmissionStatus,
        args: { submissionUUID },
        expectedString: 'with fetchSubmissionStatus promise',
        expectedData: {
          requestKey: RequestKeys.fetchSubmissionStatus,
          promise: api.fetchSubmissionStatus(submissionUUID),
        },
      });
    });
    describe('fetchSubmission', () => {
      testNetworkRequestAction({
        action: requests.fetchSubmission,
        args: { submissionUUID },
        expectedString: 'with fetchSubmission promise',
        expectedData: {
          requestKey: RequestKeys.fetchSubmission,
          promise: api.fetchSubmission(submissionUUID),
        },
      });
    });
    describe('setLock: true', () => {
      testNetworkRequestAction({
        action: requests.setLock,
        args: { submissionUUID, value: true },
        expectedString: 'with setLock promise',
        expectedData: {
          requestKey: RequestKeys.setLock,
          promise: api.lockSubmission(submissionUUID),
        },
      });
    });
    describe('setLock: false', () => {
      testNetworkRequestAction({
        action: requests.setLock,
        args: { submissionUUID, value: false },
        expectedString: 'with setLock promise',
        expectedData: {
          requestKey: RequestKeys.setLock,
          promise: api.unlockSubmission(submissionUUID),
        },
      });
    });
    describe('batchUnlock', () => {
      const submissionUUIDs = [1, 2, 3, 4, 5];
      testNetworkRequestAction({
        action: requests.batchUnlock,
        args: { submissionUUIDs, value: false },
        expectedString: 'with batchUnlock promise',
        expectedData: {
          requestKey: RequestKeys.batchUnlock,
          promise: api.batchUnlockSubmissions(submissionUUIDs),
          value: false,
        },
      });
    });
    describe('submitGrade', () => {
      const gradeData = 'test-grade-data';
      testNetworkRequestAction({
        action: requests.submitGrade,
        args: { submissionUUID, gradeData },
        expectedString: 'with submitGrade promise',
        expectedData: {
          requestKey: RequestKeys.submitGrade,
          promise: api.updateGrade(submissionUUID, gradeData),
        },
      });
    });
  });
});
