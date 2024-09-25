# No Courses View Slot

### Slot ID: `no_courses_view_slot`

## Description

This slot is used for replacing or adding content around the `NoCoursesView` component, which renders when the learner has not yet enrolled in any courses.

## Example

The space will show the `NoCoursesView` by default. This can be disabled in the configuration with the `keepDefault` boolean. The following `env.config.jsx` will replace the default experience with a `CustomNoCoursesCTA` component.

![Screenshot of the no courses view](./images/no_courses_view_slot.png)

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { CustomSidebarPanel } from 'package-that-exports-your-component';

const config = {
  pluginSlots: {
    no_courses_view_slot: {
      keepDefault: false,
      plugins: [
        {
          op: ops.Insert,
          widget: {
            id: 'custom_no_courses_CTA',
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