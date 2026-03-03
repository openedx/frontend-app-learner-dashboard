import { render, screen, waitFor } from '@testing-library/react';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import { useInitializeLearnerHome } from 'data/hooks';
import { App } from './App';
import messages from './messages';

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

jest.mock('data/context', () => ({
  useMasquerade: jest.fn(() => ({ masqueradeUser: null })),
}));

jest.mock('@edx/frontend-component-footer', () => ({
  FooterSlot: jest.fn(() => <div>FooterSlot</div>),
}));
jest.mock('containers/Dashboard', () => jest.fn(() => <div>Dashboard</div>));
jest.mock('containers/LearnerDashboardHeader', () => jest.fn(() => <div>LearnerDashboardHeader</div>));
jest.mock('containers/AppWrapper', () => jest.fn(({ children }) => <div className="AppWrapper">{children}</div>));

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({})),
}));

jest.mock('@edx/frontend-platform/react', () => ({
  ...jest.requireActual('@edx/frontend-platform/react'),
  ErrorPage: () => 'ErrorPage',
}));

const supportEmail = 'test@support.com';
useInitializeLearnerHome.mockReturnValue({
  data: {
    platformSettings: {
      supportEmail,
    },
  },
  isError: false,
});

describe('App router component', () => {
  describe('component', () => {
    const runBasicTests = () => {
      it('displays title in helmet component', async () => {
        await waitFor(() => expect(document.title).toEqual(messages.pageTitle.defaultMessage));
      });
      it('displays learner dashboard header', () => {
        const learnerDashboardHeader = screen.getByText('LearnerDashboardHeader');
        expect(learnerDashboardHeader).toBeInTheDocument();
      });
      it('wraps the header and main components in an AppWrapper widget container', () => {
        const appWrapper = screen.getByText('LearnerDashboardHeader').parentElement;
        expect(appWrapper).toHaveClass('AppWrapper');
        expect(appWrapper.children[1].id).toEqual('main');
      });
      it('displays footer slot', () => {
        const footerSlot = screen.getByText('FooterSlot');
        expect(footerSlot).toBeInTheDocument();
      });
    };
    describe('no network failure', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        getConfig.mockReturnValue({});
        render(<IntlProvider locale="en"><App /></IntlProvider>);
      });
      runBasicTests();
      it('loads dashboard', () => {
        const dashboard = screen.getByText('Dashboard');
        expect(dashboard).toBeInTheDocument();
      });
    });
    describe('no network failure with optimizely url', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        getConfig.mockReturnValue({ OPTIMIZELY_URL: 'fake.url' });
        render(<IntlProvider locale="en"><App /></IntlProvider>);
      });
      runBasicTests();
      it('loads dashboard', () => {
        const dashboard = screen.getByText('Dashboard');
        expect(dashboard).toBeInTheDocument();
      });
    });
    describe('no network failure with optimizely project id', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        getConfig.mockReturnValue({ OPTIMIZELY_PROJECT_ID: 'fakeId' });
        render(<IntlProvider locale="en"><App /></IntlProvider>);
      });
      runBasicTests();
      it('loads dashboard', () => {
        const dashboard = screen.getByText('Dashboard');
        expect(dashboard).toBeInTheDocument();
      });
    });
    describe('initialize failure', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        useInitializeLearnerHome.mockReturnValue({
          data: null,
          isError: true,
        });
        getConfig.mockReturnValue({});
        render(<IntlProvider locale="en" messages={messages}><App /></IntlProvider>);
      });
      runBasicTests();
      it('loads error page', () => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        const errorPage = screen.getByText('ErrorPage');
        expect(errorPage).toBeInTheDocument();
      });
    });
    describe('refresh failure', () => {
      beforeEach(() => {
        getConfig.mockReturnValue({});
        render(<IntlProvider locale="en"><App /></IntlProvider>);
      });
      runBasicTests();
      it('loads error page', () => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        const errorPage = screen.getByText('ErrorPage');
        expect(errorPage).toBeInTheDocument();
      });
    });
  });
});
