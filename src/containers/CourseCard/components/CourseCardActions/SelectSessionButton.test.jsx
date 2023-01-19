import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import { htmlProps } from 'data/constants/htmlKeys';
import SelectSessionButton from './SelectSessionButton';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardEnrollmentData: jest.fn(() => ({ hasAccess: true })),
    useCardEntitlementData: jest.fn(() => ({ canChange: true, hasSessions: true })),
    useMasqueradeData: jest.fn(() => ({ isMasquerading: false })),
    useUpdateSelectSessionModalCallback: () => jest.fn().mockName('mockOpenSessionModal'),
  },
}));
jest.mock('./ActionButton', () => 'ActionButton');

let wrapper;

describe('SelectSessionButton', () => {
  const props = { cardId: 'cardId' };
  describe('snapshot', () => {
    test('renders default button', () => {
      wrapper = shallow(<SelectSessionButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders disabled button when user does not have access to the course', () => {
      reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess: false });
      wrapper = shallow(<SelectSessionButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders disabled button if masquerading', () => {
      reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
      wrapper = shallow(<SelectSessionButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('behavior', () => {
    it('default render', () => {
      wrapper = shallow(<SelectSessionButton {...props} />);
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.onClick).getMockName())
        .toEqual(reduxHooks.useUpdateSelectSessionModalCallback().getMockName());
    });
    describe('disabled states', () => {
      test('learner does not have access', () => {
        reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess: false });
        wrapper = shallow(<SelectSessionButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('learner cannot change sessions', () => {
        reduxHooks.useCardEntitlementData.mockReturnValueOnce({ canChange: false, hasSessions: true });
        wrapper = shallow(<SelectSessionButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('entitlement does not have available sessions', () => {
        reduxHooks.useCardEntitlementData.mockReturnValueOnce({ canChange: true, hasSessions: false });
        wrapper = shallow(<SelectSessionButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('user is masquerading', () => {
        reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
        wrapper = shallow(<SelectSessionButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
    });
  });
});
