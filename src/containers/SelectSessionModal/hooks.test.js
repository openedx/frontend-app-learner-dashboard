import { useIntl } from '@edx/frontend-platform/i18n';
import track from 'tracking';

import { MockUseState } from 'testUtils';
import { useCourseData } from 'hooks';
import { useDeleteEntitlementEnrollment, useUpdateEntitlementEnrollment } from 'data/react-query/apiHooks';
import { useSelectSessionModal } from 'data/context/SelectSessionProvider';

import { LEAVE_OPTION } from './constants';
import messages from './messages';
import * as hooks from './hooks';

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useMemo: jest.fn((fn) => fn()),
    useState: jest.fn(),
  };
});

jest.mock('@edx/frontend-platform/i18n', () => {
  const { formatMessage } = jest.requireActual('testUtils');
  return {
    ...jest.requireActual('@edx/frontend-platform/i18n'),
    useIntl: () => ({
      formatMessage,
    }),
  };
});

jest.mock('tracking', () => ({
  entitlements: {
    newSession: jest.fn(),
    switchSession: jest.fn(),
    leaveSession: jest.fn(),
  },
}));
jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
}));

jest.mock('data/react-query/apiHooks', () => ({
  useUpdateEntitlementEnrollment: jest.fn(),
  useDeleteEntitlementEnrollment: jest.fn(),
}));

jest.mock('data/context/SelectSessionProvider', () => ({
  useSelectSessionModal: jest.fn(),
}));

const updateSelectSessionModalCallback = jest.fn();
const switchEntitlementEnrollment = jest.fn();
useUpdateEntitlementEnrollment.mockReturnValue({ mutate: switchEntitlementEnrollment });
const leaveEntitlementSession = jest.fn();
useDeleteEntitlementEnrollment.mockReturnValue({ mutate: leaveEntitlementSession });
const trackNewSession = jest.fn();
track.entitlements.newSession.mockReturnValue(trackNewSession);
const trackLeaveSession = jest.fn();
track.entitlements.leaveSession.mockReturnValue(trackLeaveSession);
const trackSwitchSession = jest.fn();
track.entitlements.switchSession.mockReturnValue(trackSwitchSession);

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

const testValue = 'test-value';

const courseId = 'test-course-id';

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
      useCourseData.mockReturnValue({
        course: { title: courseTitle, ...course },
        courseRun: { courseId, ...courseRun },
        enrollment: { isEnrolled: false, ...enrollment },
        entitlement: { ...entitlementData, ...entitlement },
      });
      useSelectSessionModal.mockReturnValue({
        selectSessionModal: { cardId: selectedCardId, ...selectSession },
        closeSelectSessionModal: updateSelectSessionModalCallback,
      });
      out = hooks.useSelectSessionModalData();
    };
    beforeEach(() => {
      state.mock();
      runHook({});
    });
    describe('initialization', () => {
      it('loads redux data based on selected card id', () => {
        expect(useCourseData).toHaveBeenCalledWith(selectedCardId);
      });
      it('initializes selected session with courseId if available', () => {
        state.expectInitializedWith(state.keys.selectedSession, courseId);
      });
      it('initializes selected session with null if courseId not available', () => {
        runHook({ courseRun: { courseId: undefined } });
        state.expectInitializedWith(state.keys.selectedSession, null);
      });
      it('initializes update callback with null', () => {
        expect(useSelectSessionModal).toHaveBeenCalledWith();
      });
      it('initializes tracking methods', () => {
        expect(track.entitlements.newSession).toHaveBeenCalledWith(courseId);
        expect(track.entitlements.leaveSession).toHaveBeenCalledWith(selectedCardId);
        expect(track.entitlements.switchSession).toHaveBeenCalledWith(selectedCardId, courseId);
      });
    });

    describe('output', () => {
      const { formatMessage } = useIntl();
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
          it('calls and tracks leaveEntitlementSession', () => {
            state.mockVal(state.keys.selectedSession, LEAVE_OPTION);
            runHook({});
            out.handleSubmit();
            const calledWith = {
              uuid,
              isRefundable: false,
            };
            expect(leaveEntitlementSession).toHaveBeenCalledWith(calledWith);
            expect(trackLeaveSession).toHaveBeenCalled();
          });
        });
        describe('if not enrolled in a session yet', () => {
          it('calls and tracks newEntitlementEnrollment with selected card ID and session', () => {
            state.mockVal(state.keys.selectedSession, testValue);
            runHook({});
            out.handleSubmit();
            const calledWith = {
              courseId: testValue,
              uuid,
            };
            expect(switchEntitlementEnrollment).toHaveBeenCalledWith(calledWith);
            expect(trackNewSession).toHaveBeenCalled();
          });
        });
        describe('if enrolled in a session already, selecting a new session', () => {
          it('calls and tracks swtichEntitlementEnrollment w/ selected card ID and session', () => {
            state.mockVal(state.keys.selectedSession, testValue);
            runHook({ enrollment: { isEnrolled: true } });
            out.handleSubmit();
            const calledWith = {
              courseId: testValue,
              uuid,
            };
            expect(switchEntitlementEnrollment).toHaveBeenCalledWith(calledWith);
            expect(trackSwitchSession).toHaveBeenCalled();
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
          updateSelectSessionModalCallback(),
        );
      });
    });
  });
});
