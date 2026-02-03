import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';
import { useFilters } from 'data/context/FiltersProvider';

import { FilterKeys } from 'data/constants/app';
import userEvent from '@testing-library/user-event';
import ActiveCourseFilters from './ActiveCourseFilters';
import messages from './messages';

const filters = Object.values(FilterKeys);

jest.mock('data/context/FiltersProvider', () => ({
  useFilters: jest.fn(),
}));

const removeFiltersMock = jest.fn().mockName('removeFilter');
const clearFiltersMock = jest.fn().mockName('clearFilters');
useFilters.mockReturnValue({
  filters,
  removeFilter: removeFiltersMock,
  clearFilters: clearFiltersMock,
});

describe('ActiveCourseFilters', () => {
  it('renders chips correctly', () => {
    render(<IntlProvider locale="en"><ActiveCourseFilters /></IntlProvider>);
    filters.map((key) => {
      const chip = screen.getByText(formatMessage(messages[key]));
      return expect(chip).toBeInTheDocument();
    });
  });
  it('renders button correctly', () => {
    render(<IntlProvider locale="en"><ActiveCourseFilters /></IntlProvider>);
    const button = screen.getByRole('button', { name: formatMessage(messages.clearAll) });
    expect(button).toBeInTheDocument();
  });
  it('should call onClick when button is clicked remove filter', async () => {
    const user = userEvent.setup();
    render(<IntlProvider locale="en"><ActiveCourseFilters /></IntlProvider>);
    const removeButton = screen.getByRole('button', { name: formatMessage(messages[filters[0]]) });
    await user.click(removeButton);
    expect(removeFiltersMock).toHaveBeenCalledTimes(1);
    expect(removeFiltersMock).toHaveBeenCalledWith(filters[0]);
  });
  it('should call onClick when button is clicked clear all filters', async () => {
    const user = userEvent.setup();
    render(<IntlProvider locale="en"><ActiveCourseFilters /></IntlProvider>);
    screen.debug();
    const clearAllButton = screen.getByRole('button', { name: formatMessage(messages.clearAll) });
    await user.click(clearAllButton);
    expect(clearFiltersMock).toHaveBeenCalledTimes(1);
  });
});
