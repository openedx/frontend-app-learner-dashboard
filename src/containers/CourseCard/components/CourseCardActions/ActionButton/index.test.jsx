import { shallow } from 'enzyme';

import ActionButton from '.';

import useIsCollapsed from './hooks';

jest.mock('./hooks', () => jest.fn());

describe('ActionButton', () => {
  const props = {
    arbitary: 'props',
  };
  describe('snapshot', () => {
    test('is collapsed', () => {
      useIsCollapsed.mockReturnValueOnce(true);
      const wrapper = shallow(<ActionButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('is not collapsed', () => {
      useIsCollapsed.mockReturnValueOnce(false);
      const wrapper = shallow(<ActionButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
