import { useIntl } from '@edx/frontend-platform/i18n';

import { selectors } from 'data/redux';
import { testCardValues } from 'testUtils';
import * as appHooks from 'hooks';

import * as hooks from './hooks';

const { fieldKeys } = selectors.cardData;

const courseNumber = 'my-test-course-number';

describe('CourseCard  banner hooks', () => {
  let out;
  const { formatMessage } = useIntl();
  describe('useCourseBannerData', () => {
    const courseData = {
      isVerified: false,
      isCourseRunActive: false,
      canUpgrade: false,
      isAuditAcessExpired: false,
      courseWebsite: 'test-course-website',
    };
    beforeEach(() => {
      appHooks.useCardValues.mockReturnValueOnce(courseData);
      out = hooks.useCourseBannerData({ courseNumber });
    });
    testCardValues(courseNumber, {
      isVerified: fieldKeys.isVerified,
      isCourseRunActive: fieldKeys.isCourseRunActive,
      canUpgrade: fieldKeys.canUpgrade,
      isAuditAccessExpired: fieldKeys.isAuditAccessExpired,
      courseWebsite: fieldKeys.courseWebsite,
    });
    it('forwards formatMessage from useIntl', () => {
      expect(out.formatMessage).toEqual(formatMessage);
    });
  });
});
