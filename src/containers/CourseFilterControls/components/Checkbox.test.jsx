import { shallow } from 'enzyme';

import { FilterKeys } from 'data/constants/app';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  describe('snapshot', () => {
    Object.keys(FilterKeys).forEach((filterKey) => {
      it(`renders ${filterKey}`, () => {
        const wrapper = shallow(<Checkbox filterKey={filterKey} />);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
