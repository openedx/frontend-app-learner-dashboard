import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { FilterKeys } from 'data/constants/app';
import Checkbox from './Checkbox';
import messages from '../messages';

describe('Checkbox', () => {
  describe('renders correctly', () => {
    Object.keys(FilterKeys).forEach((filterKey) => {
      it(`renders ${filterKey}`, () => {
        render(<IntlProvider locale="en"><Checkbox filterKey={filterKey} /></IntlProvider>);
        expect(screen.getByText(formatMessage(messages[filterKey]))).toBeInTheDocument();
      });
    });
  });
});
