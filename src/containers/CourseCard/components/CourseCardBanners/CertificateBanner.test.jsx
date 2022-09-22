import { mount, shallow } from 'enzyme';

import CertificateBanner from './CertificateBanner';
import { hooks } from 'data/redux';
import messages from './messages';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCertificateData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardGradeData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    usePlatformSettingsData: jest.fn(),
  },
}));

jest.mock('Components/Banner', () => 'Banner');

describe('CertificateBanner', () => {
  const props = {
    cardId: 'cardId',
  };
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
    hasFinished: false,
  };
  const defaultGrade = {
    isPassing: false,
  };
  const createWrapper = ({
    certificate = {},
    enrollment = {},
    grade = {},
  }) => {
    hooks.useCardGradeData.mockReturnValueOnce({ ...defaultGrade, ...grade });
    hooks.useCardCertificateData.mockReturnValueOnce({ ...defaultCertificate, ...certificate});
    hooks.useCardEnrollmentData.mockReturnValueOnce({ ...defaultEnrollment, ...enrollment});
    return shallow(<CertificateBanner {...props} />);
  };
  describe('snapshot', () => {
    it('is restricted', () => {
      const wrapper = createWrapper({
        certificate: {
          isRestricted: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper).toMatchSnapshot();
    });
    it('not passing and audit', () => {
      const wrapper = createWrapper({
        enrollment: {
          isAudit: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('not passing and has finished', () => {
      const wrapper = createWrapper({
        enrollment: {
          hasFinished: true,
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('not passing and not audit and not finished', () => {
      const wrapper = createWrapper({});
      expect(wrapper).toMatchSnapshot();
    });
    it('is passing and is downloadable', () => {
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
    it('is passing and is earned but unavailable', () => {
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
    it('is passing and not downloadable render empty', () => {
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
