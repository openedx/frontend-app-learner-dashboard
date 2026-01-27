import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { formatMessage } from '@src/testUtils';

import { SortKeys } from '@src/data/constants/app';
import SortForm from './SortForm';
import messages from '../messages';

describe('SortForm', () => {
  const props = {
    handleSortChange: jest.fn().mockName('handleSortChange'),
    sortBy: SortKeys.enrolled,
  };
  it('renders heading', () => {
    render(<IntlProvider locale="en"><SortForm {...props} /></IntlProvider>);
    const heading = screen.getByText(formatMessage(messages.sort));
    expect(heading).toBeInTheDocument();
  });
  it('renders radio enrolled', () => {
    render(<IntlProvider locale="en"><SortForm {...props} /></IntlProvider>);
    const enrolled = screen.getByRole('radio', { name: formatMessage(messages.sortLastEnrolled) });
    expect(enrolled).toBeInTheDocument();
  });
  it('renders radio title', () => {
    render(<IntlProvider locale="en"><SortForm {...props} /></IntlProvider>);
    const title = screen.getByRole('radio', { name: formatMessage(messages.sortTitle) });
    expect(title).toBeInTheDocument();
  });
});
