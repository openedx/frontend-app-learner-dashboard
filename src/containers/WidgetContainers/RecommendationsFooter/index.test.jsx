import { shallow } from 'enzyme';

import hooks from 'widgets/ProductRecommendations/hooks';
import WidgetFooter from '.';

jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('widgets/ProductRecommendations/hooks', () => ({
  useShowRecommendationsFooter: jest.fn(),
}));

describe('WidgetFooter', () => {
  describe('snapshots', () => {
    test('default', () => {
      hooks.useShowRecommendationsFooter.mockReturnValueOnce(true);
      const wrapper = shallow(<WidgetFooter />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('is hidden when hook returns false', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(false);
    const wrapper = shallow(<WidgetFooter />);
    expect(wrapper.type()).toBeNull();
  });
});
