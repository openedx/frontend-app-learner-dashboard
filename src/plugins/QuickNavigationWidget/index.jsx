import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Hyperlink } from '@openedx/paragon';
import {
  IconCompass,
  IconHistory,
  IconBuildingBank,
  IconTags,
  IconHelpHexagon,
} from '@tabler/icons-react';

import urls from 'data/services/lms/urls';

import messages from './messages';
import './index.scss';

// Single consolidated widget for all sidebar "quick navigation" links, so new
// links only require an entry in this list instead of a whole new widget.
const useQuickNavigationLinks = (formatMessage) => {
  const searchCatalogUrl = getConfig().SEARCH_CATALOG_URL;
  const supportUrl = getConfig().SUPPORT_URL;

  return [
    {
      key: 'discoverCourses',
      icon: IconCompass,
      label: formatMessage(messages.discoverCourses),
      href: urls.baseAppUrl(searchCatalogUrl || '/course'),
    },
    {
      key: 'viewLearningHistory',
      icon: IconHistory,
      label: formatMessage(messages.viewLearningHistory),
      href: urls.baseAppUrl('/history'),
    },
    {
      key: 'browseByProvider',
      icon: IconBuildingBank,
      label: formatMessage(messages.browseByProvider),
      href: urls.baseAppUrl('/course?f=provider'),
    },
    {
      key: 'browseByTopic',
      icon: IconTags,
      label: formatMessage(messages.browseByTopic),
      href: urls.baseAppUrl('/course?f=topic'),
    },
    {
      key: 'getHelp',
      icon: IconHelpHexagon,
      label: formatMessage(messages.getHelp),
      href: supportUrl,
    },
  ].filter(({ href }) => !!href);
};

export const QuickNavigationWidget = () => {
  const { formatMessage } = useIntl();
  const links = useQuickNavigationLinks(formatMessage);

  if (!links.length) {
    return null;
  }

  return (
    <Card id="quick-navigation-widget" className="my-lg">
      <Card.Header
        title={(
          <span className="d-flex align-items-center quick-navigation-header text-sm font-medium text-slate-900">
            <IconCompass size={20} className="quick-navigation-header-icon mr-2" aria-hidden="true" />
            {formatMessage(messages.widgetTitle)}
          </span>
        )}
      />
      <Card.Section>
        <ul className="quick-navigation-list list-unstyled d-flex flex-column m-0 p-0">
          {links.map(({
            key, icon: Icon, label, href,
          }) => (
            <li key={key} className="quick-navigation-item">
              <Hyperlink
                destination={href}
                className="quick-navigation-link d-flex align-items-center text-slate-700"
              >
                <Icon size={18} className="quick-navigation-icon mr-2" aria-hidden="true" />
                {label}
              </Hyperlink>
            </li>
          ))}
        </ul>
      </Card.Section>
    </Card>
  );
};

QuickNavigationWidget.propTypes = {};

export default QuickNavigationWidget;
