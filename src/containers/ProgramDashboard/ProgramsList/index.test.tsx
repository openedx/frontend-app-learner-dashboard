import { render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ProgramsList from '.';
import { useProgramsListData } from '../data/api';
import ProgramListCard from './ProgramListCard';
import ExploreProgramsCTA from './ExploreProgramsCTA';
import messages from './messages';

// Mock API and external utilities
jest.mock('../data/api', () => ({
  useProgramsListData: jest.fn(),
}));
jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn(),
}));
jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    CONTACT_URL: 'test-contact-url',
  })),
}));

// Mock Child Components
jest.mock('./ProgramListCard', () => jest.fn(({ program }) => (
  <div data-testid="program-list-card">{program.title}</div>
)));
jest.mock('./ExploreProgramsCTA', () => jest.fn(() => (
  <div data-testid="explore-programs-cta" />
)));

// Mock Data
const mockApiData = [
  { uuid: '111-aaa', title: 'Data Science Program' },
  { uuid: '222-bbb', title: 'UX Design Program' },
];

describe('ProgramsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up a successful mock API response by default
    (useProgramsListData as jest.Mock).mockResolvedValue(mockApiData);
  });

  const renderComponent = () => render(
    <IntlProvider locale="en">
      <ProgramsList />
    </IntlProvider>,
  );

  it('renders header text and ExploreProgramsCTA', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(messages.programsListHeaderText.defaultMessage)).toBeInTheDocument();
      expect(screen.getByTestId('explore-programs-cta')).toBeInTheDocument();
    });
  });

  it('fetches program data on mount', async () => {
    renderComponent();

    expect(useProgramsListData).toHaveBeenCalledTimes(1);
  });

  it('renders ProgramListCard only when an assigned program exists', async () => {
    (useProgramsListData as jest.Mock).mockReturnValue({
      data: mockApiData,
      loading: false,
      error: null,
    });

    renderComponent();

    await waitFor(() => {
      expect(
        screen.queryAllByTestId('program-list-card').length,
      ).toBeGreaterThan(0);
    });

    expect(ProgramListCard).toHaveBeenCalledWith(
      expect.objectContaining({
        program: mockApiData[0],
      }),
      {},
    );
  });

  it('renders the ExploreProgramsCTA with "hasEnrollments" set to false if there are no program enrollments', async () => {
    (useProgramsListData as jest.Mock).mockResolvedValueOnce({ data: [] });
    renderComponent();

    await waitFor(() => {
      expect(ExploreProgramsCTA).toHaveBeenCalledWith(
        expect.objectContaining(
          {
            hasEnrollments: false,
          },
        ),
        {},
      );
    });
  });

  it('renders fallback UI when the API request fails', async() => {
    const mockError = new Error('Network failed');
    (useProgramsListData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: mockError,
    });
    renderComponent();
    await waitFor(() => {
      expect(screen.getByTestId('explore-programs-cta')).toBeInTheDocument();
    });
  });
});
