import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { formatMessage } from '@src/testUtils';
import { reduxHooks } from '@src/hooks';
import MasqueradeUserContext from '@src/data/contexts/MasqueradeUserContext';
import messages from './messages';
import ApprovedContent from './ApprovedContent';

jest.mock('@src/hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
  },
}));

const cardId = 'test-card-id';
const credit = {
  providerStatusUrl: 'test-credit-provider-status-url',
  providerName: 'test-credit-provider-name',
};
reduxHooks.useCardCreditData.mockReturnValue(credit);

const renderWithMasquerading = (isMasquerading = false) => render(
  <IntlProvider locale="en">
    <MasqueradeUserContext.Provider value={{ isMasquerading }}>
      <ApprovedContent cardId={cardId} />
    </MasqueradeUserContext.Provider>
  </IntlProvider>
);

describe('ApprovedContent component', () => {
  describe('hooks', () => {
    it('initializes credit data with cardId', () => {
      renderWithMasquerading();
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        renderWithMasquerading();
      });
      it('action.message is formatted viewCredit message', () => {
        const actionButton = screen.getByRole('link', { name: messages.viewCredit.defaultMessage });
        expect(actionButton).toBeInTheDocument();
        expect(actionButton).toHaveTextContent(formatMessage(messages.viewCredit));
      });
      it('action.href from credit.providerStatusUrl', () => {
        const actionButton = screen.getByRole('link', { name: messages.viewCredit.defaultMessage });
        expect(actionButton).toHaveAttribute('href', credit.providerStatusUrl);
      });
      it('action.disabled is false', () => {
        const actionButton = screen.getByRole('link', { name: messages.viewCredit.defaultMessage });
        expect(actionButton).not.toHaveAttribute('aria-disabled', 'true');
        expect(actionButton).not.toHaveClass('disabled');
        expect(actionButton).toBeEnabled();
      });
      it('message is formatted approved message', () => {
        const creditMsg = screen.getByTestId('credit-msg');
        expect(creditMsg).toBeInTheDocument();
        expect(creditMsg.textContent).toContain(`${credit.providerName} has approved your request for course credit`);
      });
    });
    describe('when masquerading', () => {
      beforeEach(() => {
        renderWithMasquerading(true);
      });

      it('disables the action button', () => {
        const actionButton = screen.getByRole('link', { name: messages.viewCredit.defaultMessage });
        expect(actionButton).toHaveAttribute('aria-disabled', 'true');
        expect(actionButton).toHaveClass('disabled');
      });

      it('still renders provider name and link correctly', () => {
        const creditMsg = screen.getByTestId('credit-msg');
        expect(creditMsg.textContent).toContain(credit.providerName);
      });
    });
  });
});
