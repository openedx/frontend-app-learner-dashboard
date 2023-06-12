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
  beforeEach(() => {
    useEmailSettings.mockReturnValue(defaultEmailSettingsModal);
    useUnenrollData.mockReturnValue(defaultUnenrollModal);
    reduxHooks.useCardSocialSettingsData.mockReturnValue(defaultSocialShare);
    reduxHooks.useCardCourseData.mockReturnValue({ courseName });
    reduxHooks.useCardEnrollmentData.mockReturnValue({ isEnrolled: true, isEmailEnabled: true });
    reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: false });
  });
  describe('enrolled, share enabled, email setting enable', () => {
    beforeEach(() => {
      wrapper = shallow(<CourseCardMenu {...props} />);
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
  describe('not enrolled, share disabled, email setting disabled', () => {
    beforeEach(() => {
      reduxHooks.useCardSocialSettingsData.mockReturnValueOnce({
        ...defaultSocialShare,
        twitter: { ...defaultSocialShare.twitter, isEnabled: false },
        facebook: { ...defaultSocialShare.facebook, isEnabled: false },
      });
      reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isEnrolled: false, isEmailEnabled: false });
      wrapper = shallow(<CourseCardMenu {...props} />);
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('does not renders share buttons', () => {
      expect(wrapper.find('FacebookShareButton').length).toEqual(0);
      expect(wrapper.find('TwitterShareButton').length).toEqual(0);
    });
    it('does not render unenroll modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
      expect(el.length).toEqual(0);
    });
    it('does not render email settings modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
      expect(el.length).toEqual(0);
    });
  });
  describe('masquerading', () => {
    beforeEach(() => {
      reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: true });
      wrapper = shallow(<CourseCardMenu {...props} />);
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
