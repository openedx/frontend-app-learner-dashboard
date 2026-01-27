import { render, screen } from '@testing-library/react';
import { formatMessage } from '@src/testUtils';
import { IntlProvider } from '@openedx/frontend-base';

import { FilterKeys } from '@src/data/constants/app';
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
