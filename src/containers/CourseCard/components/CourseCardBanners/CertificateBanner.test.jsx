import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import CertificateBanner from './CertificateBanner';
import messages from './messages';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCertificateData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardGradeData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    usePlatformSettingsData: jest.fn(),
  },
}));

jest.mock('Components/Banner', () => 'Banner');

describe('CertificateBanner', () => {
  const props = { cardId: 'cardId' };
  hooks.usePlatformSettingsData.mockReturnValue({
    supportEmail: 'suport@email',
    billingEmail: 'billing@email',
  });
  hooks.useCardCourseRunData.mockReturnValue({
    minPassingGrade: 0.8,
    progressUrl: 'progressUrl',
  });

  const defaultCertificate = {
    isRestricted: false,
    isDownloadable: false,
    isEarnedButUnavailable: false,
  };
  const defaultEnrollment = {
    isAudit: false,
    isVerified: false,
  };
  const defaultCourseRun = { isArchived: false };
  const defaultGrade = { isPassing: false };
  const createWrapper = ({
    certificate = {},
    enrollment = {},
    grade = {},
    courseRun = {},
  }) => {
    hooks.useCardGradeData.mockReturnValueOnce({ ...defaultGrade, ...grade });
    hooks.useCardCertificateData.mockReturnValueOnce({ ...defaultCertificate, ...certificate });
    hooks.useCardEnrollmentData.mockReturnValueOnce({ ...defaultEnrollment, ...enrollment });
    hooks.useCardCourseRunData.mockReturnValueOnce({ ...defaultCourseRun, ...courseRun });
    return shallow(<CertificateBanner {...props} />);
  };
  describe('snapshot', () => {
    test('is restricted', () => {
      const wrapper = createWrapper({
        certificate: {
          isRestricted: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('is restricted and verified', () => {
      const wrapper = createWrapper({
        certificate: {
          isRestricted: true,
        },
        enrollment: {
          isVerified: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('not passing and audit', () => {
      const wrapper = createWrapper({
        enrollment: {
          isAudit: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('not passing and has finished', () => {
      const wrapper = createWrapper({
        courseRun: { isArchived: true },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('not passing and not audit and not finished', () => {
      const wrapper = createWrapper({});
      expect(wrapper).toMatchSnapshot();
    });
    test('is passing and is downloadable', () => {
      const wrapper = createWrapper({
        grade: {
          isPassing: true,
        },
        certificate: {
          isDownloadable: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('is passing and is earned but unavailable', () => {
      const wrapper = createWrapper({
        grade: {
          isPassing: true,
        },
        certificate: {
          isEarnedButUnavailable: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('is passing and not downloadable render empty', () => {
      const wrapper = createWrapper({
        grade: {
          isPassing: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('behavior', () => {
    it('is restricted', () => {
      const wrapper = createWrapper({
        certificate: {
          isRestricted: true,
        },
      });
      const bannerMessage = wrapper.find('format-message-function').map(el => el.prop('message').defaultMessage).join('\n');
      expect(bannerMessage).toEqual(messages.certRestricted.defaultMessage);
      expect(bannerMessage).toContain(messages.certRestricted.defaultMessage);
    });
    it('is restricted and verified', () => {
      const wrapper = createWrapper({
        certificate: {
          isRestricted: true,
        },
        enrollment: {
          isVerified: true,
        },
      });
      const bannerMessage = wrapper.find('format-message-function').map(el => el.prop('message').defaultMessage).join('\n');
      expect(bannerMessage).toContain(messages.certRestricted.defaultMessage);
      expect(bannerMessage).toContain(messages.certRefundContactBilling.defaultMessage);
    });
  });
});
