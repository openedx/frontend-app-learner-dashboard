import { shallow } from 'enzyme';

import { SortKeys } from 'data/constants/app';
import SortForm from './SortForm';

jest.mock('./Checkbox', () => 'Checkbox');

describe('SortForm', () => {
  const props = {
    handleSortChange: jest.fn().mockName('handleSortChange'),
    sortBy: SortKeys.enrolled,
  };
  describe('snapshot', () => {
    test('renders', () => {
      const wrapper = shallow(<SortForm {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
