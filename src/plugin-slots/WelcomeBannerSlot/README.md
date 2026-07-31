# Welcome Banner Slot

### Slot ID: `org.openedx.frontend.learner_dashboard.welcome_banner.v1`
### Props:
* `username`

## Description

This slot renders directly below the dashboard header and above the courses panel. It shows a "Welcome back, {username}!" greeting along with the learner's avatar (their uploaded profile image, or a placeholder avatar when none has been uploaded).

The slot - and everything inside it - is only rendered for logged in members. Logged out/anonymous visitors never see this slot, since `frontend-app-learner-dashboard` requires an authenticated user to view the page at all.

## Example

The following `env.config.jsx` will replace the default welcome banner with a custom implementation.

```js
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.learner_dashboard.welcome_banner.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'org.openedx.frontend.learner_dashboard.welcome_banner.v1',
            type: DIRECT_PLUGIN,
            priority: 60,
            RenderWidget: ({ username }) => (
              <div className="p-3">
                Hey {username}, glad to see you!
              </div>
            ),
          },
        },
      ],
    },
  },
}

export default config;
```
