import { shallow } from 'enzyme';

import { Alert } from '@edx/paragon';

import Banner from './Banner';

describe('Banner', () => {
  const props = {
    children: 'Hello, world!',
  };
  describe('snapshot', () => {
    test('renders default banner', () => {
      const wrapper = shallow(<Banner {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('renders with variants', () => {
      const wrapper = shallow(<Banner {...props} variant="success" />);
      expect(wrapper).toMatchSnapshot();

      expect(wrapper.find(Alert).prop('variant')).toEqual('success');
    });
    test('renders with custom class', () => {
      const wrapper = shallow(<Banner {...props} className="custom-class" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
