import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';
import { useFilters } from 'data/context';

import { FilterKeys } from 'data/constants/app';
import userEvent from '@testing-library/user-event';
import ActiveCourseFilters from './ActiveCourseFilters';
import messages from './messages';

const filters = Object.values(FilterKeys);
const types = [{ id: 'course', text: 'Course' }, { id: 'pathway', text: 'Pathway' }];

jest.mock('data/context', () => ({
  useFilters: jest.fn(),
}));

const removeFiltersMock = jest.fn().mockName('removeFilter');
const clearFiltersMock = jest.fn().mockName('clearFilters');
const removeTypeMock = jest.fn().mockName('removeType');
const clearTypesMock = jest.fn().mockName('clearTypes');
useFilters.mockReturnValue({
  filters,
  types: [],
  removeFilter: removeFiltersMock,
  clearFilters: clearFiltersMock,
  removeType: removeTypeMock,
  clearTypes: clearTypesMock,
});

describe('ActiveCourseFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    const clearAllButton = screen.getByRole('button', { name: formatMessage(messages.clearAll) });
    await user.click(clearAllButton);
    expect(clearFiltersMock).toHaveBeenCalledTimes(1);
  });

  describe('with types', () => {
    beforeEach(() => {
      useFilters.mockReturnValue({
        filters: [],
        types,
        removeFilter: removeFiltersMock,
        clearFilters: clearFiltersMock,
        removeType: removeTypeMock,
        clearTypes: clearTypesMock,
      });
    });

    it('renders type chips correctly', () => {
      render(<IntlProvider locale="en"><ActiveCourseFilters /></IntlProvider>);
      types.forEach(type => {
        expect(screen.getByText(type.text)).toBeInTheDocument();
      });
    });

    it('calls removeType when a type chip is clicked', async () => {
      const user = userEvent.setup();
      render(<IntlProvider locale="en"><ActiveCourseFilters /></IntlProvider>);
      const removeButton = screen.getByRole('button', { name: types[0].text });
      await user.click(removeButton);
      expect(removeTypeMock).toHaveBeenCalledTimes(1);
      expect(removeTypeMock).toHaveBeenCalledWith(types[0].id);
    });

    it('calls clearTypes when clear all is clicked', async () => {
      const user = userEvent.setup();
      render(<IntlProvider locale="en"><ActiveCourseFilters /></IntlProvider>);
      const clearAllButton = screen.getByRole('button', { name: formatMessage(messages.clearAll) });
      await user.click(clearAllButton);
      expect(clearTypesMock).toHaveBeenCalledTimes(1);
    });
  });
});
