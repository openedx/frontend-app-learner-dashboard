import { shallow } from 'enzyme';

import hooks from 'widgets/ProductRecommendations/hooks';
import { mockFooterRecommendationsHook } from 'widgets/ProductRecommendations/testData';
import WidgetFooter from '.';

jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('widgets/ProductRecommendations/hooks', () => ({
  useShowRecommendationsFooter: jest.fn(),
}));

describe('WidgetFooter', () => {
  describe('snapshots', () => {
    test('default', () => {
      hooks.useShowRecommendationsFooter.mockReturnValueOnce(
        mockFooterRecommendationsHook.showAndLoad,
      );
      const wrapper = shallow(<WidgetFooter />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('is hidden when shouldShowFooter is false but shouldLoadFooter is true', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(
      mockFooterRecommendationsHook.loadDontShow,
    );
    const wrapper = shallow(<WidgetFooter />);
    expect(wrapper.type()).toBeNull();
  });

  test('is hidden when shouldLoadFooter is false but shouldShowFooter is true', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(
      mockFooterRecommendationsHook.showDontLoad,
    );
    const wrapper = shallow(<WidgetFooter />);
    expect(wrapper.type()).toBeNull();
  });
});
