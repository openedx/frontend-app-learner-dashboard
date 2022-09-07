import { useDispatch } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import { MockUseState } from 'testUtils';
import { hooks as appHooks, thunkActions } from 'data/redux';

import messages from './messages';
import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useCardEntitlementData: jest.fn(),
    useCardCourseData: jest.fn(),
    useSelectSessionModalData: jest.fn(),
    useUpdateSelectSessionModalCallback: jest.fn((...args) => ({
      updateSelectSession: args,
    })),
  },
  actions: {
    app: {
      updateSelectSessionModal: jest.fn(),
    },
  },
  thunkActions: {
    app: {
      updateEntitlementSession: jest.fn((...args) => ({ updateEntitlementSession: args })),
    },
  },
}));

const state = new MockUseState(hooks);
const selectedCardId = 'test-selected-card-id';

const selectSessionData = {
  cardId: selectedCardId,
};

const entitlementData = {
  entitlementessions: [
    { startDate: '1/2/2000', endDate: '1/2/2020', cardId: 'session-id-1' },
    { startDate: '2/3/2000', endDate: '2/3/2020', cardId: 'session-id-2' },
    { startDate: '3/4/2000', endDate: '3/4/2020', cardId: 'session-id-3' },
  ],
  isFullfilled: false,
};

const cardCourseData = {
  title: 'course-title: brown fox',
};

const { formatMessage } = useIntl();
const dispatch = useDispatch();

const testValue = 'test-value';

describe('SelectSessionModal hooks', () => {
  let out;

  describe('state values', () => {
    state.testGetter(state.keys.selectedSession);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useSelectSessionModalData', () => {
    const runHook = ({ selectSession = {}, entitlement = {}, course = {} }) => {
      appHooks.useSelectSessionModalData.mockReturnValueOnce({
        ...selectSessionData,
        ...selectSession,
      });
      appHooks.useCardEntitlementData.mockReturnValueOnce({
        ...entitlementData,
        ...entitlement,
      });
      appHooks.useCardCourseData.mockReturnValueOnce({
        ...cardCourseData,
        ...course,
      });
      out = hooks.useSelectSessionModalData();
    };
    beforeEach(() => {
      state.mock();
      runHook({});
    });
    describe('initialization', () => {
      test('loads entitlement data based on course number', () => {
        expect(appHooks.useCardEntitlementData).toHaveBeenCalledWith(selectedCardId);
      });
      test('get course title based on course number', () => {
        expect(appHooks.useCardCourseData).toHaveBeenCalledWith(selectedCardId);
      });
    });

    describe('output', () => {
      test('selected session defaults to null', () => {
        expect(out.selectedSession).toEqual(null);
      });
      describe('handleSelection', () => {
        it('sets selected session with event target value', () => {
          out.handleSelection({ target: { value: testValue } });
          expect(state.setState.selectedSession).toHaveBeenCalledWith(testValue);
        });
      });
      describe('handleSubmit', () => {
        it('dispatches updateEntitlementSession with selected card ID and session', () => {
          state.mockVal(state.keys.selectedSession, testValue);
          runHook({});
          expect(out.handleSubmit()).toEqual(dispatch(
            thunkActions.app.updateEntitlementSession(
              selectedCardId,
              testValue,
            ),
          ));
        });
      });
      test('showModal returns true if selectedCardId is not null or undefined', () => {
        expect(out.showModal).toEqual(true);
        runHook({ selectSession: { cardId: null } });
        expect(out.showModal).toEqual(false);
        runHook({ selectSession: { cardId: undefined } });
        expect(out.showModal).toEqual(false);
      });
      test('displays change or leave header and hint if fulfilled', () => {
        expect(out.header).toEqual(formatMessage(
          messages.selectSessionHeader,
          { courseTitle: cardCourseData.title },
        ));
        expect(out.hint).toEqual(formatMessage(messages.selectSessionHint));
      });
      test('displays select session header (w/ courseTitle) and hint if unfulfilled', () => {
        runHook({ entitlement: { isFulfilled: true } });
        expect(out.header).toEqual(formatMessage(messages.changeOrLeaveHeader));
        expect(out.hint).toEqual(formatMessage(messages.changeOrLeaveHint));
      });
      test('closeSessionModal returns update callback wth dispatch and null card id', () => {
        expect(out.closeSessionModal).toEqual(
          appHooks.useUpdateSelectSessionModalCallback(dispatch, null),
        );
      });
    });
  });
});
