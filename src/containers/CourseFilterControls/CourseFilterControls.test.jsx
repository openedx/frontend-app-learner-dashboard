import { shallow } from 'enzyme';

import { breakpoints, useWindowSize } from '@edx/paragon';
import CourseFilterControls from './CourseFilterControls';
import useCourseFilterControlsData from './hooks';

jest.mock('./hooks', () => jest.fn().mockName('useCourseFilterControlsData'));

jest.mock('./components/FilterForm', () => 'FilterForm');
jest.mock('./components/SortForm', () => 'SortForm');

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

  // hacky way to mock breakpoints
  breakpoints.small = {
    minWidth: 100,
  };

  describe('snapshot', () => {
    it('is mobile', () => {
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth - 1 });
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('is not mobile', () => {
      useWindowSize.mockReturnValue({ width: breakpoints.small.minWidth });
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
