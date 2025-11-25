import { render, screen, waitFor } from '@testing-library/react';
import { getConfig } from '@edx/frontend-platform';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { logError } from '@edx/frontend-platform/logging';

import ProgramsList from '.';
import { getProgramsListData } from '../data/api';
import ProgramListCard from './ProgramListCard';
import messages from './messages';

// Mock API and external utilities
jest.mock('../data/api', () => ({
  getProgramsListData: jest.fn(),
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
const mockApiData = {
  data: [
    { uuid: '111-aaa', title: 'Data Science Program' },
    { uuid: '222-bbb', title: 'UX Design Program' },
  ],
};

const mockExtractedData = mockApiData.data.map(item => ({
  ...item,
}));

describe('ProgramsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up a successful mock API response by default
    (getProgramsListData as jest.Mock).mockResolvedValue(mockApiData);
  });

  const renderComponent = () => render(
    <IntlProvider locale="en">
      <ProgramsList />
    </IntlProvider>,
  );

  it('sets the correct page title', async () => {
    renderComponent();

    await waitFor(() => {
      expect(document.title).toEqual(messages.programDashboardPageTitle.defaultMessage);
    });
  });

  it('renders header text and ExploreProgramsCTA', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(messages.programsListHeaderText.defaultMessage)).toBeInTheDocument();
      expect(screen.getByTestId('explore-programs-cta')).toBeInTheDocument();
    });
  });

  it('fetches program data on mount', async () => {
    renderComponent();

    expect(getProgramsListData).toHaveBeenCalledTimes(1);
  });

  it('renders ProgramListCard components upon successful API response', async () => {
    renderComponent();

    // Wait for the data to load and cards to render
    await waitFor(() => {
      // Expect both cards to be rendered
      expect(screen.getAllByTestId('program-list-card')).toHaveLength(2);

      // Check if ProgramListCard was called with the processed data
      // Check for the first card
      expect(ProgramListCard).toHaveBeenCalledWith(
        expect.objectContaining({
          program: mockExtractedData[0],
        }),
        {},
      );
      // Check for the second card
      expect(ProgramListCard).toHaveBeenCalledWith(
        expect.objectContaining({
          program: mockExtractedData[1],
        }),
        {},
      );
    });
  });

  it('calls logError if the API request fails', async () => {
    const mockError = new Error('Network failed');
    (getProgramsListData as jest.Mock).mockRejectedValue(mockError);

    const mockContactUrl = 'mock-contact-url';

    getConfig.mockReturnValueOnce({
      CONTACT_URL: mockContactUrl,
    });

    renderComponent();

    // Wait for the asynchronous error handling path to execute
    await waitFor(() => {
      expect(logError).toHaveBeenCalledWith(mockError);
    });

    // Ensure no cards are rendered on failure
    expect(screen.queryAllByTestId('program-list-card')).toHaveLength(0);
    expect(screen.getByRole('link', { name: mockContactUrl })).toBeInTheDocument();
  });
});
