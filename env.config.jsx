// import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
// import { reduxHooks } from 'hooks';
// import { SortKeys } from 'data/constants/app';
// import CourseList from './src/containers/Coursespanel/CourseList';
// import UpgradeButton from './src/containers/CourseCard/components/CourseCardActions/UpgradeButton';

// How to call React hooks in a plugin and pass to component as props

// const NotStartedList = () => {
//   const { visibleList } = reduxHooks.useCurrentCourseList({
//     sortBy: SortKeys.enrolled,
//     filters: ['notStarted'],
//     pageSize: 25,
//   });
//   return (
//     <>
//       Not Started
//       <CourseList
//         showFilters={false}
//         numPages={1}
//         setPageNumber={() => {}}
//         filterOptions={{
//           sortBy: 'enrolled',
//           setSortBy: () => {},
//           filters: ['notStarted'],
//           handleRemoveFilter: () => {},
//         }}
//         visibleList={visibleList}
//       />
//     </>
//   );
// };

// const TestWrapperNotStarted = ({ component }) => {
//   const setFilters = reduxHooks.useSetFilters();
//   useEffect(() => {
//     setFilters(['notStarted']);
//   }, []);

//   return (
//     <div>
//       {component}
//     </div>
//   );
// };

// TODO: look into why we can't render the wrapped in React form <CourseList />

const config = {
  pluginSlots: {
    upgrade_button: {
      keepDefault: true,
      plugins: [
        // {
        //   op: PLUGIN_OPERATIONS.Insert,
        //   widget: {
        //     id: 'upgrade-button-plugin',
        //     type: DIRECT_PLUGIN,
        //     priority: 65,
        //     RenderWidget: UpgradeButton,
        //   },
        // },
      ],
    },
    test_course_list: {
      keepDefault: true,
      plugins: [
        // {
        //   op: PLUGIN_OPERATIONS.Insert,
        //   widget: {
        //     id: 'course_list_not_started',
        //     type: DIRECT_PLUGIN,
        //     priority: 65,
        //     RenderWidget: NotStartedList,
        //   },
        // },
        // {
        //   op: PLUGIN_OPERATIONS.Insert,
        //   widget: {
        //     id: 'course_list_in_progress',
        //     type: DIRECT_PLUGIN,
        //     priority: 60,
        //     RenderWidget: UpgradedList,
        //   },
        // },
        // {
        //   op: PLUGIN_OPERATIONS.Wrap,
        //   widgetId: 'default_contents',
        //   wrapper: TestWrapperInProgress,
        // },
        // {
        //   op: PLUGIN_OPERATIONS.Wrap,
        //   widgetId: 'course_list_not_started',
        //   wrapper: TestWrapperNotStarted,
        // },
      ],
    },
  },
};

export default config;
