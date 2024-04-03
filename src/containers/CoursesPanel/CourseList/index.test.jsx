import { shallow } from '@edx/react-unit-test-utils';

import { useIsCollapsed } from './hooks';
import CourseList from '.';

jest.mock('./hooks', () => ({
  useIsCollapsed: jest.fn(),
}));

jest.mock('containers/CourseCard', () => 'CourseCard');
jest.mock('containers/CourseFilterControls', () => ({
  ActiveCourseFilters: 'ActiveCourseFilters',
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

  const createWrapper = (courseListData = defaultCourseListData) => (
    shallow(<CourseList {...courseListData} />)
  );

  describe('no courses or filters', () => {
    test('snapshot', () => {
      const wrapper = createWrapper();
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
  describe('with filters', () => {
    test('snapshot', () => {
      const wrapper = createWrapper({
        filterOptions: { abitary: 'filter' },
        showFilters: true,
      });
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
  describe('with multiple courses and pages', () => {
    test('snapshot', () => {
      const wrapper = createWrapper({
        visibleList: [{ cardId: 'foo' }, { cardId: 'bar' }, { cardId: 'baz' }],
        numPages: 3,
      });
      expect(wrapper.snapshot).toMatchSnapshot();
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
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
});
