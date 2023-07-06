import { shallow } from 'enzyme';

import {
  useEmailSettings, useUnenrollData, useCourseCardMenu,
} from './hooks';
import CourseCardMenu from '.';

jest.mock('react-share', () => ({
  FacebookShareButton: () => 'FacebookShareButton',
  TwitterShareButton: () => 'TwitterShareButton',
}));
jest.mock('./hooks', () => ({
  useEmailSettings: jest.fn(),
  useUnenrollData: jest.fn(),
  useCourseCardMenu: jest.fn(),
  useHandleToggleDropdown: () => jest.fn().mockName('mockHandleToggleDropdown'),
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
const defaultUseCourseCardMenu = {
  courseName: 'test-course-name',
  isMasquerading: false,
  isEmailEnabled: true,
  showUnenrollItem: true,
  showDropdown: true,
  handleTwitterShare: jest.fn().mockName('handleTwitterShare'),
  handleFacebookShare: jest.fn().mockName('handleFacebookShare'),
};
let wrapper;
let el;

describe('CourseCardMenu', () => {
  useEmailSettings.mockReturnValue(defaultEmailSettingsModal);
  useUnenrollData.mockReturnValue(defaultUnenrollModal);

  const mockUseCourseCardMenu = ({
    isMasquerading,
    isEmailEnabled,
    showUnenrollItem,
    showDropdown,
    facebook,
    twitter,
  }) => {
    useCourseCardMenu.mockReturnValueOnce({
      ...defaultUseCourseCardMenu,
      isMasquerading,
      isEmailEnabled,
      showUnenrollItem,
      showDropdown,
      facebook,
      twitter,
    });
    return shallow(<CourseCardMenu {...props} />);
  };
  test('default snapshot', () => {
    wrapper = mockUseCourseCardMenu({
      isMasquerading: false,
      isEmailEnabled: true,
      showUnenrollItem: true,
      showDropdown: true,
      ...defaultSocialShare,
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('renders null if showDropdown is false', () => {
    wrapper = mockUseCourseCardMenu({
      isMasquerading: true,
      isEmailEnabled: true,
      showUnenrollItem: true,
      showDropdown: false,
      ...defaultSocialShare,
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toEqual(true);
  });

  describe('disable state options', () => {
    beforeAll(() => {
      wrapper = mockUseCourseCardMenu({
        isMasquerading: false,
        isEmailEnabled: false,
        showUnenrollItem: false,
        showDropdown: true, // set to true for testing
        facebook: {
          isEnabled: false,
        },
        twitter: {
          isEnabled: false,
        },
      });
    });
    // to make sure it try to render the dropdown
    it('render dropdown base on showDropdown', () => {
      expect(wrapper.isEmptyRender()).toEqual(false);
      expect(wrapper.find('Dropdown').length).toEqual(1);
    });
    it('not renders email settings modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
      expect(el.length).toEqual(0);
    });
    it('not renders unenroll modal toggle', () => {
      el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
      expect(el.length).toEqual(0);
    });
    it('not renders share buttons', () => {
      expect(wrapper.find('FacebookShareButton').length).toEqual(0);
      expect(wrapper.find('TwitterShareButton').length).toEqual(0);
    });
  });
  describe('masquerading', () => {
    beforeEach(() => {
      wrapper = mockUseCourseCardMenu({
        isMasquerading: true,
        isEmailEnabled: true,
        showUnenrollItem: true,
        showDropdown: true,
        ...defaultSocialShare,
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
