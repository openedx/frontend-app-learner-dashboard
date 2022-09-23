import { shallow } from 'enzyme';

import SortForm from './SortForm';

import { SortKeys } from 'data/constants/app';

jest.mock('./Checkbox', () => 'Checkbox');

describe('SortForm', () => {
  const props = {
    handleSortChange: jest.fn().mockName('handleSortChange'),
    sortBy: SortKeys.enrolled,
  };
  describe('snapshot', () => {
    it('renders', () => {
      const wrapper = shallow(<SortForm {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});