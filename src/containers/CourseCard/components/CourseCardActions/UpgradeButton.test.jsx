import { shallow } from 'enzyme';

import track from 'data/services/segment/track';
import { hooks } from 'data/redux';
import { htmlProps } from 'data/constants/htmlKeys';
import UpgradeButton from './UpgradeButton';

jest.mock('data/services/segment/track', () => ({
  course: {
    upgradeClicked: jest.fn().mockName('segment.trackUpgradeClicked'),
  },
}));

jest.mock('data/redux', () => ({
  hooks: {
    useMasqueradeData: jest.fn(() => ({ isMasquerading: false })),
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(() => ({ canUpgrade: true })),
    useTrackCourseEvent: jest.fn(
      (eventName, cardId, upgradeUrl) => ({ trackCourseEvent: { eventName, cardId, upgradeUrl } }),
    ),
  },
}));

jest.mock('./ActionButton', () => 'ActionButton');

describe('UpgradeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  const upgradeUrl = 'upgradeUrl';
  hooks.useCardCourseRunData.mockReturnValue({ upgradeUrl });
  describe('snapshot', () => {
    test('can upgrade', () => {
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.onClick)).toEqual(hooks.useTrackCourseEvent(
        track.course.upgradeClicked,
        props.cardId,
        upgradeUrl,
      ));
    });
    test('cannot upgrade', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({ canUpgrade: false });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
    test('masquerading', () => {
      hooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
});
