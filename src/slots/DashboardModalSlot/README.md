# Dashboard Modal Slot

### Slot ID: `org.openedx.frontend.slot.learnerDashboard.dashboardModal.v1`

## Description

This slot is used for the modal on a dashboard.  The following configuration will render it.

## Example

Learner dashboard will show modal
![Screenshot of the dashboard modal](./images/dashboard_modal_slot.png)

```js
import { WidgetOperationTypes } from '@openedx/frontend-base';
import { ModalDialog } from '@openedx/paragon';

const config = {
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.dashboardModal.v1',
      id: 'my.widget',
      op: WidgetOperationTypes.Append,
      element: (<ModalDialog title="Modal that appears on learner dashboard" />)
    },
  ]
}

export default config;
```
