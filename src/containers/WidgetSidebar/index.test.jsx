import { shallow } from 'enzyme';

import WidgetSidebar from '.';

describe('WidgetSidebar', () => {
  describe('snapshots', () => {
    test('default', () => {
      const wrapper = shallow(<WidgetSidebar />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
