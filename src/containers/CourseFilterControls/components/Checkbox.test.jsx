import { shallow } from 'enzyme';

import Checkbox from './Checkbox';

import { FilterKeys } from 'data/constants/app';

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