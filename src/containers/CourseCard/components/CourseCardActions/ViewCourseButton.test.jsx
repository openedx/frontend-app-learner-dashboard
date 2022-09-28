import { shallow } from 'enzyme';

import { htmlProps } from 'data/constants/htmlKeys';
import { hooks } from 'data/redux';
import ViewCourseButton from './ViewCourseButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
    useMasqueradeData: jest.fn(),
  },
}));

describe('ViewCourseButton', () => {
  const props = {
    cardId: 'cardId',
  };
  const homeUrl = 'homeUrl';
  hooks.useCardCourseRunData.mockReturnValue({ homeUrl });
  const createWrapper = ({
    hasAccess = false,
    isEntitlement = false,
    isExpired = false,
    isMasquerading = false,
  }) => {
    hooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess });
    hooks.useCardEntitlementData.mockReturnValueOnce({ isEntitlement, isExpired });
    hooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading });
    return shallow(<ViewCourseButton {...props} />);
  };
  describe('snapshot', () => {
    test('default button', () => {
      const wrapper = createWrapper({ hasAccess: true });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.href)).toEqual(homeUrl);
    });
    test('disabled button', () => {
      const wrapper = createWrapper({});
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      expect(wrapper.prop(htmlProps.href)).toEqual(homeUrl);
    });
  });
  describe('behavior', () => {
    it('disabled button when masquerading', () => {
      const wrapper = createWrapper({ isMasquerading: true });
      expect(wrapper.prop('disabled')).toEqual(true);
    });
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
