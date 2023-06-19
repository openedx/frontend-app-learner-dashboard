import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import { useCourseListData, useIsCollapsed } from './hooks';
import CourseList from '.';

jest.mock('hooks', () => ({
  reduxHooks: { useHasCourses: jest.fn() },
}));

jest.mock('./hooks', () => ({
  useCourseListData: jest.fn(),
  useIsCollapsed: jest.fn(),
}));

jest.mock('containers/CourseCard', () => 'CourseCard');
jest.mock('containers/CourseFilterControls', () => ({
  ActiveCourseFilters: 'ActiveCourseFilters',
  CourseFilterControls: 'CourseFilterControls',
}));

reduxHooks.useHasCourses.mockReturnValue(true);

describe('CourseList', () => {
  const defaultCourseListData = {
    filterOptions: {},
    numPages: 1,
    setPageNumber: jest.fn().mockName('setPageNumber'),
    showFilters: false,
    visibleList: [],
  };
  useIsCollapsed.mockReturnValue(false);
  const createWrapper = (courseListData) => {
    useCourseListData.mockReturnValueOnce({
      ...defaultCourseListData,
      ...courseListData,
    });
    return shallow(<CourseList />);
  };

  describe('no courses', () => {
    test('snapshot', () => {
      reduxHooks.useHasCourses.mockReturnValue(true);
      const wrapper = createWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('no filters', () => {
    test('snapshot', () => {
      const wrapper = createWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('with filters', () => {
    test('snapshot', () => {
      const wrapper = createWrapper({
        filterOptions: { abitary: 'filter' },
        showFilters: true,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('with multiple courses and pages', () => {
    test('snapshot', () => {
      const wrapper = createWrapper({
        visibleList: [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }],
        numPages: 3,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('collapsed with multiple courses and pages', () => {
    test('snapshot', () => {
      useIsCollapsed.mockReturnValueOnce(true);
      const wrapper = createWrapper({
        visibleList: [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }],
        numPages: 3,
        showFilters: true,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
