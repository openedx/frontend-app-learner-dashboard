import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { formatMessage } from 'testUtils';
import { FilterKeys } from 'data/constants/app';
import { FilterForm, filterOrder } from './FilterForm';
import messages from '../messages';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({})),
}));

const mockHandleFilterChange = jest.fn();

const defaultProps = {
  filters: [FilterKeys.inProgress],
  handleFilterChange: mockHandleFilterChange,
};

const renderComponent = (props = defaultProps) => render(
  <IntlProvider messages={{}}>
    <FilterForm {...props} />
  </IntlProvider>,
);

describe('FilterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter checkboxes in correct order', () => {
    renderComponent();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(filterOrder.length);
    checkboxes.forEach((checkbox, index) => {
      expect(checkbox).toHaveAttribute('value', filterOrder[index]);
    });
  });

  it('checks boxes based on filters prop', () => {
    const filters = [FilterKeys.inProgress, FilterKeys.done];
    renderComponent({ ...defaultProps, filters });
    filters.forEach(filter => {
      expect(screen.getByRole('checkbox', { name: formatMessage(messages[filter]) })).toBeChecked();
    });
  });

  it('calls handleFilterChange when checkbox is clicked', () => {
    renderComponent();
    const checkbox = screen.getByRole('checkbox', { name: formatMessage(messages.notStarted) });
    fireEvent.click(checkbox);
    expect(mockHandleFilterChange).toHaveBeenCalled();
  });

  it('displays course status heading when the pilot UI is disabled', () => {
    getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: false });
    renderComponent();
    expect(screen.getByText(formatMessage(messages.courseStatus))).toBeInTheDocument();
    expect(screen.queryByText(formatMessage(messages.status))).toBeNull();
  });

  it('displays status heading when the pilot UI is enabled', () => {
    getConfig.mockReturnValue({ ENABLE_PATHWAY_PILOT_UI: true });
    renderComponent();
    expect(screen.getByText(formatMessage(messages.status))).toBeInTheDocument();
    expect(screen.queryByText(formatMessage(messages.courseStatus))).toBeNull();
  });
});
