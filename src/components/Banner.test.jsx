import { shallow } from 'enzyme';

import Banner from './Banner';

describe('Banner', () => {
  const props = {
    children: 'Hello, world!',
  };
  describe('snapshot', () => {
    it('renders default banner', () => {
      const wrapper = shallow(<Banner {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders with variants', () => {
      const wrapper = shallow(<Banner {...props} variant="success" />);
      expect(wrapper).toMatchSnapshot();

      expect(wrapper.find('Alert').prop('variant')).toEqual('success');
    });
  });
});