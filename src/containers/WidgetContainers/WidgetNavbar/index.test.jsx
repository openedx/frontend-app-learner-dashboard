import { shallow } from '@edx/react-unit-test-utils';
import {
  usePaintedDoorExperimentContext,
} from '../../../widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext';
import WidgetNavbar from './index';
import { EXPANDED_NAVBAR } from '../../../widgets/RecommendationsPaintedDoorBtn/constants';

jest.mock('widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext', () => ({
  usePaintedDoorExperimentContext: jest.fn(),
}));

describe('WidgetNavbar', () => {
  let mockExperimentContext = {
    experimentVariation: '',
    isPaintedDoorNavbarBtnVariation: true,
    experimentLoading: false,
  };
  const props = {
    placement: EXPANDED_NAVBAR,
  };

  describe('snapshots', () => {
    test('default', () => {
      usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
      const wrapper = shallow(<WidgetNavbar {...props} />);

      expect(usePaintedDoorExperimentContext).toHaveBeenCalled();
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });

  test('renders button if user in navbar variation', () => {
    usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
    const wrapper = shallow(<WidgetNavbar {...props} />);

    expect(usePaintedDoorExperimentContext).toHaveBeenCalled();
    expect(wrapper.instance.type).toBe('RecommendationsPaintedDoorBtn');
  });

  test('renders nothing if user in not in navbar variation', () => {
    mockExperimentContext = {
      ...mockExperimentContext,
      isPaintedDoorNavbarBtnVariation: false,
    };
    usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
    const wrapper = shallow(<WidgetNavbar {...props} />);

    expect(usePaintedDoorExperimentContext).toHaveBeenCalled();
    expect(wrapper.shallowWrapper).toBeNull();
  });

  test('renders nothing if experiment is loading', () => {
    mockExperimentContext = {
      ...mockExperimentContext,
      isPaintedDoorNavbarBtnVariation: false,
      experimentLoading: true,
    };
    usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
    const wrapper = shallow(<WidgetNavbar {...props} />);

    expect(usePaintedDoorExperimentContext).toHaveBeenCalled();
    expect(wrapper.shallowWrapper).toBeNull();
  });
});
