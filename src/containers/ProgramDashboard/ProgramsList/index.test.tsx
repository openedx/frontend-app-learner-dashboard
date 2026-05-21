import { render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import ProgramsList from '.';
import { useProgramsListData } from '../../../data/hooks/queryHooks';
import ProgramListCard from './ProgramListCard';
import messages from './messages';

jest.mock('../../../data/hooks/queryHooks', () => ({
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

jest.mock('./ProgramListCard', () => jest.fn(({ program }) => (
  <div data-testid="program-list-card">{program.title}</div>
)));
jest.mock('./ExploreProgramsCTA', () => jest.fn(() => (
  <div data-testid="explore-programs-cta" />
)));

const mockApiData = [
  { uuid: '111-aaa', title: 'Data Science Program' },
  { uuid: '222-bbb', title: 'UX Design Program' },
];

describe('ProgramsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // useProgramsListData is a synchronous hook — use mockReturnValue, NOT mockResolvedValue
    (useProgramsListData as jest.Mock).mockReturnValue({
      data: mockApiData,
      isLoading: false,
      isError: false,
    });
  });

  const renderComponent = () => render(
    <IntlProvider locale="en">
      <ProgramsList />
    </IntlProvider>,
  );

  it('renders header text and ExploreProgramsCTA', () => {
    renderComponent();
    expect(screen.getByText(messages.programsListHeaderText.defaultMessage)).toBeInTheDocument();
    expect(screen.getByTestId('explore-programs-cta')).toBeInTheDocument();
  });

  it('fetches program data on mount', () => {
    renderComponent();
    expect(useProgramsListData).toHaveBeenCalledTimes(1);
  });

  it('renders a loading spinner while data is being fetched', () => {
    (useProgramsListData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryAllByTestId('program-list-card')).toHaveLength(0);
  });

  it('renders ProgramListCard for each program when enrollments exist', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.queryAllByTestId('program-list-card').length).toBeGreaterThan(0);
    });

    expect(ProgramListCard).toHaveBeenCalledWith(
      expect.objectContaining({ program: mockApiData[0] }),
      {},
    );
    expect(ProgramListCard).toHaveBeenCalledWith(
      expect.objectContaining({ program: mockApiData[1] }),
      {},
    );
  });

  it('renders an Alert and no program cards when the API request fails', async () => {
    (useProgramsListData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.queryAllByTestId('program-list-card')).toHaveLength(0);
    expect(screen.queryByTestId('explore-programs-cta')).not.toBeInTheDocument();
  });
});
