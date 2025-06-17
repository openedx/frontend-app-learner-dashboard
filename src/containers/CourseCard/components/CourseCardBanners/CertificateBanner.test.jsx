import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import CertificateBanner from './CertificateBanner';

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
const defaultPlatformSettings = {};
const props = { cardId: 'cardId' };
const supportEmail = 'suport@email.com';
const billingEmail = 'billing@email.com';

describe('CertificateBanner', () => {
  reduxHooks.useCardCourseRunData.mockReturnValue({
    minPassingGrade: 0.8,
    progressUrl: 'progressUrl',
  });
  const createWrapper = ({
    certificate = {},
    enrollment = {},
    grade = {},
    courseRun = {},
    platformSettings = {},
  }) => {
    reduxHooks.useCardGradeData.mockReturnValueOnce({ ...defaultGrade, ...grade });
    reduxHooks.useCardCertificateData.mockReturnValueOnce({ ...defaultCertificate, ...certificate });
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ ...defaultEnrollment, ...enrollment });
    reduxHooks.useCardCourseRunData.mockReturnValueOnce({ ...defaultCourseRun, ...courseRun });
    reduxHooks.usePlatformSettingsData.mockReturnValueOnce({ ...defaultPlatformSettings, ...platformSettings });
    return render(<IntlProvider locale="en"><CertificateBanner {...props} /></IntlProvider>);
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('is restricted', () => {
    createWrapper({
      certificate: {
        isRestricted: true,
      },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    const msg = screen.getByText((text) => text.includes('please let us know.'));
    expect(msg).toBeInTheDocument();
    expect(msg).not.toContain(supportEmail);
  });
  it('is restricted with support email', () => {
    createWrapper({
      certificate: {
        isRestricted: true,
      },
      platformSettings: {
        supportEmail,
      },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    const msg = screen.getByText((text) => text.includes(supportEmail));
    expect(msg).toBeInTheDocument();
  });
  it('is restricted with billing email but not verified', () => {
    createWrapper({
      certificate: {
        isRestricted: true,
      },
      platformSettings: {
        billingEmail,
      },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('alert-danger');
    const msg = screen.queryByText((text) => text.includes(billingEmail));
    expect(msg).not.toBeInTheDocument();
  });
  it('is restricted and verified', () => {
    createWrapper({
      certificate: {
        isRestricted: true,
      },
      enrollment: {
        isVerified: true,
      },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    const restrictedMsg = screen.getByText((text) => text.includes('please let us know.'));
    expect(restrictedMsg).toBeInTheDocument();
    const refundMsg = screen.getByText((text) => text.includes('If you would like a refund'));
    expect(refundMsg).toBeInTheDocument();
  });
  it('is restricted and verified with support email', () => {
    createWrapper({
      certificate: {
        isRestricted: true,
      },
      enrollment: {
        isVerified: true,
      },
      platformSettings: {
        supportEmail,
      },
    });
    const restrictedMsg = screen.getByText((text) => text.includes(supportEmail));
    expect(restrictedMsg).toBeInTheDocument();
    const refundMsg = screen.getByText((text) => text.includes('If you would like a refund'));
    expect(refundMsg).toBeInTheDocument();
    expect(refundMsg.innerHTML).not.toContain(billingEmail);
  });
  it('is restricted and verified with billing email', () => {
    createWrapper({
      certificate: {
        isRestricted: true,
      },
      enrollment: {
        isVerified: true,
      },
      platformSettings: {
        billingEmail,
      },
    });
    const restrictedMsg = screen.queryByText((text) => text.includes('please let us know.'));
    expect(restrictedMsg).toBeInTheDocument();
    expect(restrictedMsg.innerHTML).not.toContain(supportEmail);
    const refundMsg = screen.getByText((text) => text.includes(billingEmail));
    expect(refundMsg).toBeInTheDocument();
  });
  it('is restricted and verified with support and billing email', () => {
    createWrapper({
      certificate: {
        isRestricted: true,
      },
      enrollment: {
        isVerified: true,
      },
      platformSettings: {
        supportEmail,
        billingEmail,
      },
    });
    const restrictedMsg = screen.getByText((text) => text.includes(supportEmail));
    expect(restrictedMsg).toBeInTheDocument();
    const refundMsg = screen.getByText((text) => text.includes(billingEmail));
    expect(refundMsg).toBeInTheDocument();
  });
  it('is passing and is downloadable', () => {
    createWrapper({
      grade: { isPassing: true },
      certificate: { isDownloadable: true },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('alert-success');
    const readyMsg = screen.getByText((text) => text.includes('Congratulations.'));
    expect(readyMsg).toBeInTheDocument();
  });
  it('not passing and is downloadable', () => {
    createWrapper({
      grade: { isPassing: false },
      certificate: { isDownloadable: true },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveClass('alert-success');
    const readyMsg = screen.getByText((text) => text.includes('Congratulations.'));
    expect(readyMsg).toBeInTheDocument();
  });
  it('not passing and audit', () => {
    createWrapper({
      enrollment: {
        isAudit: true,
      },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toHaveClass('alert-info');
    const auditMsg = screen.getByText((text) => text.includes('Grade required to pass the course:'));
    expect(auditMsg).toBeInTheDocument();
  });
  it('not passing and has finished', () => {
    createWrapper({
      courseRun: { isArchived: true },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toHaveClass('alert-warning');
    const archivedMsg = screen.getByText('You are not eligible for a certificate.');
    expect(archivedMsg).toBeInTheDocument();
  });
  it('not passing and not audit and not finished', () => {
    createWrapper({});
    const banner = screen.getByRole('alert');
    expect(banner).toHaveClass('alert-warning');
    const msg = screen.getByText((text) => text.includes('Grade required for a certificate'));
    expect(msg).toBeInTheDocument();
  });
  it('is passing and is earned but unavailable', () => {
    createWrapper({
      grade: {
        isPassing: true,
      },
      certificate: {
        isEarnedButUnavailable: true,
      },
    });
    const banner = screen.getByRole('alert');
    expect(banner).toHaveClass('alert-info');
    const earnedMsg = screen.getByText((text) => text.includes('Your grade and certificate will be ready after'));
    expect(earnedMsg).toBeInTheDocument();
  });
  it('is passing and not downloadable render empty', () => {
    createWrapper({
      grade: {
        isPassing: true,
      },
    });
    const banner = screen.queryByRole('alert');
    expect(banner).toBeNull();
  });
});
