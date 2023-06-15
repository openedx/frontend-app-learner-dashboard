import { shallow } from 'enzyme';
import { Col, Row } from '@edx/paragon';

import { useShowRecommendationsFooter } from 'widgets/ProductRecommendations/hooks';
import hooks from './hooks';
import DashboardLayout, { columnConfig } from './DashboardLayout';

jest.mock('./hooks', () => ({
  useIsDashboardCollapsed: jest.fn(() => true),
}));

jest.mock('widgets/ProductRecommendations/hooks', () => ({
  useShowRecommendationsFooter: jest.fn(),
}));

describe('DashboardLayout', () => {
  const children = 'test-children';
  const props = {
    sidebar: 'test-sidebar-content',
  };
  const render = () => shallow(<DashboardLayout sidebar={props.sidebar}>{children}</DashboardLayout>);
  const testColumns = () => {
    it('loads stretched courseList column layout when footer is shown', () => {
      useShowRecommendationsFooter.mockReturnValueOnce(true);
      const columns = render().find(Row).find(Col);
      Object.keys(columnConfig.courseList(true)).forEach(size => {
        expect(columns.at(0).props()[size]).toEqual(columnConfig.courseList(true)[size]);
      });
    });
    it('loads default courseList column layout when footer is hidden', () => {
      useShowRecommendationsFooter.mockReturnValueOnce(false);
      const columns = render().find(Row).find(Col);
      Object.keys(columnConfig.courseList(false)).forEach(size => {
        expect(columns.at(0).props()[size]).toEqual(columnConfig.courseList(false)[size]);
      });
    });
    it('loads sidebar column layout', () => {
      const columns = render().find(Row).find(Col);
      Object.keys(columnConfig.sidebar).forEach(size => {
        expect(columns.at(1).props()[size]).toEqual(columnConfig.sidebar[size]);
      });
    });
    it('displays children in first column', () => {
      const columns = render().find(Row).find(Col);
      expect(columns.at(0).contains(children)).toEqual(true);
    });
    it('displays sidebar prop in second column', () => {
      const columns = render().find(Row).find(Col);
      expect(columns.at(1).contains(props.sidebar)).toEqual(true);
    });
    it('displays a footer in the second row', () => {
      const columns = render().find(Row).at(1).find(Col);
      expect(columns.at(0).find('WidgetFooter').exists()).toBeTruthy();
    });
  };
  const testSnapshot = () => {
    test('snapshot', () => {
      expect(render()).toMatchSnapshot();
    });
  };
  describe('collapsed', () => {
    testColumns();
    testSnapshot();
    it('does not show spacer component above widget sidebar', () => {
      const columns = render().find(Col);
      expect(columns.at(1).find('h2').length).toEqual(0);
    });
  });

  describe('not collapsed', () => {
    beforeEach(() => { hooks.useIsDashboardCollapsed.mockReturnValueOnce(false); });
    testColumns();
    testSnapshot();
    it('shows a blank (nbsp) h2 spacer component above widget sidebar', () => {
      const columns = render().find(Col);
      // nonbreaking space equivalent
      expect(columns.at(1).find('h2').text()).toEqual('\xA0');
    });
  });
});
