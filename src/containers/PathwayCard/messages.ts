import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  cardProgress: {
    id: 'learner-dash.pathwayCard.progress',
    description: 'How far the user has progressed through a pathway, in terms of items complete out of the total number',
    defaultMessage: '{completedCount}/{totalCount} complete',
  },
});

export default messages;
