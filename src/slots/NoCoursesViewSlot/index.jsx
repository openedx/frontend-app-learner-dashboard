import { Slot } from '@openedx/frontend-base';

import NoCoursesView from '../../containers/CoursesPanel/NoCoursesView';

export const NoCoursesViewSlot = () => (
  <Slot id="org.openedx.frontend.slot.learnerDashboard.noCoursesView.v1">
    <NoCoursesView />
  </Slot>
);

export default NoCoursesViewSlot;
