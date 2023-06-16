import { shallow } from 'enzyme';

import hooks from 'widgets/ProductRecommendations/hooks';
import { mockHookObject } from 'widgets/ProductRecommendations/testData';
import WidgetSidebar from '.';

jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('widgets/ProductRecommendations/hooks', () => ({
  useShowRecommendationsFooter: jest.fn(),
}));

describe('WidgetSidebar', () => {
  describe('snapshots', () => {
    test('default', () => {
      hooks.useShowRecommendationsFooter.mockReturnValueOnce(mockHookObject.dontShowOrLoad);
      const wrapper = shallow(<WidgetSidebar />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('is hidden if footer is shown', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(mockHookObject.showDontLoad);
    const wrapper = shallow(<WidgetSidebar />);
    expect(wrapper.type()).toBeNull();
  });
});
