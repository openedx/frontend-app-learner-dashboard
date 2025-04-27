# Course Banner Slot

### Slot ID: `org.openedx.frontend.slot.learnerDashboard.courseCardBanner.v1`

### Slot Props

* `cardId`

## Description

This slot is used for replacing or adding content for the `CourseBanner` component. This banner is rendered as a child of the `CourseCard`.

The default CourseBanner looks like this when audit access has expired for the course:
![Screenshot of the default CourseBanner when audit access has expired](./images/course_banner_slot_default.png)

## Example

The following configuration will render a custom implementation of a CourseBanner under every `CourseCard`.

![Screenshot of custom banner added under CourseCard](./images/course_banner_slot_default.png)

```js
import { WidgetOperationTypes } from '@openedx/frontend-base';
import { Alert } from '@openedx/paragon';

const myComponent = ({ cardId }) => (
  <Alert variant="info" className="mb-0">
    Course banner for course with {cardId}
  </Alert>
)

const config = {
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.courseCardBanner.v1',
      id: 'my.widget',
      op: WidgetOperationTypes.REPLACE,
      component: myComponent
    },
  ]
}

export default config;
```
