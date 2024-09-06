import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifyLogoHref = ( widget ) => {
  widget.content.href = "https://openedx.org/";
  return widget;
};

const config = {
  pluginSlots: {
    logo_slot: {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyLogoHref,
        },
      ]
    },
  },
}

export default config;
