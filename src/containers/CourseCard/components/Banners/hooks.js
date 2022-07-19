import { useIntl } from '@edx/frontend-platform/i18n';
import { useCardValues } from 'hooks';
import { selectors } from 'data/redux';

const { cardData } = selectors;

export const useCourseBannerData = ({ courseNumber }) => ({
  courseData: useCardValues(courseNumber, {
    isVerified: cardData.isVerified,
    isCourseRunActive: cardData.isCourseRunActive,
    canUpgrade: cardData.canUpgrade,
    isAuditAccessExpired: cardData.isAuditAccessExpired,
    courseWebsite: cardData.courseWebsite,
  }),
  formatMessage: useIntl().formatMessage,
});

export default {
  useCourseBannerData,
};
