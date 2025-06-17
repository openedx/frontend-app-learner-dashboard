import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';

import messages from './messages';
import PendingContent from './PendingContent';

jest.mock('hooks', () => ({
  reduxHooks: { useCardCreditData: jest.fn(), useMasqueradeData: jest.fn() },
}));

const cardId = 'test-card-id';
const providerName = 'test-credit-provider-name';
const providerStatusUrl = 'test-credit-provider-status-url';
reduxHooks.useCardCreditData.mockReturnValue({
  providerName,
  providerStatusUrl,
});
reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: false });

const renderPendingContent = () => render(
  <IntlProvider messages={{}} locale="en">
    <PendingContent cardId={cardId} />
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
          reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: true });
          renderPendingContent();
          const button = screen.getByRole('link', { name: messages.viewDetails.defaultMessage });
          expect(button).toHaveClass('disabled');
        });
      });
    });
  });
});
