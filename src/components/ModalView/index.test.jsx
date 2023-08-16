import { shallow } from 'enzyme';

import ModalView from '.';

describe('ModalView', () => {
  const props = {
    isOpen: true,
    onClose: jest.fn(),
  };
  describe('snapshot', () => {
    test('should renders default ModalView', () => {
      const wrapper = shallow(<ModalView {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
