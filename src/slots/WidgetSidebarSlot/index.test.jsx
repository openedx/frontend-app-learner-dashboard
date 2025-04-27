import { shallow } from '@edx/react-unit-test-utils';

import WidgetSidebarSlot from '.';

jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');

jest.mock('@openedx/frontend-plugin-framework', () => ({
  PluginSlot: 'PluginSlot',
}));

describe('WidgetSidebar', () => {
  beforeEach(() => jest.resetAllMocks());

  test('snapshots', () => {
    const wrapper = shallow(<WidgetSidebarSlot />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
