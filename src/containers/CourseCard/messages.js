import { StrictDict } from 'utils';

export const messages = StrictDict({
  accessExpired: {
    id: 'learner-dash.courseCard.accessExpired',
    description: 'Course access expiration date message on course card for expired access.',
    defaultMessage: 'Access expired {accessExpirationDate}',
  },
  accessExpires: {
    id: 'learner-dash.courseCard.accessExpires',
    description: 'Course access expiration date message on course card.',
    defaultMessage: 'Access expires {accessExpirationDate}',
  },
  courseEnded: {
    id: 'learner-dash.courseCard.courseEnded',
    description: 'Course ended message on course card.',
    defaultMessage: 'Course ended {endDate}',
  },
  courseEnds: {
    id: 'learner-dash.courseCard.courseEnds',
    description: 'Course ending message on course card.',
    defaultMessage: 'Course ends {endDate}',
  },
  bannerAlt: {
    id: 'learner-dash.courseCard.bannerAlt',
    description: 'Course card banner alt-text',
    defaultMessage: 'Course thumbnail',
  },
  unknownProviderName: {
    id: 'learner-dash.courseCard.unknownProviderName',
    description: 'Provider name display when name is unknown',
    defaultMessage: 'Unknown',
  },
});

export default messages;
