import { hooks as appHooks, actions } from 'data/redux';

import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useCardEntitlementsData: jest.fn(),
    useCardCourseData: jest.fn(),
    useSelectSessionsModalData: jest.fn(),
  },
  actions: {
    app: {
      updateSelectSessionModal: jest.fn(),
    },
  },
}));

const courseNumber = 'my-test-course-number';

const entitlement = {
  showSessionModal: false,
  showLeaveSessionInSessionModal: false,
};

const availableSessions = [
  { startDate: '1/2/2000', endDate: '1/2/2020', courseNumber },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseNumber },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseNumber },
];

const cardCourseData = {
  title: 'course-title: brown fox',
};

describe('SelectSessionModal hooks', () => {
  let out;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useSelectSession', () => {
    beforeEach(() => {
      appHooks.useSelectSessionsModalData.mockReturnValueOnce({ ...entitlement });
      appHooks.useCardEntitlementsData.mockReturnValueOnce({ entitlementSessions: availableSessions });
      appHooks.useCardCourseData.mockReturnValueOnce({ ...cardCourseData });
      out = hooks.useSelectSession({ courseNumber });
    });

    test('loads entitlement data based on course number', () => {
      expect(appHooks.useCardEntitlementsData).toHaveBeenCalledWith(courseNumber);
    });

    test('get course title based on course number', () => {
      expect(appHooks.useCardCourseData).toHaveBeenCalledWith(courseNumber);
      expect(out.courseTitle).toEqual(cardCourseData.title);
    });

    test('open session modal', () => {
      out.openSessionModal();
      expect(actions.app.updateSelectSessionModal).toHaveBeenCalledWith({
        showSessionModal: true,
        showLeaveSessionInSessionModal: false,
        courseNumber,
      });
    });

    test('open session modal with leave option', () => {
      out.openSessionModalWithLeaveOption();
      expect(actions.app.updateSelectSessionModal).toHaveBeenCalledWith({
        showSessionModal: true,
        showLeaveSessionInSessionModal: true,
        courseNumber,
      });
    });

    test('close session modal', () => {
      out.closeSessionModal();
      expect(actions.app.updateSelectSessionModal).toHaveBeenCalledWith({
        showSessionModal: false,
        showLeaveSessionInSessionModal: false,
        courseNumber,
      });
    });
  });
});
