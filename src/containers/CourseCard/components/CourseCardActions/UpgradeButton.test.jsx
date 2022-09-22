import { shallow } from 'enzyme';

import UpgradeButton from './UpgradeButton';
import { hooks } from 'data/redux';

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
    it('can upgrade', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({ canUpgrade: true });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('cannot upgrade', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({ canUpgrade: false });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});