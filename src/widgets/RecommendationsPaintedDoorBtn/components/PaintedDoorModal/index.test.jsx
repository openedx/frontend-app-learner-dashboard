import { shallow } from '@edx/react-unit-test-utils';

import ModalView from '.';

jest.mock('../../track', () => ({
  trackPaintedDoorRecommendationHomeSkipBtnClicked: jest.fn(),
  trackPaintedDoorRecommendationHomeInterestBtnClicked: jest.fn(),
}));
jest.mock('@edx/paragon', () => ({
  ...jest.requireActual('@edx/paragon'),
  ModalDialog: {
    Body: 'ModalDialog.Body',
    Header: 'ModalDialog.Header',
    Title: 'ModalDialog.Title',
    Footer: 'ModalDialog.Footer',
    CloseButton: 'ModalDialog.CloseButton',
  },
  ActionRow: 'ActionRow',
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
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
});
