import { shallow } from 'enzyme';

import track from 'data/services/segment/track';
import { htmlProps } from 'data/constants/htmlKeys';
import { hooks } from 'data/redux';
import ViewCourseButton from './ViewCourseButton';

jest.mock('data/services/segment/track', () => ({
  course: {
    enterCourseClicked: jest.fn().mockName('segment.enterCourseClicked'),
  },
}));

jest.mock('data/redux', () => ({
  hooks: {
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
      expect(wrapper.prop(htmlProps.onClick)).toEqual(hooks.useTrackCourseEvent(
        track.course.enterCourseClicked,
        defaultProps.cardId,
        homeUrl,
      ));
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
      expect(wrapper.prop(htmlProps.onClick)).toEqual(hooks.useTrackCourseEvent(
        track.course.enterCourseClicked,
        defaultProps.cardId,
        homeUrl,
      ));
    });
    test('link is enabled', () => {
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
});
