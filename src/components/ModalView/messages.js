import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  recommendationsFeatureText: {
    id: 'RecommendationsPanel.recommendationsFeatureText',
    defaultMessage: 'Personalized recommendations feature is not yet available. We are working hard on bringing it to your learner home in the near future.',
    description: 'recommendations feature text',
  },
  recommendationsAlertedText: {
    id: 'RecommendationsPanel.recommendationsAlertedText',
    defaultMessage: 'Would you like to be alerted when it becomes available?',
    description: 'recommendations alerted text',
  },
  recommendationsModalHeading: {
    id: 'RecommendationsPanel.recommendationsModalHeading',
    defaultMessage: 'Thank you for your interest!',
    description: 'Heading of modal',
  },
  modalSkipButton: {
    id: 'RecommendationsPanel.modalSkipButton',
    defaultMessage: 'Skip for now',
    description: 'button for Skip for now',
  },
  modalCountMeButton: {
    id: 'RecommendationsPanel.modalCountMeButton',
    defaultMessage: 'Count me in!',
    description: 'button for Count me in!',
  },
});

export default messages;
