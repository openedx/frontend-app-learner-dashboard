import { shallow } from 'enzyme';

import hooks from 'widgets/ProductRecommendations/hooks';
import { mockFooterRecommendationsHook } from 'widgets/ProductRecommendations/testData';
import WidgetSidebar from '.';

jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('widgets/ProductRecommendations/hooks', () => ({
  useShowRecommendationsFooter: jest.fn(),
}));

describe('WidgetSidebar', () => {
  beforeEach(() => jest.resetAllMocks());
  const props = {
    setSidebarShowing: jest.fn(),
  };

  describe('snapshots', () => {
    test('default', () => {
      hooks.useShowRecommendationsFooter.mockReturnValueOnce(
        mockFooterRecommendationsHook.dontShowOrLoad,
      );
      const wrapper = shallow(<WidgetSidebar {...props} />);
      expect(props.setSidebarShowing).toHaveBeenCalledWith(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('is hidden if footer is shown', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(
      mockFooterRecommendationsHook.showDontLoad,
    );
    const wrapper = shallow(<WidgetSidebar {...props} />);
    expect(props.setSidebarShowing).not.toHaveBeenCalled();
    expect(wrapper.type()).toBeNull();
  });
});
