import { shallow } from 'enzyme';

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
    it('renders', () => {
      const wrapper = shallow(<ActiveCourseFilters {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
