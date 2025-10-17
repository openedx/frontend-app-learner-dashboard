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
  exploreCoursesCTAText: {
    defaultMessage: 'Browse recently launched courses and see what&apos;s new in your favorite subjects',
    id: 'explore.courses.cta.text',
    description: 'Call-to-action text for the explore courses component',
  },
  exploreCoursesCTAButtonText: {
    defaultMessage: 'Explore new courses',
    id: 'explore.courses.cta.button.text',
    description: 'Button text for that links to course search page',
  },
  progressCategoryBubblesRemaining: {
    id: 'enterprise.dashboard.programs.program.listing.card.remaining.courses.count',
    defaultMessage: 'Remaining',
    description: 'Label for remaining courses count on program card',
  },
  progressCategoryBubblesInProgress: {
    id: 'enterprise.dashboard.programs.program.listing.card.inProgress.courses.count',
    defaultMessage: 'In progress',
    description: 'Label for in progress courses count on program card',
  },
  progressCategoryBubblesSuccess: {
    id: 'enterprise.dashboard.programs.program.listing.card.completed.courses.count',
    defaultMessage: 'Completed',
    description: 'Label for completed courses count on program card',
  },
});

export default messages;
