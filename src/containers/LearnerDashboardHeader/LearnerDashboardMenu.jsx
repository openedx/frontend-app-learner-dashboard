import React from 'react';
import {
  IconHome,
  IconBook,
  IconClockHour3,
  IconHelpHexagon,
  IconBell,
} from '@tabler/icons-react';
import { getConfig } from '@edx/frontend-platform';

import urls from 'data/services/lms/urls';

import messages from './messages';

const ICON_MAP = {
  Home: IconHome,
  LibraryBooks: IconBook,
  ClockHour3: IconClockHour3,
  Search: ({ size = 18, className, ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M18.665 18.665L12.665 12.665M0.665039 7.66504C0.665039 8.58429 0.846099 9.49454 1.19788 10.3438C1.54967 11.1931 2.06528 11.9648 2.71529 12.6148C3.3653 13.2648 4.13698 13.7804 4.98626 14.1322C5.83553 14.484 6.74579 14.665 7.66504 14.665C8.58429 14.665 9.49454 14.484 10.3438 14.1322C11.1931 13.7804 11.9648 13.2648 12.6148 12.6148C13.2648 11.9648 13.7804 11.1931 14.1322 10.3438C14.484 9.49454 14.665 8.58429 14.665 7.66504C14.665 6.74579 14.484 5.83553 14.1322 4.98626C13.7804 4.13698 13.2648 3.3653 12.6148 2.71529C11.9648 2.06528 11.1931 1.54967 10.3438 1.19788C9.49454 0.846099 8.58429 0.665039 7.66504 0.665039C6.74579 0.665039 5.83553 0.846099 4.98626 1.19788C4.13698 1.54967 3.3653 2.06528 2.71529 2.71529C2.06528 3.3653 1.54967 4.13698 1.19788 4.98626C0.846099 5.83553 0.665039 6.74579 0.665039 7.66504Z"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  HelpHexagon: IconHelpHexagon,
};

const NavItem = ({ icon: IconComponent, label }) => (
  <span className="d-inline-flex align-items-center lw-nav-item">
    <IconComponent size={18} className="lw-nav-icon" />
    <span>{label}</span>
  </span>
);

const getLearnerHeaderMenu = (
  formatMessage,
  courseSearchUrl,
  authenticatedUser,
  exploreCoursesClick,
) => {
  const BASE_URL = getConfig().LMS_BASE_URL;
  const searchCatalogUrl = getConfig().SEARCH_CATALOG_URL;
  const configNavLinks = getConfig().HEADER_NAV_LINKS;
  const isLinkActive = (link) => {
    if (link.url === '/dashboard' || link.url.endsWith('/dashboard')) {
      return getConfig().APP_ID === 'learner-dashboard';
    }
    const linkPath = link.url.startsWith('http')
      ? new URL(link.url).pathname
      : link.url;
    return window.location.pathname === linkPath;
  };

  const mainMenu = configNavLinks
    ? configNavLinks.map((link) => ({
      type: 'item',
      href: link.url.startsWith('http') ? link.url : `${BASE_URL}${link.url}`,
      isActive: isLinkActive(link),
      content: (
        <NavItem
          icon={ICON_MAP[link.icon] ?? IconHome}
          label={link.title}
        />
      ),
    }))
    : [
      {
        type: 'item',
        href: '/',
        content: formatMessage(messages.course),
        isActive: true,
      },
      ...(getConfig().ENABLE_PROGRAMS ? [{
        type: 'item',
        href: `${urls.programsUrl()}`,
        content: formatMessage(messages.program),
      }] : []),
      ...(!getConfig().NON_BROWSABLE_COURSES ? [{
        type: 'item',
        href: `${urls.baseAppUrl(courseSearchUrl)}`,
        content: formatMessage(messages.discoverNew),
        onClick: (e) => {
          exploreCoursesClick(e);
        },
      }]
        : []),
    ];

  const searchItem = searchCatalogUrl ? [{
    type: 'item',
    href: null,
    className: 'lw-search-item',
    content: (
      <div className="lw-search-wrapper">
        <ICON_MAP.Search size={18} className="lw-search-icon" />
        <input
          className="lw-search-input"
          type="search"
          aria-label={formatMessage(messages.searchPlaceholder)}
          placeholder={formatMessage(messages.searchPlaceholder)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const q = e.target.value.trim();
              window.location.href = urls.baseAppUrl(searchCatalogUrl)
                + (q ? `?q=${encodeURIComponent(q)}` : '');
            }
          }}
        />
      </div>
    ),
  }] : [];

  return {
    mainMenu: [...mainMenu, ...searchItem],
    secondaryMenu: (
      <button className="lw-notification-btn" aria-label="Notifications">
        <IconBell size={24} />
      </button>
    ),
    userMenu: [
      {
        heading: '',
        items: [
          {
            type: 'item',
            href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser?.username}`,
            content: formatMessage(messages.profile),
          },
          {
            type: 'item',
            href: `${getConfig().ACCOUNT_SETTINGS_URL}`,
            content: formatMessage(messages.account),
          },
          ...(getConfig().ORDER_HISTORY_URL ? [{
            type: 'item',
            href: getConfig().ORDER_HISTORY_URL,
            content: formatMessage(messages.orderHistory),
          }] : []),
        ],
      },
      {
        heading: '',
        items: [
          {
            type: 'item',
            href: `${getConfig().LOGOUT_URL}`,
            content: formatMessage(messages.signOut),
          },
        ],
      },
    ],
  };
};

export default getLearnerHeaderMenu;
