import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import hooks from './hooks';
import DashboardLayout from './DashboardLayout';

jest.mock('./hooks', () => ({
  useDashboardLayoutData: jest.fn(),
}));

jest.mock('@openedx/frontend-plugin-framework', () => ({
  PluginSlot: 'PluginSlot',
}));

const hookProps = {
  isCollapsed: true,
  sidebarShowing: false,
  setSidebarShowing: jest.fn().mockName('hooks.setSidebarShowing'),
};
hooks.useDashboardLayoutData.mockReturnValue(hookProps);

const children = <div>test children</div>;

describe('DashboardLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<IntlProvider locale="en"><DashboardLayout>{children}</DashboardLayout></IntlProvider>);
  });

  const testColumns = () => {
    it('loads courseList and sidebar column layout with corresponding children', () => {
      const courseChildren = screen.getByText('test children');
      const courseListCol = courseChildren.parentElement;
      const sidebarCol = courseListCol.nextSibling;
      expect(courseListCol).toHaveClass('course-list-column');
      expect(sidebarCol).toHaveClass('sidebar-column');
    });
    it('displays children in first column', () => {
      const courseChildren = screen.getByText('test children');
      const courseListCol = courseChildren.parentElement;
      expect(courseChildren).toBeInTheDocument();
      expect(courseListCol).toHaveClass('course-list-column');
    });
    it('displays WidgetSidebarSlot in second column', () => {
      const courseListCol = screen.getByText('test children').parentElement;
      const sidebarCol = courseListCol.nextSibling;
      expect(sidebarCol).toHaveClass('sidebar-column');
      expect(sidebarCol.children[0]).toHaveAttribute('id', 'org.openedx.frontend.learner_dashboard.widget_sidebar.v1');
    });
  };
  const testSidebarLayout = ({ isCollapsed }) => {
    it('displays withSidebar width for course list column', () => {
      const courseListCol = screen.getByText('test children').parentElement;
      expect(courseListCol).toHaveClass('col-xl-8');
      const sidebarCol = courseListCol.nextSibling;
      expect(sidebarCol).toHaveClass('sidebar-column', !isCollapsed && 'not-collapsed');
    });
  };
  const testNoSidebarLayout = ({ isCollapsed }) => {
    it('displays noSidebar width for course list column', () => {
      const courseListCol = screen.getByText('test children').parentElement;
      expect(courseListCol).toHaveClass('col-xl-12');
      const sidebarCol = courseListCol.nextSibling;
      expect(sidebarCol).toHaveClass('sidebar-column', !isCollapsed && 'not-collapsed');
    });
  };
  describe('collapsed', () => {
    describe('sidebar showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({ ...hookProps, sidebarShowing: true });
      });
      testColumns();
      testSidebarLayout({ isCollapsed: true });
    });
    describe('sidebar not showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({ ...hookProps });
      });
      testColumns();
      testNoSidebarLayout({ isCollapsed: true });
    });
  });

  describe('not collapsed', () => {
    describe('sidebar showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({
          ...hookProps,
          isCollapsed: false,
          sidebarShowing: true,
        });
      });
      testColumns();
      testSidebarLayout({ isCollapsed: false });
    });
    describe('sidebar not showing', () => {
      beforeEach(() => {
        hooks.useDashboardLayoutData.mockReturnValueOnce({ ...hookProps, isCollapsed: false });
      });
      testColumns();
      testNoSidebarLayout({ isCollapsed: false });
    });
  });
});
