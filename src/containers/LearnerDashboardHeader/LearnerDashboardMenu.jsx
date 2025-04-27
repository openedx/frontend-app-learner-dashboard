import { getAppConfig, getConfig } from '@openedx/frontend-base';

import urls from '../../data/services/lms/urls';

import messages from './messages';

const getLearnerHeaderMenu = (
  formatMessage,
  courseSearchUrl,
  authenticatedUser,
  exploreCoursesClick,
) => ({
  mainMenu: [
    {
      type: 'item',
      href: '/',
      content: formatMessage(messages.course),
      isActive: true,
    },
    ...(getAppConfig('openedxLearnerDashboard').ENABLE_PROGRAMS ? [{
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
  ],
  secondaryMenu: [
    ...(getAppConfig('openedxLearnerDashboard').SUPPORT_URL ? [{
      type: 'item',
      href: `${getAppConfig('openedxLearnerDashboard').SUPPORT_URL}`,
      content: formatMessage(messages.help),
    }] : []),
  ],
  userMenu: [
    {
      heading: '',
      items: [
        {
          type: 'item',
          href: `${getAppConfig('openedxLearnerDashboard').ACCOUNT_PROFILE_URL}/u/${authenticatedUser?.username}`,
          content: formatMessage(messages.profile),
        },
        {
          type: 'item',
          href: `${getAppConfig('openedxLearnerDashboard').ACCOUNT_SETTINGS_URL}`,
          content: formatMessage(messages.account),
        },
        ...(getAppConfig('openedxLearnerDashboard').ORDER_HISTORY_URL ? [{
          type: 'item',
          href: getAppConfig('openedxLearnerDashboard').ORDER_HISTORY_URL,
          content: formatMessage(messages.orderHistory),
        }] : []),
      ],
    },
    {
      heading: '',
      items: [
        {
          type: 'item',
          href: `${getConfig().logoutUrl}`,
          content: formatMessage(messages.signOut),
        },
      ],
    },
  ],
}
);

export default getLearnerHeaderMenu;
