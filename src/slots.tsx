import { SlotOperation } from '@openedx/frontend-base';

import { learnerDashboardHeaderApp } from './widgets/LearnerDashboardHeader';

const slots: SlotOperation[] = [
  ...(learnerDashboardHeaderApp.slots as [])
];

export default slots;
