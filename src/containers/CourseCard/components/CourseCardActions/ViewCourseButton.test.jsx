import { shallow } from 'enzyme';

import { htmlProps } from 'data/constants/htmlKeys';
import { hooks } from 'data/redux';
import ViewCourseButton from './ViewCourseButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
  },
}));

let wrapper;
const defaultProps = { cardId: 'cardId', isSmall: false };
const homeUrl = 'homeUrl';

const createWrapper = ({
  hasAccess = false,
  isEntitlement = false,
  isExpired = false,
  propsOveride = {},
}) => {
  hooks.useCardCourseRunData.mockReturnValue({ homeUrl });
  hooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess });
  hooks.useCardEntitlementData.mockReturnValueOnce({ isEntitlement, isExpired });
  return shallow(<ViewCourseButton {...defaultProps} {...propsOveride} />);
};

describe('ViewCourseButton', () => {
  describe('learner has access to course', () => {
    beforeEach(() => {
      wrapper = createWrapper({ hasAccess: true });
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    test('links to home URL', () => {
      expect(wrapper.prop(htmlProps.href)).toEqual(homeUrl);
    });
    test('link is enabled', () => {
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
    });
  });
  describe('learner does not have access to course', () => {
    beforeEach(() => {
      wrapper = createWrapper({ hasAccess: false });
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    test('links to home URL', () => {
      expect(wrapper.prop(htmlProps.href)).toEqual(homeUrl);
    });
    test('link is enabled', () => {
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
  test('small button when isSmall is true', () => {
    wrapper = createWrapper({ propsOveride: { isSmall: true } });
    expect(wrapper.prop(htmlProps.size)).toEqual('sm');
  });
});
