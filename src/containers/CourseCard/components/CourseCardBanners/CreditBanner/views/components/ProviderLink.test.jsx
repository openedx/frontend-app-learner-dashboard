import { render, screen } from '@testing-library/react';
import { reduxHooks } from 'hooks';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ProviderLink from './ProviderLink';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
  },
}));

const cardId = 'test-card-id';
const credit = {
  providerStatusUrl: 'test-credit-provider-status-url',
  providerName: 'test-credit-provider-name',
};

const renderProviderLink = () => render(
  <IntlProvider locale="en"><ProviderLink cardId={cardId} /></IntlProvider>,
);

describe('ProviderLink component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    reduxHooks.useCardCreditData.mockReturnValue(credit);
    renderProviderLink();
  });
  describe('hooks', () => {
    it('initializes credit hook with cardId', () => {
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    it('passes credit.providerStatusUrl to the hyperlink href', () => {
      const providerLink = screen.getByRole('link', { href: credit.providerStatusUrl });
      expect(providerLink).toBeInTheDocument();
    });
    it('passes providerName for the link message', () => {
      const providerLink = screen.getByRole('link', { href: credit.providerStatusUrl });
      expect(providerLink).toHaveTextContent(credit.providerName);
    });
  });
});
