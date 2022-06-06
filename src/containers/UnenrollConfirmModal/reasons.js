/* eslint-disable quotes */
import { StrictDict } from 'utils';

export const reasonKeys = StrictDict({
  prereqs: 'prereqs',
  difficulty: 'difficulty',
  goals: 'goals',
  broken: 'broken',
  time: 'time',
  browse: 'browse',
  support: 'support',
  quality: 'quality',
  easy: 'easy',
  custom: 'custom',
});

export const order = [
  reasonKeys.prereqs,
  reasonKeys.difficulty,
  reasonKeys.goals,
  reasonKeys.broken,
  reasonKeys.time,
  reasonKeys.browse,
  reasonKeys.support,
  reasonKeys.quality,
  reasonKeys.easy,
];

const messages = StrictDict({
  [reasonKeys.prereqs]: {
    id: 'learner-dash.unenrollConfirm.reasons.prereqs',
    description: 'Unenroll reason option - missing prerequisites',
    defaultMessage: `I don't have the academic or language prerequisites`,
  },
  [reasonKeys.difficulty]: {
    id: 'learner-dash.unenrollConfirm.reasons.difficulty',
    description: 'Unenroll reason option - material is too hard',
    defaultMessage: 'The course material was too hard',
  },
  [reasonKeys.goals]: {
    id: 'learner-dash.unenrollConfirm.reasons.goals',
    description: 'Unenroll reason option - goals-related',
    defaultMessage: `This won't help me reach my goals`,
  },
  [reasonKeys.broken]: {
    id: 'learner-dash.unenrollConfirm.reasons.broken',
    description: 'Unenroll reason option - something broken',
    defaultMessage: 'Something was broken',
  },
  [reasonKeys.time]: {
    id: 'learner-dash.unenrollConfirm.reasons.time',
    description: 'Unenroll reason option - time-related',
    defaultMessage: `I don't have the time`,
  },
  [reasonKeys.browse]: {
    id: 'learner-dash.unenrollConfirm.reasons.browse',
    description: 'Unenroll reason option - wanted to browse',
    defaultMessage: 'I just wanted to browse the material',
  },
  [reasonKeys.support]: {
    id: 'learner-dash.unenrollConfirm.reasons.support',
    description: 'Unenroll reason option - lacking support',
    defaultMessage: `I don't have enough support`,
  },
  [reasonKeys.quality]: {
    id: 'learner-dash.unenrollConfirm.reasons.quality',
    description: 'Unenroll reason option - quality-related',
    defaultMessage: 'I am not happy with the quality of the content',
  },
  [reasonKeys.easy]: {
    id: 'learner-dash.unenrollConfirm.reasons.easy',
    description: 'Unenroll reason option - too easy',
    defaultMessage: 'The course material was too easy',
  },
  customPlaceholder: {
    id: 'learner-dash.unenrollConfirm.reasons.custom-placeholder',
    description: 'Unenroll custom reason option placeholder text',
    defaultMessage: 'Other',
  },
});

export default {
  messages,
  order,
  reasonKeys,
};
