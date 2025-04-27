import { Slot } from '@openedx/frontend-base';
import LookingForChallengeWidget from '../../widgets/LookingForChallengeWidget';

export const WidgetSidebarSlot = () => (
  <Slot id="org.openedx.frontend.slot.learnerDashboard.widgetSidebar.v1">
    <LookingForChallengeWidget />
  </Slot>
);

export default WidgetSidebarSlot;
