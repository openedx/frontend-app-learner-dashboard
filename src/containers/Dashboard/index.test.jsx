import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { useSelectSessionModal } from '@src/data/context';
import { useInitializeLearnerHome } from '@src/data/hooks';
import { useIsPathwayPilotUIEnabled } from '@src/hooks';
import { usePathwaysByCategory } from '@src/hooks/usePathwayData';
import PathwaysPanelSlot from '@src/slots/PathwaysPanelSlot';

import hooks from './hooks';
import messages from './messages';
import Dashboard from '.';

jest.mock('@src/data/context', () => ({
  useSelectSessionModal: jest.fn(),
}));

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

jest.mock('@src/hooks', () => ({
  useIsPathwayPilotUIEnabled: jest.fn(),
}));

jest.mock('@src/hooks/usePathwayData', () => ({
  usePathwaysByCategory: jest.fn(),
}));

jest.mock('./hooks', () => ({
  useInitializeDashboard: jest.fn(),
  useDashboardMessages: jest.fn(),
}));

jest.mock('../../slots/DashboardModalSlot', () => jest.fn(() => <div>DashboardModalSlot</div>));
jest.mock('@src/containers/CoursesPanel', () => jest.fn(() => <div>CoursesPanel</div>));
jest.mock('./LoadingView', () => jest.fn(() => <div>LoadingView</div>));
jest.mock('@src/containers/SelectSessionModal', () => jest.fn(() => <div>SelectSessionModal</div>));
jest.mock('./DashboardLayout', () => jest.fn(({ children }) => <div>DashboardLayout{children}</div>));
jest.mock('@src/slots/PathwaysPanelSlot', () => jest.fn(() => <div>PathwaysPanelSlot</div>));

const pageTitle = 'test-page-title';
const pathwaysByCategory = [{ categoryLabelPlural: 'Bootcamps', pathways: [] }];

describe('Dashboard', () => {
  const createWrapper = (props = {}) => {
    const {
      hasCourses = true,
      initIsPending = true,
      showSelectSessionModal = true,
      isPathwayPilotUIEnabled = false,
    } = props;
    hooks.useDashboardMessages.mockReturnValue({ pageTitle });
    useIsPathwayPilotUIEnabled.mockReturnValue(isPathwayPilotUIEnabled);
    usePathwaysByCategory.mockReturnValue(pathwaysByCategory);
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
        createWrapper({ initIsPending: true });
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
      it('should render CoursesPanel', () => {
        createWrapper({ initIsPending: false });
        expect(screen.getByText('CoursesPanel')).toBeInTheDocument();
      });
      describe('pathway pilot UI enabled', () => {
        it('should render dashboard title and PathwaysPanelSlot with pathways', () => {
          createWrapper({ initIsPending: false, isPathwayPilotUIEnabled: true });
          const title = screen.getByRole('heading', { level: 2, name: messages.dashboardTitle.defaultMessage });
          expect(title).toHaveClass('dashboard-title');
          expect(screen.getByText('PathwaysPanelSlot')).toBeInTheDocument();
          expect(PathwaysPanelSlot).toHaveBeenCalledWith({ pathwaysByCategory }, expect.anything());
        });
      });
      describe('pathway pilot UI disabled', () => {
        it('should not render dashboard title nor PathwaysPanelSlot', () => {
          createWrapper({ initIsPending: false, isPathwayPilotUIEnabled: false });
          expect(screen.queryByText(messages.dashboardTitle.defaultMessage)).not.toBeInTheDocument();
          expect(screen.queryByText('PathwaysPanelSlot')).not.toBeInTheDocument();
        });
      });
    });
  });
});
