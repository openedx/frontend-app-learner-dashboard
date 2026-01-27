import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import { reduxHooks } from '@src/hooks';
import MasqueradeUserContext from '@src/data/contexts/MasqueradeUserContext';

import messages from './messages';
import PendingContent from './PendingContent';

jest.mock('@src/hooks', () => ({
  reduxHooks: { useCardCreditData: jest.fn() },
}));

const cardId = 'test-card-id';
const providerName = 'test-credit-provider-name';
const providerStatusUrl = 'test-credit-provider-status-url';
reduxHooks.useCardCreditData.mockReturnValue({
  providerName,
  providerStatusUrl,
});

const renderPendingContent = (isMasquerading = false) => render(
  <IntlProvider messages={{}} locale="en">
    <MasqueradeUserContext.Provider value={{ isMasquerading }}>
      <PendingContent cardId={cardId} />
    </MasqueradeUserContext.Provider>
  </IntlProvider>,
);
describe('PendingContent component', () => {
  describe('hooks', () => {
    it('initializes card credit data with cardId', () => {
      renderPendingContent();
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('behavior', () => {
    describe('rendered CreditContent component', () => {
      it('action message is formatted requestCredit message', () => {
        renderPendingContent();
        const button = screen.getByRole('link', { name: messages.viewDetails.defaultMessage });
        expect(button).toBeInTheDocument();
      });
      it('action href will go to provider status site', () => {
        renderPendingContent();
        const button = screen.getByRole('link', { name: messages.viewDetails.defaultMessage });
        expect(button).toHaveAttribute('href', providerStatusUrl);
      });
      it('action.disabled is false', () => {
        renderPendingContent();
        const button = screen.getByRole('link', { name: messages.viewDetails.defaultMessage });
        expect(button).not.toHaveClass('disabled');
      });
      it('message is formatted pending message with provider name', () => {
        renderPendingContent();
        const component = screen.getByTestId('credit-msg');
        expect(component).toBeInTheDocument();
        expect(component).toHaveTextContent(`${providerName} has received`);
      });
      describe('when masqueradeData is true', () => {
        it('disables the view details button', () => {
          renderPendingContent(true);
          const button = screen.getByRole('link', { name: messages.viewDetails.defaultMessage });
          expect(button).toHaveAttribute('aria-disabled', 'true');
          expect(button).toHaveClass('disabled');
        });
      });
    });
  });
});
