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
    shareUrl: 'facebook-share-url',
    socialBrand: 'facebook-social-brand',
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
  const createWrapper = ({
    emailSettingsModal,
    unenrollModal,
    socialShare,
    courseCardData,
    enrollmentData,
    masqueradeData,
  } = {}) => {
    useEmailSettings.mockReturnValueOnce({
      ...defaultEmailSettingsModal,
      ...emailSettingsModal,
    })
    useUnenrollData.mockReturnValueOnce({
      ...defaultUnenrollModal,
      ...unenrollModal,
    });
    appHooks.useCardSocialSettingsData.mockReturnValueOnce({
      ...defaultSocialShare,
      ...socialShare,
    });
    appHooks.useCardCourseData.mockReturnValueOnce({...defaultCardCourseData, ...courseCardData});
    appHooks.useCardEnrollmentData.mockReturnValueOnce({ ...defaultCardEnrollmentData, ...enrollmentData });
    appHooks.useMasqueradeData.mockReturnValueOnce({ ...defaultMasqueradeData, ...masqueradeData });
    return  shallow(<CourseCardMenu {...props} />);
  };

  describe('snapshots', () => {
    test('default', () => {
      expect(createWrapper()).toMatchSnapshot();
    });
    test('share buttons disabled', () => {
      const wrapper = createWrapper({
        socialShare: {
          facebook: {
            isEnabled: false,
          },
          twitter: {
            isEnabled: false,
          },
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('not enrolled', () => {
      const wrapper = createWrapper({
        enrollmentData: {
          isEnrolled: false,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('email disabled', () => {
      const wrapper = createWrapper({
        enrollmentData: {
          isEmailEnabled: false,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    test('masquerading', () => {
      const wrapper = createWrapper({
        masqueradeData: {
          isMasquerading: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    describe('share buttons', () => {
      test('enabled', () => {
        const wrapper = createWrapper();
        // expect(wrapper.find('FacebookShareButton').prop('url')).toEqual('facebook-share-url');
        expect(wrapper.find('TwitterShareButton').prop('url')).toEqual('facebook-share-url');
      });
      test('remove on disabled', () => {
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
        // expect(wrapper.find('FacebookShareButton').exists()).toEqual(false);
        expect(wrapper.find('TwitterShareButton').exists()).toEqual(false);
      });
    });
    describe('email settings', () => {
      test('enabled', () => {
        const wrapper = createWrapper();
        const el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
        el.simulate('click');
        expect(defaultEmailSettingsModal.show).toHaveBeenCalled();
      });
      test('remove on disabled', () => {
        const wrapper = createWrapper({
          enrollmentData: {
            isEmailEnabled: false,
          },
        });
        expect(wrapper.find({ 'data-testid': 'emailSettingsModalToggle' }).exists()).toEqual(false);
      });
    });
    describe('unenroll', () => {
      test('enabled', () => {
        const wrapper = createWrapper();
        const el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
        el.simulate('click');
        expect(defaultUnenrollModal.show).toHaveBeenCalled();
      });
      test('remove on disabled', () => {
        const wrapper = createWrapper({
          enrollmentData: {
            isEnrolled: false,
          },
        });
        expect(wrapper.find({ 'data-testid': 'unenrollModalToggle' }).exists()).toEqual(false);
      });
    });
    describe('masquerade', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = createWrapper({
          masqueradeData: {
            isMasquerading: true,
          },
        });
      });
      it('renders share buttons', () => {
        // expect(wrapper.find('FacebookShareButton').length).toEqual(1);
        expect(wrapper.find('TwitterShareButton').length).toEqual(1);
      });
      it('renders disabled unenroll modal toggle', () => {
        const el = wrapper.find({ 'data-testid': 'unenrollModalToggle' });
        expect(el.prop('disabled')).toEqual(true);
      });
      it('renders disabled email settings modal toggle', () => {
        const el = wrapper.find({ 'data-testid': 'emailSettingsModalToggle' });
        expect(el.props().disabled).toEqual(true);
      });
    });
  });
});
