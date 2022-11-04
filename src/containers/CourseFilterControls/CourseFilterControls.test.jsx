import { shallow } from 'enzyme';

import { breakpoints, useWindowSize } from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';

import CourseFilterControls from './CourseFilterControls';
import useCourseFilterControlsData from './hooks';

jest.mock('data/redux', () => ({
  hooks: { useHasCourses: jest.fn() },
}));

jest.mock('./hooks', () => jest.fn().mockName('useCourseFilterControlsData'));

jest.mock('./components/FilterForm', () => 'FilterForm');
jest.mock('./components/SortForm', () => 'SortForm');

appHooks.useHasCourses.mockReturnValue(true);

describe('CourseFilterControls', () => {
  const props = {
    sortBy: 'test-sort-by',
    setSortBy: jest.fn().mockName('setSortBy'),
    filters: ['test-filter'],
    setFilters: {
      add: jest.fn().mockName('setFilters.add'),
      remove: jest.fn().mockName('setFilters.remove'),
    },
  };

  useCourseFilterControlsData.mockReturnValue({
    isOpen: false,
    open: jest.fn().mockName('open'),
    close: jest.fn().mockName('close'),
    target: 'test-target',
    setTarget: jest.fn().mockName('setTarget'),
    handleFilterChange: jest.fn().mockName('handleFilterChange'),
    handleSortChange: jest.fn().mockName('handleSortChange'),
  });

  describe('no courses', () => {
    test('snapshot', () => {
      appHooks.useHasCourses.mockReturnValueOnce(false);
      useWindowSize.mockReturnValueOnce({ width: breakpoints.small.minWidth });
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('mobile', () => {
    test('snapshot', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.small.minWidth - 1 });
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('is not mobile', () => {
    test('snapshot', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.small.minWidth });
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
