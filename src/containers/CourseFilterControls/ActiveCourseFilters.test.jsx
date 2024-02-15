import { shallow } from '@edx/react-unit-test-utils';

import { FilterKeys } from 'data/constants/app';
import ActiveCourseFilters from './ActiveCourseFilters';

describe('ActiveCourseFilters', () => {
  const props = {
    filters: Object.values(FilterKeys),
    setFilters: {
      remove: jest.fn().mockName('setFilters.remove'),
      clear: jest.fn().mockName('setFilters.clear'),
    },
    handleRemoveFilter: jest.fn().mockName('handleRemoveFilter'),
  };
  describe('snapshot', () => {
    test('renders', () => {
      const wrapper = shallow(<ActiveCourseFilters {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
});
