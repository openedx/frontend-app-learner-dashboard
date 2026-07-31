import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  sectionTitle: {
    id: 'learner-dash.overdueCourses.sectionTitle',
    description: 'Heading for the overdue courses alert section',
    defaultMessage: 'Overdue Courses',
  },
  sectionSubtitle: {
    id: 'learner-dash.overdueCourses.sectionSubtitle',
    description: 'Subtitle explaining how many assigned courses are overdue',
    defaultMessage: 'You have {count, plural, one {# course} other {# courses}} with missed deadlines. Complete them as soon as possible.',
  },
});

export default messages;
