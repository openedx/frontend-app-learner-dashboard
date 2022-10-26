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
    appHooks.useCardSocialSettingsData.mockReturnValue(defaultSocialShare);
    appHooks.useCardCourseData.mockReturnValue({ courseName });
    appHooks.useCardEnrollmentData.mockReturnValue({ isEnrolled: true, isEmailEnabled: true });
    appHooks.useMasqueradeData.mockReturnValue({ isMasquerading: false });
  });
  describe('enrolled, share enabled, email setting enable', () => {
    beforeEach(() => {
      wrapper = shallow(<CourseCardMenu {...props} />);
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders share buttons', () => {
      // expect(wrapper.find('FacebookShareButton').length).toEqual(1);
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
      appHooks.useCardSocialSettingsData.mockReturnValueOnce({
        ...defaultSocialShare,
        twitter: { ...defaultSocialShare.twitter, isEnabled: false },
        // facebook: { ...defaultSocialShare.facebook, isEnabled: false },
      });
      appHooks.useCardEnrollmentData.mockReturnValueOnce({ isEnrolled: false, isEmailEnabled: false });
      wrapper = shallow(<CourseCardMenu {...props} />);
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('does not renders share buttons', () => {
      // expect(wrapper.find('FacebookShareButton').length).toEqual(0);
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
      appHooks.useMasqueradeData.mockReturnValue({ isMasquerading: true });
      wrapper = shallow(<CourseCardMenu {...props} />);
    });
    test('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders share buttons', () => {
      // expect(wrapper.find('FacebookShareButton').length).toEqual(1);
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
