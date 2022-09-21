import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
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
      appHooks.useCardCourseData.mockReturnValueOnce({
        ...courseData,
        ...course,
      });
      appHooks.useCardEnrollmentData.mockReturnValue({ isEnrolled: 'test-is-enrolled' });
      out = hooks.useCardData({ cardId });
    };
    beforeEach(() => {
      runHook({});
    });
    it('forwards formatMessage from useIntl', () => {
      expect(out.formatMessage).toEqual(formatMessage);
    });
    it('passes course title and banner URL form course data', () => {
      expect(appHooks.useCardCourseData).toHaveBeenCalledWith(cardId);
      expect(out.title).toEqual(courseData.title);
      expect(out.bannerImgSrc).toEqual(courseData.bannerImgSrc);
    });
  });
});
