import { shallow } from 'enzyme';
import { Col, Row } from '@edx/paragon';

import CourseList from 'containers/CourseList';
import WidgetSidebar from 'containers/WidgetSidebar';

import hooks from './hooks';
import LoadedView, { columnConfig } from './LoadedView';

jest.mock('./hooks', () => ({
  useIsDashboardCollapsed: jest.fn(() => true),
}));

describe('LoadedView', () => {
  const testColumns = () => {
    it('loads courseList and sidebar column layout', () => {
      const columns = shallow(<LoadedView />).find(Row).find(Col);
      Object.keys(columnConfig.courseList).forEach(size => {
        expect(columns.at(0).props()[size]).toEqual(columnConfig.courseList[size]);
      });
      Object.keys(columnConfig.sidebar).forEach(size => {
        expect(columns.at(1).props()[size]).toEqual(columnConfig.sidebar[size]);
      });
    });
    it('displays CourseList in first column', () => {
      const columns = shallow(<LoadedView />).find(Row).find(Col);
      expect(columns.at(0).find(CourseList).length).toEqual(1);
    });
    it('displays WidgetSidebar in second column', () => {
      const columns = shallow(<LoadedView />).find(Row).find(Col);
      expect(columns.at(1).find(WidgetSidebar).length).toEqual(1);
    });
  };
  const testSnapshot = () => {
    test('snapshot', () => {
      expect(shallow(<LoadedView />)).toMatchSnapshot();
    });
  };
  describe('collapsed', () => {
    testColumns();
    testSnapshot();
    it('does not show spacer component above widget sidebar', () => {
      const columns = shallow(<LoadedView />).find(Col);
      expect(columns.at(1).find('h2').length).toEqual(0);
    });
  });

  describe('not collapsed', () => {
    beforeEach(() => { hooks.useIsDashboardCollapsed.mockReturnValueOnce(false); });
    testColumns();
    testSnapshot();
    it('shows a blank (nbsp) h2 spacer component above widget sidebar', () => {
      const columns = shallow(<LoadedView />).find(Col);
      // nonbreaking space equivalent
      expect(columns.at(1).find('h2').text()).toEqual('\xA0');
    });
  });
});
