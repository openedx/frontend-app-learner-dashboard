# Widget Sidebar Slot

### Slot ID: `org.openedx.frontend.slot.learnerDashboard.widgetSidebar.v1`

## Description

This slot is used for adding content to the right-hand sidebar.

## Example

The slot renders the "Looking for a Challenge" widget by default.

![Screenshot of the widget sidebar](./images/widget_sidebar_slot.png)

Setting configuration to the following will replace the default content with a custom sidebar component.

![Screenshot of a custom call-to-action in the sidebar](./images/readme_custom_sidebar.png)

```js
import { WidgetOperationTypes } from '@openedx/frontend-base';

const myComponent = () => (
  <div>
    <h3>
      Sidebar Menu
    </h3>
    <p>
      sidebar item #1
    </p>
    <p>
      sidebar item #2
    </p>
    <p>
      sidebar item #3
    </p>
  </div>
)

const config = {
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.widgetSidebar.v1',
      id: 'my.widget',
      op: WidgetOperationTypes.REPLACE,
      component: myComponent
    },
  ]
}

export default config;
```
