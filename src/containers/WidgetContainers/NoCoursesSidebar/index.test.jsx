import { shallow } from 'enzyme';

import hooks from 'widgets/ProductRecommendations/hooks';
import WidgetSidebar from '.';

jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('widgets/ProductRecommendations/hooks', () => ({
  useShowRecommendationsFooter: jest.fn(),
}));

describe('WidgetSidebar', () => {
  describe('snapshots', () => {
    test('default', () => {
      hooks.useShowRecommendationsFooter.mockReturnValueOnce(false);
      const wrapper = shallow(<WidgetSidebar />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('is hidden if footer is shown', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(true);
    const wrapper = shallow(<WidgetSidebar />);
    expect(wrapper.type()).toBeNull();
  });
});
