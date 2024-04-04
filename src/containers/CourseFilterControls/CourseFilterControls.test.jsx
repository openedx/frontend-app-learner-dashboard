import { shallow } from '@edx/react-unit-test-utils';

import { breakpoints, useWindowSize } from '@openedx/paragon';

import { reduxHooks } from 'hooks';

import CourseFilterControls from './CourseFilterControls';
import useCourseFilterControlsData from './hooks';

jest.mock('hooks', () => ({
  reduxHooks: { useHasCourses: jest.fn() },
}));

jest.mock('./hooks', () => jest.fn().mockName('useCourseFilterControlsData'));

jest.mock('./components/FilterForm', () => 'FilterForm');
jest.mock('./components/SortForm', () => 'SortForm');

reduxHooks.useHasCourses.mockReturnValue(true);

describe('CourseFilterControls', () => {
  const props = {
    sortBy: 'test-sort-by',
    setSortBy: jest.fn().mockName('setSortBy'),
    filters: ['test-filter'],
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
      reduxHooks.useHasCourses.mockReturnValueOnce(false);
      useWindowSize.mockReturnValueOnce({ width: breakpoints.small.minWidth });
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
  describe('mobile', () => {
    test('snapshot', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.small.minWidth - 1 });
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
  describe('is not mobile', () => {
    test('snapshot', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.small.minWidth });
      const wrapper = shallow(<CourseFilterControls {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
});
