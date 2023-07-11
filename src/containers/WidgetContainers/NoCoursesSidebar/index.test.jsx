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
        mockFooterRecommendationsHook.activeControl,
      );
      const wrapper = shallow(<WidgetSidebar {...props} />);

      expect(props.setSidebarShowing).toHaveBeenCalledWith(true);
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('is hidden when the has the default values', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(
      mockFooterRecommendationsHook.default,
    );
    const wrapper = shallow(<WidgetSidebar {...props} />);

    expect(props.setSidebarShowing).not.toHaveBeenCalled();
    expect(wrapper.type()).toBeNull();
  });

  test('is hidden when the has the treatment values', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(
      mockFooterRecommendationsHook.activeTreatment,
    );
    const wrapper = shallow(<WidgetSidebar {...props} />);

    expect(props.setSidebarShowing).not.toHaveBeenCalled();
    expect(wrapper.type()).toBeNull();
  });
});
