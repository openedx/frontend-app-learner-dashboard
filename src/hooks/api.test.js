import React from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { keyStore } from 'utils';
import { RequestKeys } from 'data/constants/requests';
import { post } from 'data/services/lms/utils';
import api from 'data/services/lms/api';

import * as reduxHooks from 'data/redux/hooks';
import * as apiHooks from './api';

const reduxKeys = keyStore(reduxHooks);

jest.mock('data/services/lms/utils', () => ({
  post: jest.fn((...args) => ({ post: args })),
}));
jest.mock('data/services/lms/api', () => ({
  initializeList: jest.fn(),
  updateEntitlementEnrollment: jest.fn(),
  unenrollFromCourse: jest.fn(),
  deleteEntitlementEnrollment: jest.fn(),
  updateEmailSettings: jest.fn(),
  createCreditRequest: jest.fn(),
}));
jest.mock('data/redux/hooks', () => ({
  useCardCourseRunData: jest.fn(),
  useCardCreditData: jest.fn(),
  useCardEntitlementData: jest.fn(),
  useLoadData: jest.fn(),
  useMakeNetworkRequest: jest.fn(),
  useClearRequest: jest.fn(),
  useEmailConfirmationData: jest.fn(),
}));

const moduleKeys = keyStore(apiHooks);
const testString = 'TEST-string';
const uuid = 'test-UUID';
const cardId = 'test-card-id';
const selection = 'test-selection';
const courseId = 'test-COURSE-id';
const isRefundable = 'test-is-refundable';
const user = 'test-user';

const loadData = jest.fn();
reduxHooks.useLoadData.mockReturnValue(loadData);
const clearRequest = jest.fn();
reduxHooks.useClearRequest.mockReturnValue(clearRequest);

reduxHooks.useCardCourseRunData.mockReturnValue({ courseId });
reduxHooks.useCardEntitlementData.mockReturnValue({ uuid, isRefundable });

let hook;
let out;

const testInitCardHook = (hookKey) => {
  test(`initializes ${hookKey} with cardId`, () => {
    expect(reduxHooks[hookKey]).toHaveBeenCalledWith(cardId);
  });
};

const initializeApp = jest.fn();

