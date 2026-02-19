import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useCourseData } from 'hooks';
import { formatMessage } from 'testUtils';
import { CourseBanner } from './CourseBanner';

import messages from './messages';

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
  utilHooks: {
    useFormatDate: () => date => date,
  },
}));

const cardId = 'test-card-id';

const enrollmentData = {
  isVerified: false,
  isAuditAccessExpired: false,
  coursewareAccess: {
    hasUnmetPrerequisites: false,
    isStaff: false,
    isTooEarly: false,
  },
};
const courseRunData = {
  isActive: false,
  startDate: '11/11/3030',
  marketingUrl: 'marketing-url',
};

const renderCourseBanner = (overrides = {}) => {
  const {
    courseRun = {},
    enrollment = {},
  } = overrides;
  useCourseData.mockReturnValue({
    courseRun: {
      ...courseRunData,
      ...courseRun,
    },
    enrollment: {
      ...enrollmentData,
      ...enrollment,
    },
  });
  return render(<IntlProvider locale="en"><CourseBanner cardId={cardId} /></IntlProvider>);
};

describe('CourseBanner', () => {
  it('initializes data with course number from enrollment, course and course run data', () => {
    renderCourseBanner();
    expect(useCourseData).toHaveBeenCalledWith(cardId);
  });
  it('no display if learner is verified', () => {
    renderCourseBanner({ enrollment: { isVerified: true } });
    expect(screen.queryByRole('alert')).toBeNull();
  });
  it('should use default values when enrollment data is undefined', () => {
    renderCourseBanner({
      enrollment: undefined,
      courseRun: {},
    });

    expect(useCourseData).toHaveBeenCalledWith('test-card-id');
  });
  describe('audit access expired', () => {
    it('should display correct message and link', () => {
      renderCourseBanner({ enrollment: { isAuditAccessExpired: true } });
      const auditAccessText = screen.getByText(formatMessage(messages.auditAccessExpired));
      expect(auditAccessText).toBeInTheDocument();
      const auditAccessLink = screen.getByText(formatMessage(messages.findAnotherCourse));
      expect(auditAccessLink).toBeInTheDocument();
    });
  });
  describe('unmet prerequisites', () => {
    it('should display correct message', () => {
      renderCourseBanner({ enrollment: { coursewareAccess: { hasUnmetPrerequisites: true } } });
      const preReqText = screen.getByText(formatMessage(messages.prerequisitesNotMet));
      expect(preReqText).toBeInTheDocument();
    });
  });
  describe('too early', () => {
    describe('no start date', () => {
      it('should not display banner', () => {
        renderCourseBanner({ enrollment: { coursewareAccess: { isTooEarly: true } }, courseRun: { startDate: null } });
        const banner = screen.queryByRole('alert');
        expect(banner).toBeNull();
      });
    });
    describe('has start date', () => {
      it('should display messages courseHasNotStarted', () => {
        renderCourseBanner({ enrollment: { coursewareAccess: { isTooEarly: true } } });
        const earlyMsg = screen.getByText(
          formatMessage(messages.courseHasNotStarted, { startDate: courseRunData.startDate }),
        );
        expect(earlyMsg).toBeInTheDocument();
      });
    });
  });
  describe('staff', () => {
    it('should not display banner', () => {
      renderCourseBanner({ enrollment: { coursewareAccess: { isStaff: true } } });
      const banner = screen.queryByRole('alert');
      expect(banner).toBeNull();
    });
  });
});
