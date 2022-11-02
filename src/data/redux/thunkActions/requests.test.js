import { keyStore } from 'utils';
import { actions } from 'data/redux';
import { RequestKeys } from 'data/constants/requests';
import api from 'data/services/lms/api';
import * as module from './requests';

jest.mock('data/services/lms/api', () => ({
  initializeList: jest.fn(args => ({ initializeList: args })),
  updateEntitlementEnrollment: jest.fn(args => ({ updateEntitlementEnrollment: args })),
  deleteEntitlementEnrollment: jest.fn(args => ({ deleteEntitlementEnrollment: args })),
  unenrollFromCourse: jest.fn(args => ({ unenrollFromCourse: args })),
  updateEmailSettings: jest.fn(args => ({ updateEmailSettings: args })),
}));

jest.mock('data/redux', () => ({
  actions: {
    requests: {
      clearRequest: jest.fn(args => ({ clearRequest: args })),
      completeRequest: jest.fn(args => ({ completeRequest: args })),
      failRequest: jest.fn(args => ({ failRequest: args })),
      startRequest: jest.fn(args => ({ startRequest: args })),
    },
  },
}));

const dispatch = jest.fn();
const onSuccess = jest.fn();
const onFailure = jest.fn();

const moduleKeys = keyStore(module);

const networkRequestSpy = jest.spyOn(module, moduleKeys.networkRequest);
const mockNetworkRequest = (args) => ({ networkRequest: args });

const networkActionSpy = jest.spyOn(module, moduleKeys.networkAction);
const mockNetworkAction = (args) => ({ mockNetworkAction: args });

const courseId = 'test-course-id';
const enable = 'test-enable';
const options = { some: 'test', option: 'fields' };
const promise = 'test-promise';
const requestKey = 'test-request-key';
const user = 'test-user';
const uuid = 'test-uuid';
const isRefundable = 'test-is-refundable';

describe('requests thunkActions module', () => {
  beforeEach(jest.clearAllMocks);
  describe('networkRequest', () => {
    const testData = { some: 'test data' };
    let resolveFn;
    let rejectFn;
    describe('with both handlers', () => {
      beforeEach(() => {
        module.networkRequest({
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
        module.networkRequest({ requestKey, promise: Promise.resolve(testData) })(dispatch);
        expect(dispatch.mock.calls).toEqual([[actions.requests.startRequest(requestKey)]]);
      });
      it('on success dispatches completeRequest', async () => {
        await module.networkRequest({ requestKey, promise: Promise.resolve(testData) })(dispatch);
        expect(dispatch.mock.calls).toEqual([
          [actions.requests.startRequest(requestKey)],
          [actions.requests.completeRequest({ requestKey, response: testData })],
        ]);
      });
      it('on failure disaptches completeRequest', async () => {
        await module.networkRequest({ requestKey, promise: Promise.reject(testData) })(dispatch);
        expect(dispatch.mock.calls).toEqual([
          [actions.requests.startRequest(requestKey)],
          [actions.requests.failRequest({ requestKey, error: testData })],
        ]);
      });
    });
  });

  describe('networkAction', () => {
    it('dispatches network request with key, promise, and options', () => {
      networkRequestSpy.mockImplementationOnce(mockNetworkRequest);
      module.networkAction({ requestKey, promise, options })(dispatch);
      expect(dispatch).toHaveBeenCalledWith(mockNetworkRequest({
        requestKey,
        promise,
        ...options,
      }));
    });
  });

  describe('network actions', () => {
    beforeEach(() => {
      networkActionSpy.mockImplementationOnce(mockNetworkAction);
    });

    describe('initializeList', () => {
      it('dispatches initialize networkAction with api.initializeList', () => {
        expect(module.initializeList(options)).toEqual(mockNetworkAction({
          requestKey: RequestKeys.initialize,
          promise: api.initializeList(),
          options,
        }));
      });
    });

    describe('newEntitlementEnrollment', () => {
      it('dispatches newEntitlementEnrollment networkAction', () => {
        expect(module.newEntitlementEnrollment({ uuid, courseId, ...options })).toEqual(
          mockNetworkAction({
            requestKey: RequestKeys.newEntitlementEnrollment,
            promise: api.updateEntitlementEnrollment({ uuid, courseId }),
            options,
          }),
        );
      });
    });

    describe('switchEntitlementEnrollment', () => {
      it('dispatches switchEntitlementEnrollment networkAction', () => {
        expect(module.switchEntitlementEnrollment({ uuid, courseId, ...options })).toEqual(
          mockNetworkAction({
            requestKey: RequestKeys.switchEntitlementSession,
            promise: api.updateEntitlementEnrollment({ uuid, courseId }),
            options,
          }),
        );
      });
    });

    describe('leaveEntitlementSession', () => {
      it('dispatches leaveEntitlementSession networkAction', () => {
        expect(module.leaveEntitlementSession({ uuid, isRefundable, ...options })).toEqual(
          mockNetworkAction({
            requestKey: RequestKeys.leaveEntitlementSession,
            promise: api.deleteEntitlementEnrollment({ uuid, isRefundable }),
            options,
          }),
        );
      });
    });

    describe('unenrollFromCourse', () => {
      it('dispatches unenrollFromCourse networkAction', () => {
        expect(module.unenrollFromCourse({ courseId, ...options })).toEqual(
          mockNetworkAction({
            requestKey: RequestKeys.unenrollFromCourse,
            promise: api.unenrollFromCourse({ courseId }),
            options,
          }),
        );
      });
    });

    describe('updateEmailSettings', () => {
      it('dispatches updateEmailSettings networkAction', () => {
        expect(module.updateEmailSettings({ courseId, enable, ...options })).toEqual(
          mockNetworkAction({
            requestKey: RequestKeys.updateEmailSettings,
            promise: api.updateEmailSettings({ courseId, enable }),
            options,
          }),
        );
      });
    });

    describe('masqueradeAs', () => {
      it('dispatches masqueradeAs initialize networkAction', () => {
        expect(module.masqueradeAs({ user, ...options })).toEqual(
          mockNetworkAction({
            requestKey: RequestKeys.masquerade,
            promise: api.initializeList({ user }),
            options,
          }),
        );
      });
    });

    describe('clearMasquerade', () => {
      it('dispatches clearRequest for masquerade request', () => {
        module.clearMasquerade()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(actions.requests.clearRequest({
          requestKey: RequestKeys.masquerade,
        }));
      });
    });
  });
});
