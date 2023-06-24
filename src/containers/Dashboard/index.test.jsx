import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';

import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';
import SelectSessionModal from 'containers/SelectSessionModal';
import CourseList from 'containers/CourseList';

import LoadedWidgetSidebar from 'containers/WidgetContainers/LoadedSidebar';
import NoCoursesWidgetSidebar from 'containers/WidgetContainers/NoCoursesSidebar';

import DashboardLayout from './DashboardLayout';
import LoadingView from './LoadingView';
import hooks from './hooks';
import Dashboard from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    useHasCourses: jest.fn(),
    useHasAvailableDashboards: jest.fn(),
    useShowSelectSessionModal: jest.fn(),
    useRequestIsPending: jest.fn(),
  },
}));

jest.mock('containers/EnterpriseDashboardModal', () => 'EnterpriseDashboardModal');
jest.mock('containers/CourseList', () => 'CourseList');
jest.mock('containers/WidgetContainers/LoadedSidebar', () => 'LoadedWidgetSidebar');
jest.mock('containers/WidgetContainers/NoCoursesSidebar', () => 'NoCoursesWidgetSidebar');
jest.mock('./LoadingView', () => 'LoadingView');
jest.mock('./DashboardLayout', () => 'DashboardLayout');

jest.mock('./hooks', () => ({
  useInitializeDashboard: jest.fn(),
  useDashboardMessages: jest.fn(),
}));

const pageTitle = 'test-page-title';

describe('Dashboard', () => {
  beforeEach(() => {
    hooks.useDashboardMessages.mockReturnValue({ pageTitle });
  });
  const createWrapper = ({
    hasCourses,
    hasAvailableDashboards,
    initIsPending,
    showSelectSessionModal,
  }) => {
    reduxHooks.useHasCourses.mockReturnValueOnce(hasCourses);
    reduxHooks.useHasAvailableDashboards.mockReturnValueOnce(hasAvailableDashboards);
    reduxHooks.useRequestIsPending.mockReturnValueOnce(initIsPending);
    reduxHooks.useShowSelectSessionModal.mockReturnValueOnce(showSelectSessionModal);
    return shallow(<Dashboard />);
  };

  let wrapper;
  describe('snapshots', () => {
    const testTitle = () => {
      test('page title is displayed in sr-only h1 tag', () => {
        const heading = wrapper.find('h1');
        expect(heading.props().className).toEqual('sr-only');
        expect(heading.text()).toEqual(pageTitle);
      });
    };
    const testSnapshot = () => {
      test('snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    };
    const testContent = (el) => {
      expect(wrapper.find('#dashboard-content').children()).toMatchObject(shallow(el));
    };

    const renderString = (show) => (show ? 'renders' : 'does not render');
    const testView = ({
      props,
      content: [contentName, contentEl],
      showEnterpriseModal,
      showSelectSessionModal,
    }) => {
      beforeEach(() => { wrapper = createWrapper(props); });
      testTitle();
      testSnapshot();
      it(`renders ${contentName}`, () => {
        testContent(contentEl);
      });
      it(`${renderString(showEnterpriseModal)} dashbaord modal`, () => {
        expect(wrapper.find(EnterpriseDashboardModal).length)
          .toEqual(showEnterpriseModal ? 1 : 0);
      });
      it(`${renderString(showSelectSessionModal)} select session modal`, () => {
        expect(wrapper.find(SelectSessionModal).length).toEqual(showSelectSessionModal ? 1 : 0);
      });
    };
    describe('courses still loading', () => {
      testView({
        props: {
          hasCourses: false,
          hasAvailableDashboards: false,
          initIsPending: true,
          showSelectSessionModal: false,
        },
        content: ['LoadingView', <LoadingView />],
        showEnterpriseModal: false,
        showSelectSessionModal: false,
      });
    });

    describe('courses loaded, show select session modal, no available dashboards', () => {
      testView({
        props: {
          hasCourses: true,
          hasAvailableDashboards: false,
          initIsPending: false,
          showSelectSessionModal: true,
        },
        content: ['LoadedView', (
          <DashboardLayout sidebar={LoadedWidgetSidebar}><CourseList /></DashboardLayout>
        )],
        showEnterpriseModal: false,
        showSelectSessionModal: true,
      });
    });

    describe('there are no courses, there ARE available dashboards', () => {
      testView({
        props: {
          hasCourses: false,
          hasAvailableDashboards: true,
          initIsPending: false,
          showSelectSessionModal: false,
        },
        content: ['Dashboard layout with no courses sidebar and content', (
          <DashboardLayout sidebar={NoCoursesWidgetSidebar}><CourseList /></DashboardLayout>
        )],
        showEnterpriseModal: true,
        showSelectSessionModal: false,
      });
    });
  });
});
