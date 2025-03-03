# Course Card Action Slot

### Slot ID: `enterprise_dashboard_modal_slot`

## Description

This slot is used for the modal on a dashboard that directs you to the enterprise dashboard if applicable. 
The following `env.config.jsx` will render the modal.

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { EnterpriseDashboardModal } from '@edx/frontend-plugin-learner-dashboard';

const config = {
  pluginSlots: {
    enterprise_dashboard_modal_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'dashboard_modal',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: EnterpriseDashboardModal,
          },
        },
      ],
    }
  },
}

export default config;
```
