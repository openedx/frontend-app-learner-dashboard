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
    defaultMessage: 'Your Certificate of Achievement is being held pending confirmation that the issuance of your Certificate is in compliance with strict U.S. embargoes on Iran, Cuba, Syria, and Sudan.  If you think our system has mistakenly identified you as being connected with one of those countries, please let us know by contacting ',
  },
});

export default messages;
