import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';

import { FilterKeys } from 'data/constants/app';
import ActiveCourseFilters from './ActiveCourseFilters';
import messages from './messages';

const filters = Object.values(FilterKeys);

describe('ActiveCourseFilters', () => {
  const props = {
    filters,
    handleRemoveFilter: jest.fn().mockName('handleRemoveFilter'),
  };
  it('renders chips correctly', () => {
    render(<IntlProvider locale="en"><ActiveCourseFilters {...props} /></IntlProvider>);
    filters.map((key) => {
      const chip = screen.getByText(formatMessage(messages[key]));
      return expect(chip).toBeInTheDocument();
    });
  });
  it('renders button correctly', () => {
    render(<IntlProvider locale="en"><ActiveCourseFilters {...props} /></IntlProvider>);
    const button = screen.getByRole('button', { name: formatMessage(messages.clearAll) });
    expect(button).toBeInTheDocument();
  });
});
