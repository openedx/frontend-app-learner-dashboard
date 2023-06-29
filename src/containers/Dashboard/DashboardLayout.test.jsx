import React from 'react';
import { shallow } from 'enzyme';
import { Col, Row } from '@edx/paragon';

import WidgetFooter from 'containers/WidgetContainers/WidgetFooter';
import hooks from './hooks';
import DashboardLayout, { columnConfig } from './DashboardLayout';

jest.mock('./hooks', () => ({
  useDashboardLayoutData: jest.fn(),
}));

const hookProps = {
  isCollapsed: true,
  sidebarShowing: false,
  setSidebarShowing: jest.fn().mockName('hooks.setSidebarShowing'),
};
hooks.useDashboardLayoutData.mockReturnValue(hookProps);

const props = {
  sidebar: jest.fn(() => 'test-sidebar-content'),
};

const children = 'test-children';

let el;
describe('DashboardLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    el = shallow(<DashboardLayout {...props}>{children}</DashboardLayout>);
  });

  const testColumns = () => {
    it('loads courseList and sidebar column layout', () => {
      const columns = el.find(Row).find(Col);
      Object.keys(columnConfig.sidebar).forEach(size => {
        expect(columns.at(1).props()[size]).toEqual(columnConfig.sidebar[size]);
      });
    });
    it('displays children in first column', () => {
      const columns = el.find(Row).find(Col);
      expect(columns.at(0).contains(children)).toEqual(true);
    });
    it('displays sidebar prop in second column', () => {
      const columns = el.find(Row).find(Col);
      expect(columns.at(1).find(props.sidebar)).toHaveLength(1);
    });
    it('displays a footer in the second row', () => {
      const columns = el.find(Row).at(1).find(Col);
      expect(columns.at(0).containsMatchingElement(<WidgetFooter />)).toBeTruthy();
    });
  };
  const testSidebarLayout = () => {
    it('displays widthSidebar width for course list column', () => {
      const columns = el.find(Row).find(Col);
      Object.keys(columnConfig.courseList.withSidebar).forEach(size => {
        expect(columns.at(0).props()[size]).toEqual(columnConfig.courseList.withSidebar[size]);
      });
    });
  };
  const testNoSidebarLayout = () => {
    it('displays noSidebar width for course list column', () => {
      const columns = el.find(Row).find(Col);
      Object.keys(columnConfig.courseList.noSidebar).forEach(size => {
        expect(columns.at(0).props()[size]).toEqual(columnConfig.courseList.noSidebar[size]);
      });
    });
  };
  const testSnapshot = () => {
    test('snapshot', () => {
      expect(el).toMatchSnapshot();
    });
  };
  describe('collapsed', () => {
    describe('sidebar showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({ ...hookProps, sidebarShowing: true });
      });
      testColumns();
      testSnapshot();
      testSidebarLayout();
    });
    describe('sidebar not showing', () => {
      testColumns();
      testSnapshot();
      testNoSidebarLayout();
    });
    it('does not show spacer component above widget sidebar', () => {
      const columns = el.find(Col);
      expect(columns.at(1).find('h2').length).toEqual(0);
    });
  });

  describe('not collapsed', () => {
    const testWidgetSpacing = () => {
      it('shows a blank (nbsp) h2 spacer component above widget sidebar', () => {
        const columns = el.find(Col);
        // nonbreaking space equivalent
        expect(columns.at(1).find('h2').text()).toEqual('\xA0');
      });
    };
    describe('sidebar showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({
          ...hookProps,
          isCollapsed: false,
          sidebarShowing: true,
        });
      });
      testColumns();
      testSnapshot();
      testSidebarLayout();
      testWidgetSpacing();
    });
    describe('sidebar not showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({ ...hookProps, isCollapsed: false });
      });
      testColumns();
      testSnapshot();
      testNoSidebarLayout();
      testWidgetSpacing();
    });
  });
});