describe('api hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useNetworkRequest', () => {
    const makeNetworkRequest = jest.fn(args => ({ networkRequest: args }));
    const action = jest.fn((...actionArgs) => ({ action: actionArgs }));
    const args = { some: 'test', args: 'for you' };
    it('returns network request based on incoming action', () => {
      reduxHooks.useMakeNetworkRequest.mockReturnValue(makeNetworkRequest);
      hook = apiHooks.useNetworkRequest(action, args);
      expect(hook()).toEqual(makeNetworkRequest({ promise: action(), ...args }));
    });
    it('forwards action arguments', () => {
      reduxHooks.useMakeNetworkRequest.mockReturnValue(makeNetworkRequest);
      hook = apiHooks.useNetworkRequest(action, args);
      const actionArgs = [1, 2, 3];
      expect(hook(...actionArgs)).toEqual(
        makeNetworkRequest({ promise: action(...actionArgs), ...args }),
      );
    });
  });

  describe('network requests', () => {
    const mockUseNetworkRequest = jest.fn((action, args) => ({ action, args }));
    const testRequestKey = (requestKey) => {
      test('requestKey', () => { expect(hook.args.requestKey).toEqual(requestKey); });
    };

    beforeEach(() => {
      jest.spyOn(apiHooks, moduleKeys.useNetworkRequest).mockImplementation(mockUseNetworkRequest);
    });

    describe('useInitializeApp', () => {
      beforeEach(() => {
        hook = apiHooks.useInitializeApp();
      });
      it('calls initialize api method', () => {
        expect(hook.action).toEqual(api.initializeList);
      });
      testRequestKey(RequestKeys.initialize);
      it('initializes load data hook', () => {
        expect(reduxHooks.useLoadData).toHaveBeenCalledWith();
      });
      it('calls loadData with data on success', () => {
        hook.args.onSuccess({ data: testString });
        expect(loadData).toHaveBeenCalledWith(testString);
      });
    });

    describe('entitlement enrollment hooks', () => {
      beforeEach(() => {
        jest.spyOn(apiHooks, moduleKeys.useInitializeApp).mockReturnValue(initializeApp);
      });

      const testInitialization = () => {
        it('initializes useInitializeApp', () => {
          expect(apiHooks.useInitializeApp).toHaveBeenCalledWith();
        });
        testInitCardHook(reduxKeys.useCardEntitlementData);
      };

      const testArgs = (requestKey) => {
        testRequestKey(requestKey);
        it('initializes app on success', () => {
          expect(hook.args.onSuccess).toEqual(initializeApp);
        });
      };

      describe('useNewEntitlementEnrollment', () => {
        beforeEach(() => {
          hook = apiHooks.useNewEntitlementEnrollment(cardId);
        });
        testInitialization();
        testArgs(RequestKeys.newEntitlementEnrollment);
        it('calls updateEntitlementEnrollment api method', () => {
          hook.action(selection);
          expect(api.updateEntitlementEnrollment)
            .toHaveBeenCalledWith({ uuid, courseId: selection });
        });
      });

      describe('useSwitchEntitlementEnrollment', () => {
        beforeEach(() => {
          hook = apiHooks.useSwitchEntitlementEnrollment(cardId);
        });
        testInitialization();
        testArgs(RequestKeys.switchEntitlementSession);
        it('calls updateEntitlementEnrollment api method', () => {
          hook.action(selection);
          expect(api.updateEntitlementEnrollment)
            .toHaveBeenCalledWith({ uuid, courseId: selection });
        });
      });

      describe('useLeaveEntitlementSession', () => {
        beforeEach(() => {
          hook = apiHooks.useLeaveEntitlementSession(cardId);
        });
        testInitialization();
        testArgs(RequestKeys.leaveEntitlementSession);
        it('calls updateEntitlementEnrollment api method', () => {
          hook.action();
          expect(api.deleteEntitlementEnrollment)
            .toHaveBeenCalledWith({ uuid, isRefundable });
        });
      });
    });

    describe('useUnenrollFromCourse', () => {
      beforeEach(() => {
        hook = apiHooks.useUnenrollFromCourse(cardId);
      });
      testInitCardHook(reduxKeys.useCardCourseRunData);
      testRequestKey(RequestKeys.unenrollFromCourse);
      it('calls unenrollFromCourse api method with courseId', () => {
        hook.action();
        expect(api.unenrollFromCourse).toHaveBeenCalledWith({ courseId });
      });
    });

    describe('useMasqueradeAs', () => {
      beforeEach(() => {
        hook = apiHooks.useMasqueradeAs(cardId);
      });
      it('initializes load data hook', () => {
        expect(reduxHooks.useLoadData).toHaveBeenCalledWith();
      });
      testRequestKey(RequestKeys.masquerade);
      it('calls initializeList api method', () => {
        hook.action(user);
        expect(api.initializeList).toHaveBeenCalledWith({ user });
      });
      it('loads data on success', () => {
        hook.args.onSuccess({ data: testString });
        expect(loadData).toHaveBeenCalledWith(testString);
      });
    });

    describe('useClearMasquerade', () => {
      beforeEach(() => {
        jest.spyOn(apiHooks, moduleKeys.useInitializeApp).mockReturnValue(initializeApp);
        hook = apiHooks.useClearMasquerade(cardId);
      });
      it('initializes clear request redux hook', () => {
        expect(reduxHooks.useClearRequest).toHaveBeenCalledWith();
      });
      it('initializes useInitializeApp hook', () => {
        expect(apiHooks.useInitializeApp).toHaveBeenCalledWith();
      });
      it('clears masquerade state and initializes app on call', () => {
        hook();
        expect(clearRequest).toHaveBeenCalledWith(RequestKeys.masquerade);
        expect(initializeApp).toHaveBeenCalledWith();
      });
    });

    describe('useUpdateEmailSettings', () => {
      const enable = 'test-enable';
      beforeEach(() => {
        hook = apiHooks.useUpdateEmailSettings(cardId);
      });
      testInitCardHook(reduxKeys.useCardCourseRunData);
      testRequestKey(RequestKeys.updateEmailSettings);
      it('calls updateEmailSettings api method on call', () => {
        hook.action(enable);
        expect(api.updateEmailSettings).toHaveBeenCalledWith({ courseId, enable });
      });
    });

    describe('useSendConfirmEmail', () => {
      const sendEmailUrl = 'test-send-email-url';
      beforeEach(() => {
        reduxHooks.useEmailConfirmationData.mockReturnValue({ sendEmailUrl });
        hook = apiHooks.useSendConfirmEmail(cardId);
        out = hook();
      });
      it('initializes useEmailConfirmationData hook', () => {
        expect(reduxHooks.useEmailConfirmationData).toHaveBeenCalledWith();
      });
      it('posts to email url on call', () => {
        expect(out).toEqual(post(sendEmailUrl));
      });
    });

    describe('useCreateCreditRequest', () => {
      const username = 'test-username';
      const providerId = 'test-provider-id';
      beforeEach(() => {
        React.useContext.mockReturnValue({ authenticatedUser: { username } });
        reduxHooks.useCardCreditData.mockReturnValue({ providerId });
        hook = apiHooks.useCreateCreditRequest(cardId);
      });
      testInitCardHook(reduxKeys.useCardCreditData);
      testInitCardHook(reduxKeys.useCardCourseRunData);
      it('initializes username from app context', () => {
        expect(React.useContext).toHaveBeenCalledWith(AppContext);
      });
      it('calls createCreditRequest api method on call', () => {
        out = hook();
        expect(api.createCreditRequest).toHaveBeenCalledWith({
          providerId,
          courseId,
          username,
        });
      });
    });
  });
});
