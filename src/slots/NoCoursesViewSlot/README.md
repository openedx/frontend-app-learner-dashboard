# No Courses View Slot

### Slot ID: `org.openedx.frontend.slot.learnerDashboard.noCoursesView.v1`

## Description

This slot is used for replacing or adding content around the `NoCoursesView` component. The `NoCoursesViewSlot` only renders if the learner has not yet enrolled in any courses.

## Example

The space will show the `NoCoursesView` by default.

![Screenshot of the no courses view](./images/no_courses_view_slot.png)

Setting configuration to the following will replace the default experience with a custom call-to-action component.

![Screenshot of a custom no courses view](./images/readme_custom_no_courses_view.png)

```js
import { WidgetOperationTypes } from '@openedx/frontend-base';

const config = {
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.noCoursesView.v1',
      id: 'my.widget',
      op: WidgetOperationTypes.APPEND,
      element: (<h3>Check out our catalog of courses and start learning today!</h3>)
    },
  ]
}

export default config;
```
