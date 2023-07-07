import { shallow } from 'enzyme';

import hooks from 'widgets/ProductRecommendations/hooks';
import { mockFooterRecommendationsHook } from 'widgets/ProductRecommendations/testData';
import WidgetFooter from '.';

jest.mock('widgets/LookingForChallengeWidget', () => 'LookingForChallengeWidget');
jest.mock('widgets/ProductRecommendations/hooks', () => ({
  useActivateRecommendationsExperiment: jest.fn(),
  useShowRecommendationsFooter: jest.fn(),
}));

describe('WidgetFooter', () => {
  describe('snapshots', () => {
    test('default', () => {
      hooks.useShowRecommendationsFooter.mockReturnValueOnce(
        mockFooterRecommendationsHook.activeTreatment,
      );
      const wrapper = shallow(<WidgetFooter />);

      expect(hooks.useActivateRecommendationsExperiment).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });

  test('is hidden when the experiment has the default values', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(
      mockFooterRecommendationsHook.default,
    );
    const wrapper = shallow(<WidgetFooter />);

    expect(hooks.useActivateRecommendationsExperiment).toHaveBeenCalled();
    expect(wrapper.type()).toBeNull();
  });

  test('is hidden when the experiment has the control values', () => {
    hooks.useShowRecommendationsFooter.mockReturnValueOnce(
      mockFooterRecommendationsHook.activeControl,
    );
    const wrapper = shallow(<WidgetFooter />);

    expect(hooks.useActivateRecommendationsExperiment).toHaveBeenCalled();
    expect(wrapper.type()).toBeNull();
  });
});
