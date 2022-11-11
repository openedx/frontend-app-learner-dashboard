import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  recommendationsHeading: {
    id: 'RecommendationsPanel.recommendationsHeading',
    defaultMessage: 'Recommendations for you',
    description: 'Heading on recommendations panel with personalized recommendations',
  },
  popularCoursesHeading: {
    id: 'RecommendationsPanel.popularCoursesHeading',
    defaultMessage: 'Popular on edX',
    description: 'Heading on recommendations panel with general recommendations',
  },
  exploreCoursesButton: {
    id: 'RecommendationsPanel.exploreCoursesButton',
    defaultMessage: 'Explore courses',
    description: 'Button to explore more courses on recommendations panel',
  },
});

export default messages;
