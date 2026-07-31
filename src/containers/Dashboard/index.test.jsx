import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useSelectSessionModal } from 'data/context';
import { useInitializeLearnerHome } from 'data/hooks';

import hooks from './hooks';
import Dashboard from '.';

jest.mock('data/context', () => ({
  useSelectSessionModal: jest.fn(),
}));

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

jest.mock('./hooks', () => ({
  useInitializeDashboard: jest.fn(),
  useDashboardMessages: jest.fn(),
}));

jest.mock('plugin-slots/DashboardModalSlot', () => jest.fn(() => <div>DashboardModalSlot</div>));
jest.mock('containers/CoursesPanel', () => jest.fn(() => <div>AssignedCoursesSection</div>));
jest.mock('containers/OverdueCoursesSection', () => jest.fn(() => <div>OverdueCoursesSection</div>));
jest.mock('./LoadingView', () => jest.fn(() => <div>LoadingView</div>));
jest.mock('containers/SelectSessionModal', () => jest.fn(() => <div>SelectSessionModal</div>));
jest.mock('./DashboardLayout', () => jest.fn(({ children }) => (
  <div>
    DashboardLayout
    {children}
  </div>
)));

const pageTitle = 'test-page-title';

describe('Dashboard', () => {
  const createWrapper = (props = {}) => {
    const {
      hasCourses = true,
      initIsPending = true,
      showSelectSessionModal = true,
    } = props;
    hooks.useDashboardMessages.mockReturnValue({ pageTitle });
    const dataMocked = { data: hasCourses ? { courses: [1, 2] } : { courses: [] }, isPending: initIsPending };
    useInitializeLearnerHome.mockReturnValue(dataMocked);
    useSelectSessionModal.mockReturnValue({ selectSessionModal: showSelectSessionModal ? { cardId: 1 } : null });
    return render(<IntlProvider locale="en"><Dashboard /></IntlProvider>);
  };

  describe('render', () => {
    it('page title is displayed in sr-only h1 tag', () => {
      createWrapper();
      const heading = screen.getByText(pageTitle);
      expect(heading).toHaveClass('sr-only');
    });
    describe('initIsPending false', () => {
      it('should render DashboardModalSlot', () => {
        createWrapper({ initIsPending: false });
        const dashboardModalSlot = screen.getByText('DashboardModalSlot');
        expect(dashboardModalSlot).toBeInTheDocument();
      });
      it('should render SelectSessionModal', () => {
        createWrapper({ initIsPending: false });
        const selectSessionModal = screen.getByText('SelectSessionModal');
        expect(selectSessionModal).toBeInTheDocument();
      });
    });
    describe('courses still loading', () => {
      it('should render LoadingView', () => {
        createWrapper({ hasCourses: false });
        const loadingView = screen.getByText('LoadingView');
        expect(loadingView).toBeInTheDocument();
      });
    });
    describe('courses loaded', () => {
      it('should show overdue section and dashboard layout', () => {
        createWrapper({ initIsPending: false });
        expect(screen.getByText('OverdueCoursesSection')).toBeInTheDocument();
        expect(screen.getByText('DashboardLayout')).toBeInTheDocument();
      });
    });
  });
});
