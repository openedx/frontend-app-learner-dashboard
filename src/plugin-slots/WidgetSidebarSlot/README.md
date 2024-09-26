# Widget Sidebar Slot

### Slot ID: `widget_sidebar_slot`

## Description

This slot is used for adding content to the right-hand sidebar.

## Example

The space will show the `LookingForChallengeWidget` by default. This can be disabled in the configuration with the `keepDefault` boolean.

![Screenshot of the widget sidebar](./images/looking_for_challenge_widget.png)

Setting the MFE's `env.config.jsx` to the following will replace the default experience with a `CustomSidebarPanel` component.

![Screenshot of a custom call-to-action in the sidebar](./images/custom_CTA_sidebar.png)

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { CustomSidebarPanel } from 'package-that-exports-your-component';

const config = {
  pluginSlots: {
     widget_sidebar_slot: {
      keepDefault: false,
      plugins: [
        {
          op: ops.Insert,
          widget: {
            id: 'custom_sidebar_panel',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: CustomSidebarPanel,
          },
        },
      ],
    },
  },
}

export default config;
```