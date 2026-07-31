import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'WidgetSidebar.progressSummary.title',
    defaultMessage: 'Progress Summary',
    description: 'Progress summary widget heading',
  },
  overallProgress: {
    id: 'WidgetSidebar.progressSummary.overallProgress',
    defaultMessage: 'Overall Progress',
    description: 'Label for the overall course completion percentage',
  },
  inProgress: {
    id: 'WidgetSidebar.progressSummary.inProgress',
    defaultMessage: 'In Progress',
    description: 'Count of courses currently in progress',
  },
  completed: {
    id: 'WidgetSidebar.progressSummary.completed',
    defaultMessage: 'Completed',
    description: 'Count of completed courses',
  },
  totalTimeSpent: {
    id: 'WidgetSidebar.progressSummary.totalTimeSpent',
    defaultMessage: 'Total Time Spent',
    description: 'Total time spent across all enrolled courses',
  },
});

export default messages;
