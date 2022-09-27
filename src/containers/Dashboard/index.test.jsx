import { shallow } from 'enzyme';

import { hooks } from 'data/redux';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';
import EmptyCourse from 'containers/EmptyCourse';
import SelectSessionModal from 'containers/SelectSessionModal';
import EnterpriseDashboardModal from 'containers/EnterpriseDashboardModal';

import Dashboard from '.';

jest.mock('data/redux', () => ({
  thunkActions: {
    app: {
      initialize: jest.fn(),
    },
  },
  hooks: {
    useHasCourses: jest.fn(),
    useHasAvailableDashboards: jest.fn(),
    useShowSelectSessionModal: jest.fn(),
  },
}));

jest.mock('containers/CourseList', () => 'CourseList');
jest.mock('containers/WidgetSidebar', () => 'WidgetSidebar');
jest.mock('containers/EmptyCourse', () => 'EmptyCourse');
jest.mock('containers/SelectSessionModal', () => 'SelectSessionModal');
jest.mock('containers/EnterpriseDashboardModal', () => 'EnterpriseDashboardModal');

describe('Dashboard', () => {
  const createWrapper = ({
    hasCourses,
    hasAvailableDashboards,
    showSelectSessionModal,
  }) => {
    hooks.useHasCourses.mockReturnValueOnce(hasCourses);
    hooks.useHasAvailableDashboards.mockReturnValueOnce(hasAvailableDashboards);
    hooks.useShowSelectSessionModal.mockReturnValueOnce(showSelectSessionModal);
    return shallow(<Dashboard />);
  };

  describe('snapshots', () => {
    test('there are courses', () => {
      const wrapper = createWrapper({
        hasCourses: true,
        hasAvailableDashboards: false,
        showSelectSessionModal: false,
      });
      expect(wrapper).toMatchSnapshot();
    });

    test('there are no courses', () => {
      const wrapper = createWrapper({
        hasCourses: false,
        hasAvailableDashboards: false,
        showSelectSessionModal: false,
      });
      expect(wrapper).toMatchSnapshot();
    });

    test('there are available dashboards', () => {
      const wrapper = createWrapper({
        hasCourses: false,
        hasAvailableDashboards: true,
        showSelectSessionModal: false,
      });
      expect(wrapper).toMatchSnapshot();
    });

    test('there is a select session modal', () => {
      const wrapper = createWrapper({
        hasCourses: false,
        hasAvailableDashboards: false,
        showSelectSessionModal: true,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    it('initializes the app without courses', () => {
      const wrapper = createWrapper({
        hasCourses: false,
        hasAvailableDashboards: false,
        showSelectSessionModal: false,
      });
      expect(wrapper.find(EmptyCourse).length).toEqual(1);
      expect(wrapper.find(CourseList).length).toEqual(0);
      expect(wrapper.find(WidgetSidebar).length).toEqual(0);
      expect(wrapper.find(SelectSessionModal).length).toEqual(0);
      expect(wrapper.find(EnterpriseDashboardModal).length).toEqual(0);
    });
    it('initializes the app with courses, dashboard and select', () => {
      const wrapper = createWrapper({
        hasCourses: true,
        hasAvailableDashboards: true,
        showSelectSessionModal: true,
      });
      expect(wrapper.find(EmptyCourse).length).toEqual(0);
      expect(wrapper.find(CourseList).length).toEqual(1);
      expect(wrapper.find(WidgetSidebar).length).toEqual(1);
      expect(wrapper.find(SelectSessionModal).length).toEqual(1);
      expect(wrapper.find(EnterpriseDashboardModal).length).toEqual(1);
    });
    it('initializes the app with courses, dashboard and no select', () => {
      const wrapper = createWrapper({
        hasCourses: true,
        hasAvailableDashboards: true,
        showSelectSessionModal: false,
      });
      expect(wrapper.find(EmptyCourse).length).toEqual(0);
      expect(wrapper.find(CourseList).length).toEqual(1);
      expect(wrapper.find(WidgetSidebar).length).toEqual(1);
      expect(wrapper.find(SelectSessionModal).length).toEqual(0);
      expect(wrapper.find(EnterpriseDashboardModal).length).toEqual(1);
    });
  });
});
