import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import CertificateBanner from './CertificateBanner';
import messages from './messages';

jest.mock('hooks', () => ({
  utilHooks: {
    useFormatDate: jest.fn(() => date => date),
  },
  reduxHooks: {
    useCardCertificateData: jest.fn(),
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardGradeData: jest.fn(),
    usePlatformSettingsData: jest.fn(),
  },
}));

jest.mock('components/Banner', () => 'Banner');

describe('CertificateBanner', () => {
  const props = { cardId: 'cardId' };
  reduxHooks.usePlatformSettingsData.mockReturnValue({
    supportEmail: 'suport@email',
    billingEmail: 'billing@email',
  });
  reduxHooks.useCardCourseRunData.mockReturnValue({
    minPassingGrade: 0.8,
    progressUrl: 'progressUrl',
  });

  const defaultCertificate = {
    availableDate: '10/20/3030',
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
    reduxHooks.useCardGradeData.mockReturnValueOnce({ ...defaultGrade, ...grade });
    reduxHooks.useCardCertificateData.mockReturnValueOnce({ ...defaultCertificate, ...certificate });
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ ...defaultEnrollment, ...enrollment });
    reduxHooks.useCardCourseRunData.mockReturnValueOnce({ ...defaultCourseRun, ...courseRun });
    return shallow(<CertificateBanner {...props} />);
  };
  /** TODO: Update tests to validate snapshots **/
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
    test('is passing and is downloadable', () => {
      const wrapper = createWrapper({
        grade: { isPassing: true },
        certificate: { isDownloadable: true },
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('not passing and is downloadable', () => {
      const wrapper = createWrapper({
        grade: { isPassing: false },
        certificate: { isDownloadable: true },
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
