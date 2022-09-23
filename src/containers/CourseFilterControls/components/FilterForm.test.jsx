import { shallow } from 'enzyme';

import FilterForm, { filterOrder } from './FilterForm';

import { FilterKeys } from 'data/constants/app';

jest.mock('./Checkbox', () => 'Checkbox');

describe('FilterForm', () => {
  const props = {
    filters: ['test-filter'],
    handleFilterChange: jest.fn().mockName('handleFilterChange'),
  };
  describe('snapshot', () => {
    it('renders', () => {
      const wrapper = shallow(<FilterForm {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('filterOrder', () => {
    expect(filterOrder).toEqual([
      FilterKeys.inProgress,
      FilterKeys.notStarted,
      FilterKeys.done,
      FilterKeys.notEnrolled,
      FilterKeys.upgraded,
    ]);
  });
});