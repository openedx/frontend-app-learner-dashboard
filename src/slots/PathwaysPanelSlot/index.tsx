import { Slot } from '@openedx/frontend-base';

import { PathwaysPanel, PathwaysPanelProps } from '../../containers/PathwaysPanel';

export const PathwaysPanelSlot = ({ pathwaysByCategory }: PathwaysPanelProps) => (
  <Slot
    id="org.openedx.frontend.slot.learnerDashboard.pathwaysPanel.v1"
    pathwaysByCategory={pathwaysByCategory}
  >
    <PathwaysPanel pathwaysByCategory={pathwaysByCategory} />
  </Slot>
);

export default PathwaysPanelSlot;
