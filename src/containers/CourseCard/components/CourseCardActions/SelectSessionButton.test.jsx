import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import { htmlProps } from 'data/constants/htmlKeys';
import SelectSessionButton from './SelectSessionButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardEnrollmentData: jest.fn(() => ({ hasAccess: true })),
    useCardEntitlementData: jest.fn(() => ({ canChange: true, hasSessions: true })),
    useMasqueradeData: jest.fn(() => ({ isMasquerading: false })),
    useUpdateSelectSessionModalCallback: () => jest.fn().mockName('mockOpenSessionModal'),
  },
}));

let wrapper;

describe('SelectSessionButton', () => {
  const props = { cardId: 'cardId' };
  describe('snapshot', () => {
    test('renders default button', () => {
      wrapper = shallow(<SelectSessionButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders disabled button when user does not have access to the course', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess: false });
      wrapper = shallow(<SelectSessionButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders disabled button if masquerading', () => {
      hooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
      wrapper = shallow(<SelectSessionButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('behavior', () => {
    it('default render', () => {
      wrapper = shallow(<SelectSessionButton {...props} />);
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.onClick).getMockName())
        .toEqual(hooks.useUpdateSelectSessionModalCallback().getMockName());
    });
    describe('disabled states', () => {
      test('learner does not have access', () => {
        hooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess: false });
        wrapper = shallow(<SelectSessionButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('learner cannot change sessions', () => {
        hooks.useCardEntitlementData.mockReturnValueOnce({ canChange: false, hasSessions: true });
        wrapper = shallow(<SelectSessionButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('entitlement does not have available sessions', () => {
        hooks.useCardEntitlementData.mockReturnValueOnce({ canChange: true, hasSessions: false });
        wrapper = shallow(<SelectSessionButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('user is masquerading', () => {
        hooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
        wrapper = shallow(<SelectSessionButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
    });
  });
});
