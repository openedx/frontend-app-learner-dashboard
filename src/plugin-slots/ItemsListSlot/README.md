# Items List Slot

### Slot ID: `org.openedx.frontend.learner_dashboard.items_list.v1`

### Slot ID Aliases
* `items_list_slot`

## Plugin Props

* itemsListData

## Description

This slot is used for replacing or adding content around the `ItemsList` component. It renders a combined, paginated list of the learner's enrolled courses and pathways, and is only used when the pathways pilot UI is enabled (`ENABLE_PATHWAY_PILOT_UI`). When that flag is disabled, the [`CourseListSlot`](../CourseListSlot/) is rendered instead.

This slot is the replacement for `CourseListSlot`. Once pathways become the default experience, `CourseListSlot` will be removed and `ItemsListSlot` will become the only slot used to render the list. If you maintain a plugin against `CourseListSlot`, plan to migrate it to `ItemsListSlot`.

The `itemsListData` prop's `visibleList` entries are a flattened, common shape shared by both courses and pathways:

```js
{
  cardId: 'card-0',
  lastEnrolled: new Date('2024-01-01'),
  title: 'Course or Pathway title',
  itemType: 'course', // or 'pathway'
}
```

Note that this shape does **not** include the full `course`/`pathway` data objects. If you need the full record for an item, look it up by `cardId` from your own data source.

## Example

Setting the MFE's `env.config.jsx` to the following will replace the default experience with a list of item titles.

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.learner_dashboard.items_list.v1': {
      // Hide the default ItemsList component
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_items_list',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: ({ itemsListData }) => {
              // Extract the "visibleList"
              const items = itemsListData.visibleList;
              // Render a list of item titles
              return (
                <div>
                  {items.map(item => (
                    <p key={item.cardId}>
                      {item.title} ({item.itemType})
                    </p>
                  ))}
                </div>
              )
            },
          },
        },
      ],
    },
  },
}

export default config;
```
