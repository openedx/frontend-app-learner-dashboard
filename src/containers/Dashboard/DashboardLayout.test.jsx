import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import { Col, Row } from '@openedx/paragon';

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

const children = 'test-children';

let el;
describe('DashboardLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    el = shallow(<DashboardLayout>{children}</DashboardLayout>);
  });

  const testColumns = () => {
    it('loads courseList and sidebar column layout', () => {
      const columns = el.instance.findByType(Row)[0].findByType(Col);
      Object.keys(columnConfig.sidebar).forEach(size => {
        expect(columns[1].props[size]).toEqual(columnConfig.sidebar[size]);
      });
    });
    it('displays children in first column', () => {
      const columns = el.instance.findByType(Row)[0].findByType(Col);
      expect(columns[0].children).not.toHaveLength(0);
    });
    it('displays WidgetSidebarSlot in second column', () => {
      const columns = el.instance.findByType(Row)[0].findByType(Col);
      expect(columns[1].findByType('WidgetSidebarSlot')).toHaveLength(1);
    });
  };
  const testSidebarLayout = () => {
    it('displays withSidebar width for course list column', () => {
      const columns = el.instance.findByType(Row)[0].findByType(Col);
      Object.keys(columnConfig.courseList.withSidebar).forEach(size => {
        expect(columns[0].props[size]).toEqual(columnConfig.courseList.withSidebar[size]);
      });
    });
  };
  const testNoSidebarLayout = () => {
    it('displays noSidebar width for course list column', () => {
      const columns = el.instance.findByType(Row)[0].findByType(Col);
      Object.keys(columnConfig.courseList.noSidebar).forEach(size => {
        expect(columns[0].props[size]).toEqual(columnConfig.courseList.noSidebar[size]);
      });
    });
  };
  const testSnapshot = () => {
    test('snapshot', () => {
      expect(el.snapshot).toMatchSnapshot();
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
      const columns = el.instance.findByType(Col);
      expect(columns[1].findByType('h2').length).toEqual(0);
    });
  });

  describe('not collapsed', () => {
    const testWidgetSpacing = () => {
      it('shows not-collapsed class on widget sidebar', () => {
        const columns = el.instance.findByType(Col);
        expect(columns[1].props.className).toContain('not-collapsed');
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
