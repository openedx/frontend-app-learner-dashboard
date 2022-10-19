import { shallow } from 'enzyme';

import { isMobileSize } from 'data/responsive';
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

  describe('snapshot', () => {
    test('is mobile', () => {
      isMobileSize.mockReturnValue(true);
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('is not mobile', () => {
      isMobileSize.mockReturnValue(false);
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
