import { shallow } from '@edx/react-unit-test-utils';

import { reduxHooks } from 'hooks';
import { useCourseListData } from './hooks';
import CoursesPanel from '.';

jest.mock('hooks', () => ({
  reduxHooks: { useHasCourses: jest.fn() },
}));

jest.mock('./hooks', () => ({
  useCourseListData: jest.fn(),
}));

jest.mock('containers/CourseCard', () => 'CourseCard');
jest.mock('containers/CourseFilterControls', () => ({
  ActiveCourseFilters: 'ActiveCourseFilters',
  CourseFilterControls: 'CourseFilterControls',
}));
jest.mock('@openedx/frontend-plugin-framework', () => ({
  PluginSlot: 'PluginSlot',
}));
jest.mock('./CourseList', () => 'CourseList');

reduxHooks.useHasCourses.mockReturnValue(true);

describe('CoursesPanel', () => {
  const defaultCourseListData = {
    filterOptions: {},
    numPages: 1,
    setPageNumber: jest.fn().mockName('setPageNumber'),
    showFilters: false,
    visibleList: [],
  };

  const createWrapper = (courseListData) => {
    useCourseListData.mockReturnValueOnce({
      ...defaultCourseListData,
      ...courseListData,
    });
    return shallow(<CoursesPanel />);
  };

  describe('no courses', () => {
    test('snapshot', () => {
      reduxHooks.useHasCourses.mockReturnValue(false);
      const wrapper = createWrapper();
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
  describe('with courses', () => {
    test('snapshot', () => {
      reduxHooks.useHasCourses.mockReturnValue(true);
      const wrapper = createWrapper();
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
});
