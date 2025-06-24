import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import hooks from './hooks';
import Dashboard from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    useHasCourses: jest.fn(),
    useShowSelectSessionModal: jest.fn(),
    useRequestIsPending: jest.fn(),
  },
}));

jest.mock('./hooks', () => ({
  useInitializeDashboard: jest.fn(),
  useDashboardMessages: jest.fn(),
}));

jest.mock('plugin-slots/DashboardModalSlot', () => jest.fn(() => <div>DashboardModalSlot</div>));
jest.mock('containers/CoursesPanel', () => jest.fn(() => <div>CoursesPanel</div>));
jest.mock('./LoadingView', () => jest.fn(() => <div>LoadingView</div>));
jest.mock('containers/SelectSessionModal', () => jest.fn(() => <div>SelectSessionModal</div>));
jest.mock('./DashboardLayout', () => jest.fn(() => <div>DashboardLayout</div>));

const pageTitle = 'test-page-title';

describe('Dashboard', () => {
  const createWrapper = (props = {}) => {
    const {
      hasCourses = true,
      initIsPending = true,
      showSelectSessionModal = true,
    } = props;
    hooks.useDashboardMessages.mockReturnValue({ pageTitle });
    reduxHooks.useHasCourses.mockReturnValue(hasCourses);
    reduxHooks.useRequestIsPending.mockReturnValue(initIsPending);
    reduxHooks.useShowSelectSessionModal.mockReturnValue(showSelectSessionModal);
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
      it('should show dashboard layout', () => {
        createWrapper({ initIsPending: false });
        const dashboardLayout = screen.getByText('DashboardLayout');
        expect(dashboardLayout).toBeInTheDocument();
      });
    });
  });
});
