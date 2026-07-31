import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  widgetTitle: {
    id: 'CourseCompletionWidget.widgetTitle',
    defaultMessage: 'Upcoming Due Dates',
    description: 'Heading for the course completion sidebar widget',
  },
  percentCompleted: {
    id: 'CourseCompletionWidget.percentCompleted',
    defaultMessage: '{percent}% Completed',
    description: 'Course completion percentage label',
  },
  dueDate: {
    id: 'CourseCompletionWidget.dueDate',
    defaultMessage: 'Due {date}',
    description: 'Course due date label',
  },
  itemsRange: {
    id: 'CourseCompletionWidget.itemsRange',
    defaultMessage: '{start}-{end} of {total} items',
    description: 'Range of visible items in the upcoming due dates widget footer',
  },
  paginationLabel: {
    id: 'CourseCompletionWidget.paginationLabel',
    defaultMessage: 'Upcoming due dates pagination',
    description: 'Accessible label for the upcoming due dates pagination control',
  },
});

export default messages;
