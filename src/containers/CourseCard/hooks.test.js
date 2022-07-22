import { useIntl } from '@edx/frontend-platform/i18n';

import { keyStore } from 'utils';
import { hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';
import messages from './messages';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardProviderData: jest.fn(),
  },
}));

const courseNumber = 'my-test-course-number';
const useAccessMessage = 'test-access-message';
const mockAccessMessage = (args) => ({ courseNumber: args.coursenumber, useAccessMessage });
const hookKeys = keyStore(hooks);

describe('CourseCard hooks', () => {
  let out;
  const { formatMessage, formatDate } = useIntl();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCardData', () => {
    const courseData = {
      title: 'fake-title',
      bannerUrl: 'my-banner-url',
    };
    const providerData = {
      name: 'my-provider-name',
    };
    const runHook = ({ course = {}, provider = {} }) => {
      jest.spyOn(hooks, hookKeys.useAccessMessage)
        .mockImplementationOnce(mockAccessMessage);
      appHooks.useCardCourseData.mockReturnValueOnce({
        ...courseData,
        ...course,
      });
      appHooks.useCardProviderData.mockReturnValueOnce({
        ...providerData,
        ...provider,
      });
      out = hooks.useCardData({ courseNumber });
    };
    beforeEach(() => {
      runHook({});
    });
    it('forwards formatMessage from useIntl', () => {
      expect(out.formatMessage).toEqual(formatMessage);
    });
    it('passes course title and banner URL form course data', () => {
      expect(appHooks.useCardCourseData).toHaveBeenCalledWith(courseNumber);
      expect(out.title).toEqual(courseData.title);
      expect(out.bannerUrl).toEqual(courseData.bannerUrl);
    });
    it('forwards useAccessMessage output, called with courseNumber', () => {
      expect(out.accessMessage).toEqual(mockAccessMessage({ courseNumber }));
    });
    it('forwards provider name if it exists, else formatted unknown provider name', () => {
      expect(appHooks.useCardCourseData).toHaveBeenCalledWith(courseNumber);
      expect(out.providerName).toEqual(providerData.name);
      runHook({ provider: { name: '' } });
      expect(out.providerName).toEqual(formatMessage(messages.unknownProviderName));
    });
  });
  describe('useAccessMessage', () => {
    const enrollmentData = {
      accessExpirationDate: 'test-expiration-date',
      isAudit: false,
      isAuditAccessExpired: false,
    };
    const courseRunData = {
      isFinished: false,
      endDate: 'test-end-date',
    };
    const runHook = ({ enrollment = {}, courseRun = {} }) => {
      appHooks.useCardCourseRunData.mockReturnValueOnce({
        ...courseRunData,
        ...courseRun,
      });
      appHooks.useCardEnrollmentData.mockReturnValueOnce({
        ...enrollmentData,
        ...enrollment,
      });
      out = hooks.useAccessMessage({ courseNumber });
    };
    it('loads data from enrollment and course run data based on course number', () => {
      runHook({});
      expect(appHooks.useCardCourseRunData).toHaveBeenCalledWith(courseNumber);
      expect(appHooks.useCardEnrollmentData).toHaveBeenCalledWith(courseNumber);
    });
    describe('if audit, and expired', () => {
      it('returns accessExpired message with accessExpirationDate from cardData', () => {
        runHook({ enrollment: { isAudit: true, isAuditAccessExpired: true } });
        expect(out).toEqual(formatMessage(
          messages.accessExpired,
          { accessExpirationDate: formatDate(enrollmentData.accessExpirationDate) },
        ));
      });
    });

    describe('if audit and not expired', () => {
      it('returns accessExpires message with accessExpirationDate from cardData', () => {
        runHook({ enrollment: { isAudit: true } });
        expect(out).toEqual(formatMessage(
          messages.accessExpires,
          { accessExpirationDate: formatDate(enrollmentData.accessExpirationDate) },
        ));
      });
    });

    describe('if verified and not ended', () => {
      it('returns course ends message with course end date', () => {
        runHook({});
        expect(out).toEqual(formatMessage(
          messages.courseEnds,
          { endDate: formatDate(courseRunData.endDate) },
        ));
      });
    });

    describe('if verified and ended', () => {
      it('returns course ended message with course end date', () => {
        runHook({ courseRun: { isArchived: true } });
        expect(out).toEqual(formatMessage(
          messages.courseEnded,
          { endDate: formatDate(courseRunData.endDate) },
        ));
      });
    });
  });
});
