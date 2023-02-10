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

const testRequestKey = (requestKey) => {
  test('requestKey', () => { expect(out.requestKey).toEqual(requestKey); });
};

describe('api hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useNetworkRequest', () => {
    const makeNetworkRequest = jest.fn(args => ({ networkRequest: args }));
    it('returns network request based on incoming action', () => {
      reduxHooks.useMakeNetworkRequest.mockReturnValue(makeNetworkRequest);
      const promise = Promise.resolve(testString);
      const action = () => promise;
      const args = { some: 'test', args: 'for you' };
      hook = apiHooks.useNetworkRequest(action, args);
      expect(hook()).toEqual(makeNetworkRequest({ promise, ...args }));
    });
  });
  describe('network requests', () => {
    const useNetworkRequest = (action, args) => () => ({ action, ...args });
    beforeEach(() => {
      jest.spyOn(apiHooks, moduleKeys.useNetworkRequest).mockImplementation(useNetworkRequest);
    });
    describe('useInitializeApp', () => {
      beforeEach(() => {
        hook = apiHooks.useInitializeApp();
        out = hook();
      });
      it('calls initialize api method', () => {
        expect(out.action).toEqual(api.initializeList);
      });
      testRequestKey(RequestKeys.initialize);
      it('initializes load data hook', () => {
        expect(reduxHooks.useLoadData).toHaveBeenCalledWith();
      });
      it('calls loadData with data on success', () => {
        out.onSuccess({ data: testString });
        expect(loadData).toHaveBeenCalledWith(testString);
      });
    });

    describe('entitlement enrollment hooks', () => {
      const testInitialization = () => {
        it('initializes useInitializeApp', () => {
          expect(apiHooks.useInitializeApp).toHaveBeenCalledWith();
        });
        testInitCardHook(reduxKeys.useCardEntitlementData);
      };
      const testArgs = (requestKey) => {
        testRequestKey(requestKey);
        it('initializes app on success', () => {
          expect(out.onSuccess).toEqual(initializeApp);
        });
      };
      beforeEach(() => {
        jest.spyOn(apiHooks, moduleKeys.useInitializeApp).mockReturnValue(initializeApp);
      });
      describe('useNewEntitlementEnrollment', () => {
        beforeEach(() => {
          hook = apiHooks.useNewEntitlementEnrollment(cardId);
          out = hook();
        });
        testInitialization();
        testArgs(RequestKeys.newEntitlementEnrollment);
        it('calls updateEntitlementEnrollment api method', () => {
          out.action(selection);
          expect(api.updateEntitlementEnrollment).toHaveBeenCalledWith({
            uuid,
            courseId: selection,
          });
        });
      });

      describe('useSwitchEntitlementEnrollment', () => {
        beforeEach(() => {
          hook = apiHooks.useSwitchEntitlementEnrollment(cardId);
          out = hook();
        });
        testInitialization();
        testArgs(RequestKeys.switchEntitlementSession);
        it('calls updateEntitlementEnrollment api method', () => {
          out.action(selection);
          expect(api.updateEntitlementEnrollment).toHaveBeenCalledWith({
            uuid,
            courseId: selection,
          });
        });
      });

      describe('useLeaveEntitlementSession', () => {
        beforeEach(() => {
          hook = apiHooks.useLeaveEntitlementSession(cardId);
          out = hook();
        });
        testInitialization();
        testArgs(RequestKeys.leaveEntitlementSession);
        it('calls updateEntitlementEnrollment api method', () => {
          out.action();
          expect(api.deleteEntitlementEnrollment).toHaveBeenCalledWith({
            uuid,
            isRefundable,
          });
        });
      });
    });

    describe('useUnenrollFromCourse', () => {
      beforeEach(() => {
        hook = apiHooks.useUnenrollFromCourse(cardId);
        out = hook();
      });
      testInitCardHook(reduxKeys.useCardCourseRunData);
      testRequestKey(RequestKeys.unenrollFromCourse);
      it('calls unenrollFromCourse api method with courseId', () => {
        out.action();
        expect(api.unenrollFromCourse).toHaveBeenCalledWith({ courseId });
      });
    });

    describe('useMasqueradeAs', () => {
      beforeEach(() => {
        hook = apiHooks.useMasqueradeAs(cardId);
        out = hook();
      });
      it('initializes load data hook', () => {
        expect(reduxHooks.useLoadData).toHaveBeenCalledWith();
      });
      testRequestKey(RequestKeys.masquerade);
      it('calls initializeList api method', () => {
        out.action(user);
        expect(api.initializeList).toHaveBeenCalledWith({ user });
      });
      it('loads data on success', () => {
        out.onSuccess({ data: testString });
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
        out = hook();
      });
      testInitCardHook(reduxKeys.useCardCourseRunData);
      testRequestKey(RequestKeys.updateEmailSettings);
      it('calls updateEmailSettings api method on call', () => {
        out.action(enable);
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
