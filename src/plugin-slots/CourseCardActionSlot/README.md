# Course Card Action Slot

### Slot ID: `course_card_action_slot`
### Props:
* `cardId`

## Description

This slot is used for adding content in the Action buttons section of each Course Card.

## Example

The following `env.config.jsx` will render the `cardId` of the course as `<p>` elements in a `<div>`.

![Screenshot of Content added after the Sequence Container](./images/post_course_card_action.png)

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    course_card_action_slot: {
      keepDefault: false,
      plugins: [
        {
          // Insert custom content after course card buttons
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_course_card_action',
            type: DIRECT_PLUGIN,
            RenderWidget: ({cardId}) => (
              <div>
                <p>📚: {cardId}</p>
              </div>
            ),
          },
        },
      ]
    }
  },
}

export default config;
```