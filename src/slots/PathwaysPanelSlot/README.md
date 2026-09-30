# Pathways Panel Slot

### Slot ID: `org.openedx.frontend.slot.learnerDashboard.pathwaysPanel.v1`

### Slot Props

* `pathwaysByCategory`

## Description

This slot is used for replacing or adding content around the `PathwaysPanel` component, which lists the learner's pathways grouped by category.

## Example

The space will show the `PathwaysPanel` component by default.

Using the following configuration will replace the slot's default content with a list of pathway titles.

```js
import { WidgetOperationTypes } from '@openedx/frontend-base';

const myComponent = ({ pathwaysByCategory }) => (
  <div>
    {pathwaysByCategory.map(({ categoryLabelPlural, pathways }) => (
      <div key={categoryLabelPlural}>
        <h3>{categoryLabelPlural}</h3>
        {pathways.map(({ pathway }) => (
          <p key={pathway.id}>{pathway.content.displayName}</p>
        ))}
      </div>
    ))}
  </div>
);

const config = {
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.pathwaysPanel.v1',
      id: 'my.widget',
      op: WidgetOperationTypes.REPLACE,
      relatedId: 'defaultContent',
      component: myComponent,
    },
  ],
};

export default config;
```
