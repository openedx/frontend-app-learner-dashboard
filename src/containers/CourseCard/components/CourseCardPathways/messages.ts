import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  includedIn: {
    id: 'learner-dash.courseCard.pathwaysLabel',
    description: 'Label that precedes pathways to which this course belongs',
    defaultMessage: 'Included in',
  },
  morePathways: {
    id: 'learner-dash.courseCard.morePathways',
    description: 'Accessible label of the button that shows the pathways that do not fit in the course card',
    defaultMessage: 'Show {count, plural, one {# more pathway} other {# more pathways}}',
  },
});

export default messages;
