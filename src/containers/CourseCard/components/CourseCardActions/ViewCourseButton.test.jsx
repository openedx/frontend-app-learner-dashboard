import { shallow } from 'enzyme';

import { htmlProps } from 'data/constants/htmlKeys';
import { hooks } from 'data/redux';
import ViewCourseButton from './ViewCourseButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(() => ({ marketingUrl: 'marketing-url' })),
    useCardEnrollmentData: jest.fn(() => ({ hasAccess: true })),
    useCardEntitlementData: jest.fn(() => ({ isEntitlement: false, isExpired: false })),
    useMasqueradeData: jest.fn(() => ({ isMasquerading: false })),
  },
}));

let wrapper;

describe('ViewCourseButton', () => {
  const props = {
    cardId: 'cardId',
  };
  const { marketingUrl } = hooks.useCardCourseRunData();
  describe('snapshot', () => {
    test('default button', () => {
      wrapper = shallow(<ViewCourseButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.href)).toEqual(marketingUrl);
    });
  });
  describe('behavior', () => {
    describe('disabled states', () => {
      test('learner does not have access', () => {
        hooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess: false });
        wrapper = shallow(<ViewCourseButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('expired entitlement', () => {
        hooks.useCardEntitlementData.mockReturnValueOnce({
          isEntitlement: true,
          isExpired: true,
        });
        wrapper = shallow(<ViewCourseButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('masquerading', () => {
        hooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
        wrapper = shallow(<ViewCourseButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
    });
  });
});
