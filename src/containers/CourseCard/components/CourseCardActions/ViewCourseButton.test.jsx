import { shallow } from 'enzyme';

import track from 'tracking';
import { htmlProps } from 'data/constants/htmlKeys';
import { reduxHooks } from 'hooks';
import ViewCourseButton from './ViewCourseButton';

jest.mock('tracking', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
    useTrackCourseEvent: jest.fn(
      (eventName, cardId, upgradeUrl) => ({ trackCourseEvent: { eventName, cardId, upgradeUrl } }),
    ),
  },
}));
jest.mock('./ActionButton', () => 'ActionButton');

let wrapper;
const defaultProps = { cardId: 'cardId' };
const homeUrl = 'homeUrl';

const createWrapper = ({
  hasAccess = false,
  isAudit = false,
  isAuditAccessExpired = false,
  isEntitlement = false,
  isExpired = false,
  propsOveride = {},
}) => {
  reduxHooks.useCardCourseRunData.mockReturnValue({ homeUrl });
  reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ hasAccess, isAudit, isAuditAccessExpired });
  reduxHooks.useCardEntitlementData.mockReturnValueOnce({ isEntitlement, isExpired });
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
      expect(wrapper.prop(htmlProps.onClick)).toEqual(reduxHooks.useTrackCourseEvent(
        track.course.enterCourseClicked,
        defaultProps.cardId,
        homeUrl,
      ));
    });
    test('link is enabled', () => {
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
    });
    test('link is disabled when audit access is expired', () => {
      wrapper = createWrapper({ hasAccess: true, isAudit: true, isAuditAccessExpired: true });
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
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
      expect(wrapper.prop(htmlProps.onClick)).toEqual(reduxHooks.useTrackCourseEvent(
        track.course.enterCourseClicked,
        defaultProps.cardId,
        homeUrl,
      ));
    });
    test('link is disabled', () => {
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
});
