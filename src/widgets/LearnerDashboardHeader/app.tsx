import { App, LinkMenuItem, WidgetOperationTypes, getAppConfig } from '@openedx/frontend-base';

import { appId } from '../../constants';

import ConfirmEmailBanner from './ConfirmEmailBanner';
import MasqueradeBar from './MasqueradeBar';
import CoursesLink from './CoursesLink';
import DiscoverLinkMenuItem from './DiscoverLinkMenuItem';
import ProgramsLinkMenuItem from './ProgramsLinkMenuItem';
import SupportLinkMenuItem from './SupportLinkMenuItem';
import OrderHistoryLinkMenuItem from './OrderHistoryLinkMenuItem';

const app: App = {
  appId: 'org.openedx.frontend.app.learnerDashboard.header',
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.header.main.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerConfirmEmail.v1',
      op: WidgetOperationTypes.PREPEND,
      component: ConfirmEmailBanner,
    },
    {
      slotId: 'org.openedx.frontend.slot.header.primaryLinks.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkCourses.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <LinkMenuItem
          label={<CoursesLink />}
          url="/"
          variant="navLink"
        />
      )
    },
    {
      slotId: 'org.openedx.frontend.slot.header.primaryLinks.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkPrograms.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <ProgramsLinkMenuItem
          variant="navLink"
        />
      ),
      condition: {
        callback: () => getAppConfig(appId).ENABLE_PROGRAMS === true,
      }
    },
    {
      slotId: 'org.openedx.frontend.slot.header.primaryLinks.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkDiscover.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <DiscoverLinkMenuItem
          variant="navLink"
        />
      ),
    },
    {
      slotId: 'org.openedx.frontend.slot.header.secondaryLinks.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkSupport.v1',
      op: WidgetOperationTypes.APPEND,
      element: (
        <SupportLinkMenuItem
          variant="navLink"
        />
      ),
      condition: {
        callback: () => getAppConfig(appId).SUPPORT_URL ? true : false,
      }
    },
    {
      slotId: 'org.openedx.frontend.slot.header.authenticatedMenu.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerLinkOrderHistory.v1',
      op: WidgetOperationTypes.INSERT_BEFORE,
      relatedId: 'org.openedx.frontend.widget.header.desktopAuthenticatedMenuLogout.v1',
      element: (
        <OrderHistoryLinkMenuItem
          variant="navLink"
        />
      ),
      condition: {
        callback: () => getAppConfig(appId).ORDER_HISTORY_URL ? true : false,
      }
    },
    {
      slotId: 'org.openedx.frontend.slot.header.main.v1',
      id: 'org.openedx.frontend.widget.learnerDashboard.headerMasqueradeBar.v1',
      op: WidgetOperationTypes.APPEND,
      component: MasqueradeBar,
    },
  ]
};

export default app;
