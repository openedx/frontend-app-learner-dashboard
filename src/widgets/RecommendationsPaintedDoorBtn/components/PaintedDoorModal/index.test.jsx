import { shallow } from 'enzyme';

import ModalView from '.';

jest.mock('../../track', () => ({
  trackPaintedDoorRecommendationHomeSkipBtnClicked: jest.fn(),
  trackPaintedDoorRecommendationHomeInterestBtnClicked: jest.fn(),
}));

describe('ModalView', () => {
  const props = {
    isOpen: true,
    onClose: jest.fn(),
    variation: '',
  };
  describe('snapshot', () => {
    test('should renders default ModalView', () => {
      const wrapper = shallow(<ModalView {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
