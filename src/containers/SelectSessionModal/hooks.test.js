import { useDispatch } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import { MockUseState } from 'testUtils';
import { hooks as appHooks, thunkActions } from 'data/redux';

import { LEAVE_OPTION } from './constants';
import messages from './messages';
import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
    useSelectSessionModalData: jest.fn(),
    useUpdateSelectSessionModalCallback: jest.fn((...args) => () => ({
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
      switchEntitlementEnrollment: jest.fn((...args) => ({ switchEntitlementEnrollment: args })),
      leaveEntitlementSession: jest.fn((...args) => ({ leaveEntitlementSession: args })),
      newEntitlementEnrollment: jest.fn((...args) => ({ newEntitlementEnrollment: args })),
    },
  },
}));

const state = new MockUseState(hooks);
const selectedCardId = 'test-selected-card-id';
const courseTitle = 'course-title: brown fox';
const uuid = 'test-uuid';

const entitlementData = {
  availableSessions: [
    { startDate: '1/2/2000', endDate: '1/2/2020', cardId: 'session-id-1' },
    { startDate: '2/3/2000', endDate: '2/3/2020', cardId: 'session-id-2' },
    { startDate: '3/4/2000', endDate: '3/4/2020', cardId: 'session-id-3' },
  ],
  isFullfilled: false,
  uuid,
};

const { formatMessage } = useIntl();
const dispatch = useDispatch();

const testValue = 'test-value';

const courseId = 'test-course-id';
appHooks.useCardCourseRunData.mockReturnValue({ courseId });

describe('SelectSessionModal hooks', () => {
  let out;

  describe('state values', () => {
    state.testGetter(state.keys.selectedSession);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useSelectSessionModalData', () => {
    const runHook = ({
      course = {},
      courseRun = {},
      enrollment = {},
      entitlement = {},
      selectSession = {},
    }) => {
      appHooks.useCardCourseData.mockReturnValueOnce({ title: courseTitle, ...course });
      appHooks.useCardCourseRunData.mockReturnValueOnce({ courseId, ...courseRun });
      appHooks.useCardEnrollmentData.mockReturnValueOnce({ isEnrolled: false, ...enrollment });
      appHooks.useCardEntitlementData.mockReturnValueOnce({ ...entitlementData, ...entitlement });
      appHooks.useSelectSessionModalData.mockReturnValueOnce({ cardId: selectedCardId, ...selectSession });
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
      describe('selectedSession', () => {
        it('defaults to current courseId if enrolled', () => {
          expect(out.selectedSession).toEqual(courseId);
        });
        it('defaults to null if not enrolled', () => {
          runHook({ enrollment: { isEnrolled: false }, courseRun: { courseId: undefined } });
          expect(out.selectedSession).toEqual(null);
        });
      });
      describe('handleSelection', () => {
        it('sets selected session with event target value', () => {
          out.handleSelection({ target: { value: testValue } });
          expect(state.setState.selectedSession).toHaveBeenCalledWith(testValue);
        });
      });
      describe('handleSubmit', () => {
        describe('if LEAVE_OPTION is selected', () => {
          it('dispatches leaveEntitlementSession', () => {
            state.mockVal(state.keys.selectedSession, LEAVE_OPTION);
            runHook({});
            out.handleSubmit();
            expect(dispatch).toHaveBeenCalledWith(
              thunkActions.app.leaveEntitlementSession(selectedCardId),
            );
          });
        });
        describe('if not enrolled in a session yet', () => {
          it('dispatches newEntitlementEnrollment with selected card ID and session', () => {
            state.mockVal(state.keys.selectedSession, testValue);
            runHook({});
            out.handleSubmit();
            expect(dispatch).toHaveBeenCalledWith(
              thunkActions.app.newEntitlementEnrollment(selectedCardId, testValue),
            );
          });
        });
        describe('if enrolled in a session already, selecting a new session', () => {
          it('dispatches swtichEntitlementEnrollment with selected card ID and session', () => {
            state.mockVal(state.keys.selectedSession, testValue);
            runHook({ enrollment: { isEnrolled: true } });
            out.handleSubmit();
            expect(dispatch).toHaveBeenCalledWith(
              thunkActions.app.switchEntitlementEnrollment(selectedCardId, testValue),
            );
          });
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
        expect(out.header).toEqual(formatMessage(messages.selectSessionHeader, { courseTitle }));
        expect(out.hint).toEqual(formatMessage(messages.selectSessionHint));
      });
      test('displays select session header (w/ courseTitle) and hint if unfulfilled', () => {
        runHook({ entitlement: { isFulfilled: true } });
        expect(out.header).toEqual(formatMessage(messages.changeOrLeaveHeader));
        expect(out.hint).toEqual(formatMessage(messages.changeOrLeaveHint));
      });
      test('closeSessionModal returns update callback wth dispatch and null card id', () => {
        expect(out.closeSessionModal()).toEqual(
          appHooks.useUpdateSelectSessionModalCallback(null)(),
        );
      });
    });
  });
});
