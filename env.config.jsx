import { PLUGIN_OPERATIONS } from "@openedx/frontend-plugin-framework";

const TestWrapper = ({ component }) => (
  <div>
    {component}
  </div>
);

const config = {
  pluginSlots: {
    test_course_list: {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Wrap,
          widgetId: 'default_contents',
          wrapper: TestWrapper,
        },
      ],
    },
  },
};

export default config;
