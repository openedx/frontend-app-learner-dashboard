# No Courses View Slot

### Slot ID: `org.openedx.frontend.learner_dashboard.no_courses_view.v1`

### Slot ID Aliases
* `no_courses_view_slot`

## Description

This slot is used for replacing or adding content around the `NoCoursesView` component. The `NoCoursesViewSlot` only renders if the learner has not yet enrolled in any courses.

## Example

The space will show the `NoCoursesView` by default. This can be disabled in the configuration with the `keepDefault` boolean.

![Screenshot of the no courses view](./images/no_courses_view_slot.png)

Setting the MFE's `env.config.jsx` to the following will replace the default experience with a custom call-to-action component.

![Screenshot of a custom no courses view](./images/readme_custom_no_courses_view.png)

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.learner_dashboard.no_courses_view.v1': {
      // Hide the default NoCoursesView component
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_no_courses_CTA',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: () => (
              <h3>
                Check out our catalog of courses and start learning today!
              </h3>
            ),
          },
        },
      ],
    },
  },
}

export default config;
```