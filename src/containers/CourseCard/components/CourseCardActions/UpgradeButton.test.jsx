import { shallow } from 'enzyme';

import track from 'tracking';
import { reduxHooks } from 'hooks';
import { htmlProps } from 'data/constants/htmlKeys';
import UpgradeButton from './UpgradeButton';

jest.mock('tracking', () => ({
  course: {
    upgradeClicked: jest.fn().mockName('segment.trackUpgradeClicked'),
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
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
  reduxHooks.useCardCourseRunData.mockReturnValue({ upgradeUrl });
  describe('snapshot', () => {
    test('can upgrade', () => {
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.onClick)).toEqual(reduxHooks.useTrackCourseEvent(
        track.course.upgradeClicked,
        props.cardId,
        upgradeUrl,
      ));
    });
    test('cannot upgrade', () => {
      reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ canUpgrade: false });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
    test('masquerading', () => {
      reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
    });
  });
});
