import { StrictDict } from 'utils';

export const messages = StrictDict({
  auditAccessExpired: {
    id: 'learner-dash.courseCard.banners.auditAccessExpired',
    description: 'Audit access expiration banner message',
    defaultMessage: 'Your audit access to this course has expired.',
  },
  upgradeToAccess: {
    id: 'learner-dash.courseCard.banners.upgradeToAccess',
    description: 'Upgrade prompt for audit-expired learners that can still upgrade',
    defaultMessage: 'Upgrade now to access your course again.',
  },
  findAnotherCourse: {
    id: 'learner-dash.courseCard.banners.findAnotherCourse',
    description: 'Action prompt taking learners to course exploration',
    defaultMessage: 'Find another course',
  },
  upgradeDeadlinePassed: {
    id: 'learner-dash.courseCard.banners.upgradeDeadlinePassed',
    description: 'Audit upgrade deadline passed banner message',
    defaultMessage: 'Your upgrade deadline for this course has passed.  To upgrade, enroll in a session that is farther in the future.',
  },
  exploreCourseDetails: {
    id: 'learner-dash.courseCard.banners.exploreCourseDetails',
    description: 'Action prompt taking learners to course details page',
    defaultMessage: 'Explore course details.',
  },
  certRestricted: {
    id: 'learner-dash.courseCard.banners.certificateRestricted',
    description: 'Restricted certificate warning message',
    defaultMessage: 'Your Certificate of Achievement is being held pending confirmation that the issuance of your Certificate is in compliance with strict U.S. embargoes on Iran, Cuba, Syria, and Sudan.  If you think our system has mistakenly identified you as being connected with one of those countries, please let us know by contacting {supportEmail}.',
  },
  certRefundContactBilling: {
    id: 'learner-dash.courseCard.banners.certificateRefundContactBilling',
    description: 'Message to learners to contact billing for certificate refunds',
    defaultMessage: 'If you would like a refund on your Certificate of Achievement, please contact our billing address {billingEmail}',
  },
  passingGrade: {
    id: 'learner-dash.courseCard.banners.passingGrade',
    description: 'Message to learners with minimum passing grade for the course',
    defaultMessage: 'Grade required to pass the course: {minPassingGrade}',
  },
  notEligibleForCert: {
    id: 'learner-dash.courseCard.banners.notEligibleForCert',
    description: 'Certificate inelligibility message',
    defaultMessage: 'You are not eligible for a certificate.',
  },
  viewGrades: {
    id: 'learner-dash.courseCard.banners.viewGrades',
    description: 'Gradses link text',
    defaultMessage: 'View grades.',
  },
  certReady: {
    id: 'learner-dash.courseCard.banners.certReady',
    description: 'Certificate ready message',
    defaultMessage: 'Congratulations.  Your certificate is ready.',
  },
  viewCertificate: {
    id: 'learner-dash.courseCard.banners.viewCertificate',
    description: 'Certificate link text',
    defaultMessage: 'View Certificate.',
  },
  certMinGrade: {
    id: 'learner-dash.courseCard.banners.certMinGrade',
    description: 'Passing grade requirement message',
    defaultMessage: 'Grade required for a certificate: {minPassingGrade}',
  },
  downloadCertificate: {
    id: 'learner-dash.courseCard.banners.downloadCertificate',
    description: 'Certificate download link text',
    defaultMessage: 'Download Certificate.',
  },
  gradeAndCertReadyAfter: {
    id: 'learner-dash.courseCard.banners.gradseAndCertReadyAfter',
    description: 'Grade and certificate availability date message',
    defaultMessage: 'Your grade and certificate will be ready after {availableDate}.',
  },
  entitlementsUnavailable: {
    id: 'learner-dash.courseCard.banners.entitlementsUnavailable',
    description: 'Entitlements course message when no sessions are available',
    defaultMessage: 'There are no sessions available at the moment.  The course team will create new sessions soon.  If no sessions appear, please contact {emailLink} for information.',
  },
  entitlementsExpiringSoon: {
    id: 'learner-dash.courseCard.banners.entitlementsExpiringSoon',
    description: 'Entitlements course message when the entitlement is expiring soon.',
    defaultMessage: 'You must {selectSessionButton} by {changeDeadline} to access the course.',
  },
  entitlementsExpired: {
    id: 'learner-dash.courseCard.banners.entitlementsExpired',
    description: 'Entitlements course message when the entitlement is expired.',
    defaultMessage: 'You can no longer change sessions.',
  },
  selectSession: {
    id: 'learner-dash.courseCard.banners.selectSession',
    description: 'Entitlements session selection link text',
    defaultMessage: 'select a session',
  },
});

export default messages;
