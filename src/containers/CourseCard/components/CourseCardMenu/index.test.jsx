import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import { useEmailSettings, useUnenrollData } from './hooks';
import CourseCardMenu from '.';

jest.mock('react-share', () => ({
  FacebookShareButton: () => 'FacebookShareButton',
  TwitterShareButton: () => 'TwitterShareButton',
}));
jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardSocialSettingsData: jest.fn(),
    useMasqueradeData: jest.fn(),
    useCardCertificateData: jest.fn(),
    useTrackCourseEvent: (_, __, site) => jest.fn().mockName(`${site}ShareClick`),
  },
}));
jest.mock('./hooks', () => ({
  useEmailSettings: jest.fn(),
  useUnenrollData: jest.fn(),
  useHandleToggleDropdown: jest.fn(),
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
  facebook: {
    isEnabled: true,
    shareUrl: 'facebook-share-url',
    socialBrand: 'facebook-social-brand',
  },
  twitter: {
    isEnabled: true,
    shareUrl: 'twitter-share-url',
    socialBrand: 'twitter-social-brand',
  },
};
const courseName = 'test-course-name';
let wrapper;
let el;

describe('CourseCardMenu', () => {
  const mockCourseCardMenu = ({
    isEnrolled,
    isEmailEnabled,
    isMasquerading,
    facebook,
    twitter,
    isEarned,
  }) => {
    useEmailSettings.mockReturnValueOnce(defaultEmailSettingsModal);
    useUnenrollData.mockReturnValueOnce(defaultUnenrollModal);
    reduxHooks.useCardCourseData.mockReturnValueOnce({ courseName });
    reduxHooks.useCardSocialSettingsData.mockReturnValueOnce({
      facebook: {
        ...defaultSocialShare.facebook,
        ...facebook,
      },
      twitter: {
        ...defaultSocialShare.twitter,
        ...twitter,
      },
    });
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({
      isEnrolled,
      isEmailEnabled,
    });
    reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading });
    reduxHooks.useCardCertificateData.mockReturnValueOnce({ isEarned });
    return shallow(<CourseCardMenu {...props} />);
  };
  describe('enrolled, share enabled, email setting enable', () => {
    beforeEach(() => {
      wrapper = mockCourseCardMenu({
        isEnrolled: true,
        isEmailEnabled: true,
        isMasquerading: false,
        isEarned: false,
      });
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders share buttons', () => {
      el = wrapper.find('FacebookShareButton');
      expect(el.length).toEqual(1);
      expect(el.prop('url')).toEqual('facebook-share-url');
      el = wrapper.find('TwitterShareButton');
      expect(el.length).toEqual(1);
      expect(el.prop('url')).toEqual('twitter-share-url');
    });
    it('renders enabled unenroll modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
      expect(el.props().disabled).toEqual(false);
    });
    it('renders enabled email settings modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
      expect(el.props().disabled).toEqual(false);
    });
    it('renders enabled email settings modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
      expect(el.props().disabled).toEqual(false);
    });
  });
  describe('disable and stop rendering buttons', () => {
    it('does not render unenroll dropdown item when certificate is already earned', () => {
      wrapper = mockCourseCardMenu({
        isEnrolled: true,
        isEmailEnabled: true,
        isMasquerading: false,
        isEarned: true,
      });
      el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
      expect(el.length).toEqual(0);
    });
    it('does not render unenroll dropdown item when course is not enrolled', () => {
      wrapper = mockCourseCardMenu({
        isEnrolled: false,
        isEmailEnabled: true,
        isMasquerading: false,
        isEarned: false,
      });
      el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
      expect(el.length).toEqual(0);
    });
    it('does not render email settings modal toggle when email is not enabled', () => {
      wrapper = mockCourseCardMenu({
        isEnrolled: true,
        isEmailEnabled: false,
        isMasquerading: false,
        isEarned: false,
      });
      el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
      expect(el.length).toEqual(0);
    });
    it('does not render facebook share button when facebook is not enabled', () => {
      wrapper = mockCourseCardMenu({
        isEnrolled: true,
        isEmailEnabled: true,
        facebook: {
          ...defaultSocialShare.facebook,
          isEnabled: false,
        },
        isMasquerading: false,
        isEarned: false,
      });
      el = wrapper.find('FacebookShareButton');
      expect(el.length).toEqual(0);
    });
    it('does not render twitter share button when twitter is not enabled', () => {
      wrapper = mockCourseCardMenu({
        isEnrolled: true,
        isEmailEnabled: true,
        twitter: {
          ...defaultSocialShare.twitter,
          isEnabled: false,
        },
        isMasquerading: false,
        isEarned: false,
      });
      el = wrapper.find('TwitterShareButton');
      expect(el.length).toEqual(0);
    });
    it('snapshot when no dropdown items exist', () => {
      wrapper = mockCourseCardMenu({
        isEnrolled: false,
        isEmailEnabled: false,
        isMasquerading: false,
        isEarned: false,
        twitter: {
          ...defaultSocialShare.twitter,
          isEnabled: false,
        },
        facebook: {
          ...defaultSocialShare.facebook,
          isEnabled: false,
        },
      });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.isEmptyRender()).toEqual(true);
    });
  });
  describe('masquerading', () => {
    beforeEach(() => {
      wrapper = mockCourseCardMenu({
        isEnrolled: true,
        isEmailEnabled: true,
        isMasquerading: true,
        isEarned: false,
      });
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders share buttons', () => {
      expect(wrapper.find('FacebookShareButton').length).toEqual(1);
      el = wrapper.find('TwitterShareButton');
      expect(el.length).toEqual(1);
      expect(el.prop('url')).toEqual('twitter-share-url');
    });
    it('renders disabled unenroll modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
      expect(el.props().disabled).toEqual(true);
    });
    it('renders disabled email settings modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
      expect(el.props().disabled).toEqual(true);
    });
  });
});
