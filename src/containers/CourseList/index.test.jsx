import { shallow } from 'enzyme';

import CourseList from '.';
import { useCourseListData, useIsCollapsed } from './hooks';

jest.mock('./hooks', () => ({
  useCourseListData: jest.fn(),
  useIsCollapsed: jest.fn(),
}));

jest.mock('containers/CourseCard', () => 'CourseCard');
jest.mock('containers/CourseFilterControls', () => ({
  ActiveCourseFilters: 'ActiveCourseFilters',
  CourseFilterControls: 'CourseFilterControls',
}));

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

  describe('snapshots', () => {
    test('with no filters', () => {
      const wrapper = createWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('with filters', () => {
      const wrapper = createWrapper({
        filterOptions: {
          abitary: 'filter',
        },
        showFilters: true,
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('with multiple courses and pages', () => {
      const wrapper = createWrapper({
        visibleList: [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }],
        numPages: 3,
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('collapsed with multiple courses and pages', () => {
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
