import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';

import * as hooks from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
  },
}));

const cardId = 'my-test-course-number';

describe('CourseCard hooks', () => {
  let out;
  const { formatMessage } = useIntl();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCardData', () => {
    const courseData = {
      title: 'fake-title',
      bannerImgSrc: 'my-banner-url',
    };
    const runHook = ({ course = {} }) => {
      reduxHooks.useCardCourseData.mockReturnValueOnce({
        ...courseData,
        ...course,
      });
      reduxHooks.useCardEnrollmentData.mockReturnValue({ isEnrolled: 'test-is-enrolled' });
      out = hooks.useCardData({ cardId });
    };
    beforeEach(() => {
      runHook({});
    });
    it('forwards formatMessage from useIntl', () => {
      expect(out.formatMessage).toEqual(formatMessage);
    });
    it('passes course title and banner URL form course data', () => {
      expect(reduxHooks.useCardCourseData).toHaveBeenCalledWith(cardId);
      expect(out.title).toEqual(courseData.title);
      expect(out.bannerImgSrc).toEqual(courseData.bannerImgSrc);
    });
  });
});
