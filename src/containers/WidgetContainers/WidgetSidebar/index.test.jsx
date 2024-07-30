import { shallow } from '@edx/react-unit-test-utils';

import WidgetSidebar from '.';

jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');

jest.mock('@openedx/frontend-plugin-framework', () => ({
  PluginSlot: 'PluginSlot',
}));

describe('WidgetSidebar', () => {
  beforeEach(() => jest.resetAllMocks());

  test('snapshots', () => {
    const wrapper = shallow(<WidgetSidebar />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
