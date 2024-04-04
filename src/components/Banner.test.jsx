import { shallow } from '@edx/react-unit-test-utils';

import { Alert } from '@openedx/paragon';

import Banner from './Banner';

describe('Banner', () => {
  const props = {
    children: 'Hello, world!',
  };
  describe('snapshot', () => {
    test('renders default banner', () => {
      const wrapper = shallow(<Banner {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
    test('renders with variants', () => {
      const wrapper = shallow(<Banner {...props} variant="success" />);
      expect(wrapper.snapshot).toMatchSnapshot();

      expect(wrapper.instance.findByType(Alert)[0].props.variant).toEqual('success');
    });
    test('renders with custom class', () => {
      const wrapper = shallow(<Banner {...props} className="custom-class" />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
});
