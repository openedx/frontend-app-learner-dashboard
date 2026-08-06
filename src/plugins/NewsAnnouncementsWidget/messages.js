import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  widgetTitle: {
    id: 'NewsAnnouncementsWidget.widgetTitle',
    defaultMessage: 'News and Announcements',
    description: 'Heading for the news and announcements sidebar widget',
  },
  newCount: {
    id: 'NewsAnnouncementsWidget.newCount',
    defaultMessage: '{count} new',
    description: 'Badge showing how many announcements are unread',
  },
  daysAgo: {
    id: 'NewsAnnouncementsWidget.daysAgo',
    defaultMessage: '{days, plural, one {# Day Ago} other {# Days Ago}}',
    description: 'Relative timestamp showing how many days ago an announcement was posted',
  },
  loading: {
    id: 'NewsAnnouncementsWidget.loading',
    defaultMessage: 'Loading announcements',
    description: 'Screen-reader text for the announcements loading spinner',
  },
  markAsRead: {
    id: 'NewsAnnouncementsWidget.markAsRead',
    defaultMessage: 'Mark "{title}" as read',
    description: 'Accessible label for marking an unread announcement as read',
  },
});

export default messages;
