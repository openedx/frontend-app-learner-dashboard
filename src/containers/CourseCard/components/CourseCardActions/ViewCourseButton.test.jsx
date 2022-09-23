import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import ViewCourseButton from './ViewCourseButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
  },
}));

describe('ViewCourseButton', () => {
  const props = {
    cardId: 'cardId',
  };
  const marketingUrl = 'marketingUrl';
  hooks.useCardCourseRunData.mockReturnValue({ marketingUrl });
  const createWrapper = ({ hasAccess, isEntitlement, isExpired }) => {
    hooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess });
    hooks.useCardEntitlementData.mockReturnValueOnce({ isEntitlement, isExpired });
    return shallow(<ViewCourseButton {...props} />);
  };
  describe('snapshot', () => {
    it('default button', () => {
      const wrapper = createWrapper({ hasAccess: true, isEntitlement: false, isExpired: false });
      expect(wrapper).toMatchSnapshot();
    });
    it('disabled button', () => {
      const wrapper = createWrapper({ hasAccess: false, isEntitlement: false, isExpired: false });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('behavior', () => {
    it('disabled button without access', () => {
      const wrapper = createWrapper({ hasAccess: false, isEntitlement: false, isExpired: false });
      expect(wrapper.prop('disabled')).toEqual(true);
    });
    it('disabled button with access', () => {
      const wrapper = createWrapper({ hasAccess: true, isEntitlement: true, isExpired: true });
      expect(wrapper.prop('disabled')).toEqual(true);
    });
    it('enabled button', () => {
      const wrapper = createWrapper({ hasAccess: true, isEntitlement: false, isExpired: false });
      expect(wrapper.prop('disabled')).toEqual(false);
    });
  });
});
