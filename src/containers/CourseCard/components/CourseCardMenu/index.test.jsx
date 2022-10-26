import { shallow } from 'enzyme';

import { hooks as appHooks } from 'data/redux';
import { useEmailSettings, useUnenrollData } from './hooks';
import CourseCardMenu from '.';

jest.mock('react-share', () => ({
  FacebookShareButton: () => 'FacebookShareButton',
  TwitterShareButton: () => 'TwitterShareButton',
}));
jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardSocialSettingsData: jest.fn(),
    useMasqueradeData: jest.fn(),
  },
}));
jest.mock('./hooks', () => ({
  useEmailSettings: jest.fn(),
  useUnenrollData: jest.fn(),
}));

const props = {
  cardId: 'test-card-id',
};
const defaultEmailSettingsModal = {
  isVisible: false,
  show: jest.fn().mockName('emailSettingShow'),
  hide: jest.fn().mockName('emailSettingHide'),
};
const defaultUnenrollModal = {
  isVisible: false,
  show: jest.fn().mockName('unenrollShow'),
  hide: jest.fn().mockName('unenrollHide'),
};
const defaultSocialShare = {
  // facebook: {
  //   isEnabled: true,
  //   shareUrl: 'facebook-share-url',
  //   socialBrand: 'facebook-social-brand',
  // },
  twitter: {
    isEnabled: true,
    shareUrl: 'twitter-share-url',
    socialBrand: 'twitter-social-brand',
  },
};
const defaultCardCourseData = {
  courseName: 'test-course-name',
};
const defaultCardEnrollmentData = {
  isEnrolled: true,
  isEmailEnabled: true,
};
const defaultMasqueradeData = {
  isMasquerading: false,
};

describe('CourseCardMenu', () => {
  useEmailSettings.mockReturnValue({
    ...defaultEmailSettingsModal,
  });
  useUnenrollData.mockReturnValue({
    ...defaultUnenrollModal,
  });
  const createWrapper = ({
    socialShare,
    courseCardData,
    enrollmentData,
    masqueradeData,
  } = {}) => {
    appHooks.useCardSocialSettingsData.mockReturnValueOnce({
      ...defaultSocialShare,
      ...socialShare,
    });
    appHooks.useCardCourseData.mockReturnValueOnce({ ...defaultCardCourseData, ...courseCardData });
    appHooks.useCardEnrollmentData.mockReturnValueOnce({ ...defaultCardEnrollmentData, ...enrollmentData });
    appHooks.useMasqueradeData.mockReturnValueOnce({ ...defaultMasqueradeData, ...masqueradeData });
    return shallow(<CourseCardMenu {...props} />);
  };

  test('default snapshot with everything enable', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  test('is not enrolled', () => {
    const wrapper = createWrapper({ enrollmentData: { isEnrolled: false } });
    expect(wrapper).toMatchSnapshot();
  });

  describe('share buttons', () => {
    describe('enabled', () => {
      const wrapper = createWrapper();
      test('twitter share url', () => {
        // expect(wrapper.find('FacebookShareButton')).toHaveLength(1);
        const twitterEl = wrapper.find('TwitterShareButton');
        expect(twitterEl.exists()).toBe(true);
        expect(twitterEl.prop('url')).toEqual('twitter-share-url');
      });
    });
    describe('disabled', () => {
      const wrapper = createWrapper({
        socialShare: {
          // facebook: {
          //   isEnabled: false,
          // },
          twitter: {
            isEnabled: false,
          },
        },
      });
      test('snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
      test('remove on disabled', () => {
        // expect(wrapper.find('FacebookShareButton').exists()).toBe(false);
        expect(wrapper.find('TwitterShareButton').exists()).toBe(false);
      });
    });
  });

  describe('email settings', () => {
    describe('enabled', () => {
      const wrapper = createWrapper();
      const el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
      test('show email settings modal', () => {
        el.simulate('click');
        expect(useEmailSettings().show).toHaveBeenCalled();
      });
    });
    describe('disabled', () => {
      const wrapper = createWrapper({
        enrollmentData: {
          isEmailEnabled: false,
        },
      });
      test('snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
      test('remove on disabled', () => {
        expect(wrapper.find({ 'data-testid': 'emailSettingsModalToggle' }).exists()).toBe(false);
      });
    });
  });

  describe('unenroll', () => {
    describe('enabled', () => {
      const wrapper = createWrapper();
      const el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
      test('show unenroll modal', () => {
        el.simulate('click');
        expect(useUnenrollData().show).toHaveBeenCalled();
      });
    });
    describe('disabled', () => {
      const wrapper = createWrapper({
        enrollmentData: {
          isEnrolled: false,
        },
      });
      test('snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
      test('remove on disabled', () => {
        expect(wrapper.find({ 'data-testid': 'unenrollModalToggle' }).exists()).toBe(false);
      });
    });
  });

  describe('is masquerading', () => {
    const wrapper = createWrapper({
      masqueradeData: {
        isMasquerading: true,
      },
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('disables unenroll and email items but not share social button', () => {
      expect(wrapper.find({ 'data-testid': 'unenrollModalToggle' }).prop('disabled')).toBe(true);
      expect(wrapper.find({ 'data-testid': 'emailSettingsModalToggle' }).prop('disabled')).toBe(true);
      // expect(wrapper.find('FacebookShareButton').exists()).toBe(true);
      expect(wrapper.find('TwitterShareButton').exists()).toBe(true);
    });
  });
});
