import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import UpgradeButton from './UpgradeButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
  },
}));

describe('UpgradeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  const upgradeUrl = 'upgradeUrl';
  hooks.useCardCourseRunData.mockReturnValue({ upgradeUrl });
  describe('snapshot', () => {
    test('can upgrade', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({ canUpgrade: true });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    test('cannot upgrade', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({ canUpgrade: false });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
