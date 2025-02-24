# Dashboard Modal Slot

### Slot ID: `dashboard_modal_slot`

## Description

This slot is used for the modal on a dashboard.
The following `env.config.jsx` will render the modal.

## Example

Learner dashboard will show modal
![Screenshot of the dashboard modal](./images/dashboard_modal_slot.png)

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { ModalDialog } from '@openedx/paragon';

const config = {
  pluginSlots: {
    dashboard_modal_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'dashboard_modal',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: 
              <ModalDialog title="Modal that appears on learner dashboard" />,
          },
        },
      ],
    }
  },
}

export default config;
```
