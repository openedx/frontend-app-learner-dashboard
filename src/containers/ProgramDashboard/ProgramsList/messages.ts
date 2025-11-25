import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  programDashboardPageTitle: {
    defaultMessage: 'Program Dashboard',
    id: 'program.dashboard.page.title',
    description: 'Page title for Program Dashboard',
  },
  programsListHeaderText: {
    defaultMessage: 'My Programs',
    id: 'programs.list.header.text',
    description: 'Header text for the programs list',
  },
  exploreProgramsCTAText: {
    defaultMessage: 'Browse recently launched courses and see what\'s new in your favorite subjects',
    id: 'explore.courses.cta.text',
    description: 'Call-to-action text for the explore courses component',
  },
  exploreProgramsCTAButtonText: {
    defaultMessage: 'Explore new programs',
    id: 'explore.courses.cta.button.text',
    description: 'Button text for that links to course search page',
  },
  hasNoEnrollmentsText: {
    defaultMessage: 'You are not enrolled in any programs yet.',
    id: 'has.no.enrollments.text',
    description: 'Text to display when a learner has not enrolled in any programs.',
  },
  progressCategoryBubblesRemaining: {
    id: 'dashboard.programs.program.listing.card.remaining.courses.count',
    defaultMessage: 'Remaining',
    description: 'Label for remaining courses count on program card',
  },
  progressCategoryBubblesInProgress: {
    id: 'dashboard.programs.program.listing.card.inProgress.courses.count',
    defaultMessage: 'In progress',
    description: 'Label for in progress courses count on program card',
  },
  progressCategoryBubblesSuccess: {
    id: 'dashboard.programs.program.listing.card.completed.courses.count',
    defaultMessage: 'Completed',
    description: 'Label for completed courses count on program card',
  },
  errorLoadingProgramEnrollments: {
    id: 'alert.error.loading.program.enrollments',
    defaultMessage: 'An error occurred while attempting to retrieve program enrollments. Try refreshing page. If that doesn\'t solve the issue, contact support at {contactSupportUrl}.',
    description: 'Alert message for failure to load program enrollments',
  },
});

export default messages;
