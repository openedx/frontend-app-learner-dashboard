import { shallow } from 'enzyme';

import BottomWidgetContainer from '.';

describe('BottomWidgetContainer', () => {
  describe('snapshots', () => {
    test('default', () => {
      const wrapper = shallow(<BottomWidgetContainer />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
