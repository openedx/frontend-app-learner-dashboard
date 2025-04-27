# Course Card Action Slot

### Slot ID: `org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1`

### Slot Props

* `cardId`

## Description

This slot is used for adding content in the Action buttons section of each Course Card.

## Example

The following configuration will render the `cardId` of the course as `<p>` elements in a `<div>`.

![Screenshot of Content added after the Sequence Container](./images/post_course_card_action.png)

```js
import { WidgetOperationTypes } from '@openedx/frontend-base';
import ActionButton from 'containers/CourseCard/components/CourseCardActions/ActionButton';

const myComponent = ({ cardId }) => (
  <ActionButton variant="outline-primary">
    📚: {cardId}
  </ActionButton>
)

const mySlotId = 'org.openedx.frontend.slot.learnerDashboard.courseCardAction.v1';

const config = {
  slots: [
    {
      slotId: mySlotId,
      id: 'my.first.widget',
      op: WidgetOperationTypes.APPEND,
      element: (
        <ActionButton variant="outline-primary">
          Custom Button
        </ActionButton>
      )
    },
    {
      slotId: mySlotId,
      id: 'my.second.widget',
      op: WidgetOperationTypes.APPEND,
      component: myComponent
    },
  ]
}

export default config;
```
