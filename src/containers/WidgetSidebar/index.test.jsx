import { shallow } from 'enzyme';

import WidgetSidebar from '.';

jest.mock('./widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');

describe('WidgetSidebar', () => {
  describe('snapshots', () => {
    test('default', () => {
      const wrapper = shallow(<WidgetSidebar />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
