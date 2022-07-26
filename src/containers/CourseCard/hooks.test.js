import { useIntl } from '@edx/frontend-platform/i18n';

import { hooks as appHooks } from 'data/redux';

import * as hooks from './hooks';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseData: jest.fn(),
  },
}));

const courseNumber = 'my-test-course-number';

describe('CourseCard hooks', () => {
  let out;
  const { formatMessage } = useIntl();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCardData', () => {
    const courseData = {
      title: 'fake-title',
      bannerUrl: 'my-banner-url',
    };
    const runHook = ({ course = {} }) => {
      appHooks.useCardCourseData.mockReturnValueOnce({
        ...courseData,
        ...course,
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
  });
});
