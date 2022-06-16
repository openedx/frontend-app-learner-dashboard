import { keyStore } from 'utils';
import { selectors } from 'data/redux';
import * as appHooks from 'hooks';
import { testCardValues } from 'testUtils';

import * as hooks from './hooks';
import messages from './messages';

const { fieldKeys } = selectors.cardData;

const courseNumber = 'my-test-course-number';
const useAccessMessage = 'test-access-message';
const mockAccessMessage = (args) => ({ courseNumber: args.coursenumber, useAccessMessage });
const hookKeys = keyStore(hooks);

describe('CourseCard hooks', () => {
  let out;
  const { formatMessage, formatDate } = appHooks.useIntl();
  describe('useCardData', () => {
    beforeEach(() => {
      jest.spyOn(hooks, hookKeys.useAccessMessage).mockImplementationOnce(mockAccessMessage);
      out = hooks.useCardData({ courseNumber });
    });

    testCardValues(courseNumber, {
      title: fieldKeys.courseTitle,
      bannerUrl: fieldKeys.courseBannerUrl,
      providerName: fieldKeys.providerName,
    });

    test('providerName returns Unknown message if not provided', () => {
      appHooks.useCardValues.mockReturnValueOnce({
        title: 'title',
        bannerUrl: 'bannerUrl',
        providerName: null,
      });
      jest.spyOn(hooks, hookKeys.useAccessMessage).mockImplementationOnce(mockAccessMessage);
      out = hooks.useCardData({ courseNumber });
      expect(out.providerName).toEqual(formatMessage(messages.unknownProviderName));
    });
    describe('useAccessMessage', () => {
      it('returns the output of useAccessMessage hook, passed courseNumber', () => {
        expect(out.accessMessage).toEqual(mockAccessMessage({ courseNumber }));
      });
    });
    it('forwards formatMessage from useIntl', () => {
      expect(out.formatMessage).toEqual(formatMessage);
    });
  });

  describe('useAccessMessage', () => {
    const accessExpirationDate = 'test-expiration-date';
    const endDate = 'test-end-date';

    beforeEach(() => {
      appHooks.useCardValues.mockClear();
    });

    describe('loaded data', () => {
      beforeEach(() => {
        out = hooks.useAccessMessage({ courseNumber });
      });

      testCardValues(courseNumber, {
        accessExpirationDate: fieldKeys.courseRunAccessExpirationDate,
        isAudit: fieldKeys.isAudit,
        isFinished: fieldKeys.isCourseRunFinished,
        isAuditAccessExpired: fieldKeys.isAuditAccessExpired,
        endDate: fieldKeys.courseRunEndDate,
      });
    });

    describe('if audit, and expired', () => {
      it('returns accessExpired message with accessExpirationDate from cardData', () => {
        appHooks.useCardValues.mockReturnValueOnce({
          accessExpirationDate,
          endDate,
          isAudit: true,
          isFinished: false,
          isAuditAccessExpired: true,
        });
        expect(hooks.useAccessMessage({ courseNumber })).toEqual(formatMessage(
          messages.accessExpired,
          { accessExpirationDate: formatDate(accessExpirationDate) },
        ));
      });
    });

    describe('if audit and not expired', () => {
      it('returns accessExpires message with accessExpirationDate from cardData', () => {
        appHooks.useCardValues.mockReturnValueOnce({
          accessExpirationDate,
          endDate,
          isAudit: true,
          isFinished: false,
          isAuditAccessExpired: false,
        });
        expect(hooks.useAccessMessage({ courseNumber })).toEqual(formatMessage(
          messages.accessExpires,
          { accessExpirationDate: formatDate(accessExpirationDate) },
        ));
      });
    });

    describe('if verified and not ended', () => {
      it('returns course ends message with course end date', () => {
        appHooks.useCardValues.mockReturnValueOnce({
          accessExpirationDate,
          endDate,
          isAudit: false,
          isFinished: false,
          isAuditAccessExpired: false,
        });
        expect(hooks.useAccessMessage({ courseNumber })).toEqual(formatMessage(
          messages.courseEnds,
          { endDate: formatDate(endDate) },
        ));
      });
    });

    describe('if verified and ended', () => {
      it('returns course ended message with course end date', () => {
        appHooks.useCardValues.mockReturnValueOnce({
          accessExpirationDate,
          endDate,
          isAudit: false,
          isFinished: true,
          isAuditAccessExpired: false,
        });
        expect(hooks.useAccessMessage({ courseNumber })).toEqual(formatMessage(
          messages.courseEnded,
          { endDate: formatDate(endDate) },
        ));
      });
    });
  });
});
