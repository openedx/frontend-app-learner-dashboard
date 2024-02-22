import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  accessExpired: {
    id: 'learner-dash.courseCard.CourseCardDetails.accessExpired',
    description: 'Course access expiration date message on course card for expired access.',
    defaultMessage: 'Access expired {accessExpirationDate}',
  },
  accessExpires: {
    id: 'learner-dash.courseCard.CourseCardDetails.accessExpires',
    description: 'Course access expiration date message on course card.',
    defaultMessage: 'Access expires {accessExpirationDate}',
  },
  courseEnded: {
    id: 'learner-dash.courseCard.CourseCardDetails.courseEnded',
    description: 'Course ended message on course card.',
    defaultMessage: 'Course ended {endDate}',
  },
  courseEnds: {
    id: 'learner-dash.courseCard.CourseCardDetails.courseEnds',
    description: 'Course ending message on course card.',
    defaultMessage: 'Course ends {endDate}',
  },
  courseStarts: {
    id: 'learner-dash.courseCard.CourseCardDetails.courseStarts',
    description: 'Course start date message on course card.',
    defaultMessage: 'Course starts {startDate}',
  },
  unknownProviderName: {
    id: 'learner-dash.courseCard.CourseCardDetails.unknownProviderName',
    description: 'Provider name display when name is unknown',
    defaultMessage: 'Unknown',
  },
  changeOrLeaveSessionButton: {
    id: 'learner-dash.courseCard.CourseCardDetails.changeOrLeaveSessionButton',
    description: 'Button for trigger change or leave session for entitlement course',
    defaultMessage: 'Change or leave session',
  },
});

export default messages;
