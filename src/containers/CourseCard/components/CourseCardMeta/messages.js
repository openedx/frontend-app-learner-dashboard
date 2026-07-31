import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  byProvider: {
    id: 'learner-dash.courseCard.CourseCardMeta.byProvider',
    description: 'Course provider byline shown under the course title (e.g. "By SSED")',
    defaultMessage: 'By {providerName}',
  },
  contentTypeVideo: {
    id: 'learner-dash.courseCard.CourseCardMeta.contentTypeVideo',
    description: 'Content type chip label. Always "Video" until the API exposes real content types.',
    defaultMessage: 'Video',
  },
  durationHours: {
    id: 'learner-dash.courseCard.CourseCardMeta.durationHours',
    description: 'Course duration chip label',
    defaultMessage: '{hours} hours',
  },
  dueDate: {
    id: 'learner-dash.courseCard.CourseCardMeta.dueDate',
    description: 'Course due date chip label',
    defaultMessage: 'Due: {dueDate}',
  },
  overdueBadge: {
    id: 'learner-dash.courseCard.CourseCardMeta.overdueBadge',
    description: 'Status badge label for a course past its due date',
    defaultMessage: 'Overdue',
  },
  dueSoonBadge: {
    id: 'learner-dash.courseCard.CourseCardMeta.dueSoonBadge',
    description: 'Status badge label for a course due within a few days',
    defaultMessage: 'Due Soon',
  },
  overdueStatusMessage: {
    id: 'learner-dash.courseCard.CourseCardMeta.overdueStatusMessage',
    description: 'Status line shown when a course is overdue',
    defaultMessage: '{days, plural, one {# day overdue} other {# days overdue}}',
  },
  inProgressLabel: {
    id: 'learner-dash.courseCard.CourseCardMeta.inProgressLabel',
    description: 'Label above the per-course progress bar',
    defaultMessage: 'In Progress',
  },
});

export default messages;
