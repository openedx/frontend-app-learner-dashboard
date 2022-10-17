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
    shareUrl: 'facebook-share-url',
    socialBrand: 'facebook-social-brand',
  },
};
const courseName = 'test-course-name';
let wrapper;

describe('CourseCardMenu', () => {
  beforeEach(() => {
    useEmailSettings.mockReturnValue(defaultEmailSettingsModal);
    useUnenrollData.mockReturnValue(defaultUnenrollModal);
    appHooks.useCardSocialSettingsData.mockReturnValue(defaultSocialShare);
    appHooks.useCardCourseData.mockReturnValue({ courseName });
    appHooks.useMasqueradeData.mockReturnValue({ isMasquerading: false });
  });
  test('snapshot', () => {
    wrapper = shallow(<CourseCardMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.find('FacebookShareButton').length).toEqual(1);
    expect(wrapper.find('TwitterShareButton').length).toEqual(1);
    expect(wrapper.find({
      'data-testid': 'unenrollModalToggle',
    }).props().disabled).toEqual(false);
    expect(wrapper.find({
      'data-testid': 'emailSettingsModalToggle',
    }).props().disabled).toEqual(false);
  });
  test('snapshot: masquerading', () => {
    appHooks.useMasqueradeData.mockReturnValue({ isMasquerading: true });
    wrapper = shallow(<CourseCardMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find({
      'data-testid': 'unenrollModalToggle',
    }).props().disabled).toEqual(true);
    expect(wrapper.find({
      'data-testid': 'emailSettingsModalToggle',
    }).props().disabled).toEqual(true);
  });
  /*
  test('facebook share disabled', () => {
    appHooks.useCardSocialSettingsData.mockReturnValueOnce({
      ...defaultSocialShare,
      facebook: { ...defaultSocialShare.facebook, isEnabled: false },
    });
    wrapper = shallow(<CourseCardMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('FacebookShareButton').length).toEqual(0);
  });
  */
  test('twitter share disabled', () => {
    appHooks.useCardSocialSettingsData.mockReturnValueOnce({
      ...defaultSocialShare,
      twitter: { ...defaultSocialShare.twitter, isEnabled: false },
    });
    wrapper = shallow(<CourseCardMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('TwitterShareButton').length).toEqual(0);
  });
});
