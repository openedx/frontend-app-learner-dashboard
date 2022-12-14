import { AppContext } from '@edx/frontend-platform/react';

import { MockUseState } from 'testUtils';
import { hooks as appHooks } from 'data/redux';
import api from 'data/services/lms/api';
import * as hooks from './hooks';

jest.mock('@edx/frontend-platform/react', () => ({
  AppContext: {
    authenticatedUser: { username: 'test-username' },
  },
}));
jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardCreditData: jest.fn(),
  },
}));
jest.mock('data/services/lms/api', () => ({
  createCreditRequest: jest.fn(),
}));

const state = new MockUseState(hooks);

const cardId = 'test-card-id';
const testValue = 'test-value';
const courseId = 'test-course-id';
const providerId = 'test-credit-provider-id';

appHooks.useCardCourseRunData.mockReturnValue({ courseId });
appHooks.useCardCreditData.mockReturnValue({ providerId });
api.createCreditRequest.mockReturnValue(Promise.resolve(testValue));

const { username } = AppContext.authenticatedUser;
let out;
describe('Credit Banner view hooks', () => {
  describe('state', () => {
    state.testGetter(state.keys.creditRequestData);
  });
  describe('useCreditRequestData', () => {
    beforeEach(() => {
      state.mock();
      state.mockVal(state.keys.creditRequestData, testValue);
      out = hooks.useCreditRequestData(cardId);
    });
    describe('behavior', () => {
      it('initializes creditRequestData state field with null value', () => {
        state.expectInitializedWith(state.keys.creditRequestData, null);
      });
      it('calls useCardCourseRunData with passed cardID', () => {
        expect(appHooks.useCardCourseRunData).toHaveBeenCalledWith(cardId);
      });
      it('calls useCardCreditData with passed cardID', () => {
        expect(appHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
      });
    });
    describe('output', () => {
      it('returns requestData state value', () => {
        expect(out.requestData).toEqual(testValue);
      });
      describe('createCreditRequest', () => {
        const preventDefault = jest.fn();
        const event = { preventDefault };
        it('returns an event handler that prevents default click behavior', () => {
          out.createCreditRequest(event);
          expect(preventDefault).toHaveBeenCalled();
        });
        it('calls api.createCreditRequest and sets requestData with the response', async () => {
          await out.createCreditRequest(event);
          expect(api.createCreditRequest).toHaveBeenCalledWith({ providerId, courseId, username });
          expect(state.setState.creditRequestData).toHaveBeenCalledWith(testValue);
        });
      });
    });
  });
});
