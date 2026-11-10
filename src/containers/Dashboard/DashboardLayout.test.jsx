import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router';

import hooks from './hooks';
import DashboardLayout from './DashboardLayout';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn().mockReturnValue({
    data: {
      platformSettings: {
        courseSearchUrl: '/courses',
      },
    },
  }),
}));

jest.mock('./hooks', () => ({
  useDashboardLayoutData: jest.fn(),
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
    render(<MemoryRouter><IntlProvider locale="en"><DashboardLayout>{children}</DashboardLayout></IntlProvider></MemoryRouter>);
  });

  const testColumns = () => {
    it('loads the main and sidebar column layout with corresponding children', () => {
      const mainChildren = screen.getByText('test children');
      const mainCol = mainChildren.parentElement;
      const sidebarCol = mainCol.nextSibling;
      expect(mainCol).toHaveClass('main-column');
      expect(sidebarCol).toHaveClass('sidebar-column');
    });
    it('displays children in first column', () => {
      const mainChildren = screen.getByText('test children');
      const mainCol = mainChildren.parentElement;
      expect(mainChildren).toBeInTheDocument();
      expect(mainCol).toHaveClass('main-column');
    });
    it('displays WidgetSidebarSlot in second column', () => {
      const mainCol = screen.getByText('test children').parentElement;
      const sidebarCol = mainCol.nextSibling;
      expect(sidebarCol).toHaveClass('sidebar-column');
      // Slot renders its default children directly (no wrapper with slot id)
      expect(sidebarCol.children.length).toBeGreaterThan(0);
    });
  };
  const testSidebarLayout = ({ isCollapsed }) => {
    it('displays withSidebar width for the main column', () => {
      const mainCol = screen.getByText('test children').parentElement;
      expect(mainCol).toHaveClass('col-xl-8');
      const sidebarCol = mainCol.nextSibling;
      expect(sidebarCol).toHaveClass('sidebar-column', !isCollapsed && 'not-collapsed');
    });
  };
  const testNoSidebarLayout = ({ isCollapsed }) => {
    it('displays noSidebar width for the main column', () => {
      const mainCol = screen.getByText('test children').parentElement;
      expect(mainCol).toHaveClass('col-xl-12');
      const sidebarCol = mainCol.nextSibling;
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
