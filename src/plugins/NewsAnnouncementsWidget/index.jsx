import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Badge, Card, Spinner } from '@openedx/paragon';
import { IconNews } from '@tabler/icons-react';

import { useAnnouncements, useMarkAnnouncementRead } from 'data/hooks';

import messages from './messages';
import './index.scss';

export const NewsAnnouncementsWidget = () => {
  const { formatMessage } = useIntl();
  const { data, isLoading, isError } = useAnnouncements();
  const { mutate: markAnnouncementRead } = useMarkAnnouncementRead();

  const announcements = data?.results ?? [];
  const unreadCount = data?.unread_count ?? 0;

  if (isLoading) {
    return (
      <Card id="news-announcements-widget" className="my-lg">
        <Card.Section className="d-flex justify-content-center">
          <Spinner animation="border" screenReaderText={formatMessage(messages.loading)} />
        </Card.Section>
      </Card>
    );
  }

  if (isError || !announcements.length) {
    return null;
  }

  return (
    <Card id="news-announcements-widget" className="my-lg">
      <Card.Header
        title={(
          <span className="d-flex align-items-center news-announcements-header text-sm font-medium text-slate-900">
            <IconNews size={20} className="news-announcements-header-icon mr-2" aria-hidden="true" />
            {formatMessage(messages.widgetTitle)}
          </span>
        )}
        actions={unreadCount > 0 ? (
          <Badge variant="info" pill className="news-announcements-badge">
            {formatMessage(messages.newCount, { count: unreadCount })}
          </Badge>
        ) : null}
      />
      <Card.Section>
        <ul className="news-announcements-list list-unstyled d-flex flex-column m-0 p-0">
          {announcements.map(({
            id, title, body, days_ago: daysAgo, is_read: isRead,
          }) => (
            <li key={id} className="news-announcements-item-wrapper">
              <button
                type="button"
                className={[
                  'news-announcements-item',
                  'd-flex align-items-start w-100 border-0 bg-transparent text-left p-0',
                  !isRead && 'is-unread',
                ].filter(Boolean).join(' ')}
                onClick={() => !isRead && markAnnouncementRead(id)}
                aria-label={!isRead ? formatMessage(messages.markAsRead, { title }) : undefined}
              >
                {!isRead && (
                  <span className="news-announcements-dot rounded-full mr-2" aria-hidden="true" />
                )}
                <span className="news-announcements-content">
                  <span className={['news-announcements-title text-slate-900 d-block', !isRead ? 'font-bold' : 'font-regular'].join(' ')}>
                    {title}
                  </span>
                  <span className="news-announcements-description text-slate-600 d-block">
                    {body}
                  </span>
                  <span className="news-announcements-time text-slate-500">
                    {formatMessage(messages.daysAgo, { days: daysAgo })}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Card.Section>
    </Card>
  );
};

NewsAnnouncementsWidget.propTypes = {};

export default NewsAnnouncementsWidget;
