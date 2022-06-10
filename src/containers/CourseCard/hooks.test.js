import { keyStore } from 'utils';
import { selectors } from 'data/redux';
import * as appHooks from 'hooks';
import { testCardValues } from 'testUtils';

import * as hooks from './hooks';
import messages from './messages';

const { fieldKeys } = selectors.cardData;

const courseNumber = 'my-test-course-number';

describe('CourseCard hooks', () => {
  let out;
  const { formatMessage, formatDate } = appHooks.useIntl();
  describe('cardHooks', () => {
    const accessMessage = 'test-access-message';
    const mockAccessMessage = (args) => ({ courseNumber: args.coursenumber, accessMessage });
    const hookKeys = keyStore(hooks);
    beforeEach(() => {
      jest.spyOn(hooks, hookKeys.accessMessage).mockImplementationOnce(mockAccessMessage);
      out = hooks.cardHooks({ courseNumber });
    });
    testCardValues(courseNumber, {
      title: fieldKeys.courseTitle,
      bannerUrl: fieldKeys.courseBannerUrl,
      providerName: fieldKeys.providerName,
    });
    test('providerName returns Unknown message if not provided', () => {
      appHooks.getCardValues.mockReturnValueOnce({
        title: 'title',
        bannerUrl: 'bannerUrl',
        providerName: null,
      });
      jest.spyOn(hooks, hookKeys.accessMessage).mockImplementationOnce(mockAccessMessage);
      out = hooks.cardHooks({ courseNumber });
      expect(out.providerName).toEqual(formatMessage(messages.unknownProviderName));
    });
    describe('accessMessage', () => {
      it('returns the output of accessMessage hook, passed courseNumber', () => {
        expect(out.accessMessage).toEqual(mockAccessMessage({ courseNumber }));
      });
    });
    it('forwards formatMessage from useIntl', () => {
      expect(out.formatMessage).toEqual(formatMessage);
    });
  });
  describe('accessMessage', () => {
    const accessExpirationDate = 'test-expiration-date';
    const endDate = 'test-end-date';
    describe('loaded data', () => {
      beforeEach(() => {
        appHooks.getCardValues.mockClear();
        out = hooks.accessMessage({ courseNumber });
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
      it('returns accessExpires message with accessExpirationDate from cardData', () => {
        appHooks.getCardValues.mockReturnValueOnce({
          accessExpirationDate,
          endDate,
          isAudit: true,
          isFinished: false,
          isAuditAccessExpired: true,
        });
        expect(hooks.accessMessage({ courseNumber })).toEqual(formatMessage(
          messages.accessExpired,
          { accessExpirationDate: formatDate(accessExpirationDate) },
        ));
      });
    });
    describe('if audit and not expired', () => {
      it('returns accessExpires message with accessExpirationDate from cardData', () => {
        appHooks.getCardValues.mockReturnValueOnce({
          accessExpirationDate,
          endDate,
          isAudit: true,
          isFinished: false,
          isAuditAccessExpired: false,
        });
        expect(hooks.accessMessage({ courseNumber })).toEqual(formatMessage(
          messages.accessExpires,
          { accessExpirationDate: formatDate(accessExpirationDate) },
        ));
      });
    });
    describe('if verified and not ended', () => {
      it('returns accessExpires message with accessExpirationDate from cardData', () => {
        appHooks.getCardValues.mockReturnValueOnce({
          accessExpirationDate,
          endDate,
          isAudit: false,
          isFinished: false,
          isAuditAccessExpired: true,
        });
        expect(hooks.accessMessage({ courseNumber })).toEqual(formatMessage(
          messages.courseEnds,
          { endDate: formatDate(endDate) },
        ));
      });
    });
    describe('if verified and ended', () => {
      it('returns accessExpires message with accessExpirationDate from cardData', () => {
        appHooks.getCardValues.mockReturnValueOnce({
          accessExpirationDate,
          endDate,
          isAudit: false,
          isFinished: true,
          isAuditAccessExpired: true,
        });
        expect(hooks.accessMessage({ courseNumber })).toEqual(formatMessage(
          messages.courseEnded,
          { endDate: formatDate(endDate) },
        ));
      });
    });
  });
});
