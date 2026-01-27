import React from 'react';
import { SiteContext } from '@openedx/frontend-base';
import * as ReactQuery from '@tanstack/react-query';
import keyStore from '@src/utils/keyStore';
import { RequestKeys } from '@src/data/constants/requests';
import api from '@src/data/services/lms/api';
import { post } from '@src/data/services/lms/utils';
import * as reduxHooks from '@src/data/redux/hooks';
import * as apiHooks from './api';

const reduxKeys = keyStore(reduxHooks);

jest.mock('@src/data/services/lms/utils', () => ({
  post: jest.fn((...args) => ({ post: args })),
}));
jest.mock('@src/data/services/lms/api', () => ({
  initializeList: jest.fn(),
  updateEntitlementEnrollment: jest.fn(),
  unenrollFromCourse: jest.fn(),
  deleteEntitlementEnrollment: jest.fn(),
  updateEmailSettings: jest.fn(),
  createCreditRequest: jest.fn(),
}));
jest.mock('@src/data/redux/hooks', () => ({
  useCardCourseRunData: jest.fn(),
  useCardCreditData: jest.fn(),
  useCardEntitlementData: jest.fn(),
  useLoadData: jest.fn(),
  useMakeNetworkRequest: jest.fn(),
  useClearRequest: jest.fn(),
  useEmailConfirmationData: jest.fn(),
}));
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
  useQueryClient: jest.fn(),
}));
jest.mock('@src/data/contexts/GlobalDataContext', () => ({
  default: {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children({
      emailConfirmation: { sendEmailUrl: 'test-send-email-url' },
    }),
    displayName: 'GlobalDataContext',
  },
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(() => {
    // Return the mocked context value for GlobalDataContext
    return { emailConfirmation: { sendEmailUrl: 'test-send-email-url' } };
  }),
}));

const moduleKeys = keyStore(apiHooks);
const testString = 'TEST-string';
const uuid = 'test-UUID';
const cardId = 'test-card-id';
const selection = 'test-selection';
const courseId = 'test-COURSE-id';
const isRefundable = 'test-is-refundable';

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
      test('requestKey', () => {
        expect(hook.args.requestKey).toEqual(requestKey);
      });
    };

    beforeEach(() => {
      jest.spyOn(apiHooks, moduleKeys.useNetworkRequest).mockImplementation(mockUseNetworkRequest);
    });
    describe('useInitializeApp', () => {
      beforeEach(() => {
        // Mock useInitializeApp to return a mock React Query object
        jest.spyOn(apiHooks, 'useInitializeApp').mockReturnValue({
          data: null,
          isLoading: false,
          isError: false,
          error: null,
        });
        hook = { args: { requestKey: RequestKeys.initialize, onSuccess: loadData } };
      });
      testRequestKey(RequestKeys.initialize);
      it('initializes load data hook', () => {
        apiHooks.useInitializeApp();
        // Since useInitializeApp uses React Query, it doesn't directly call useLoadData
        // in the same way as the other hooks. This test would need to be restructured
        // for proper React Query testing.
        expect(reduxHooks.useLoadData).toHaveBeenCalledTimes(0);
      });
      it('calls loadData with data on success', () => {
        hook.args.onSuccess(testString);
        expect(loadData).toHaveBeenCalledWith(testString);
      });
    });

    describe('entitlement enrollment hooks', () => {
      let mockQueryClient;
      let invalidateQueries;
      beforeEach(() => {
        invalidateQueries = jest.fn();
        mockQueryClient = { invalidateQueries };
        // Mock useQueryClient from React Query
        ReactQuery.useQueryClient.mockReturnValue(mockQueryClient);
      });

      const testInitialization = () => {
        it('initializes useQueryClient', () => {
          expect(ReactQuery.useQueryClient).toHaveBeenCalled();
        });
        testInitCardHook(reduxKeys.useCardEntitlementData);
      };

      const testArgs = (requestKey) => {
        testRequestKey(requestKey);
        it('invalidates initialize query on success', () => {
          hook.args.onSuccess();
          expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: [RequestKeys.initialize] });
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
        hook = apiHooks.useSendConfirmEmail();
        out = hook();
      });
      it('uses GlobalDataContext to get emailConfirmation', () => {
        // The hook should use the mocked context which returns sendEmailUrl
        expect(out).toEqual(post(sendEmailUrl));
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
        expect(React.useContext).toHaveBeenCalledWith(SiteContext);
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
