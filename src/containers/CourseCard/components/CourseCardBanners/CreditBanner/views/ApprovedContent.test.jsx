import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { formatMessage } from 'testUtils';
import { reduxHooks } from 'hooks';
import messages from './messages';
import ApprovedContent from './ApprovedContent';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
    useMasqueradeData: jest.fn(),
  },
}));

const cardId = 'test-card-id';
const credit = {
  providerStatusUrl: 'test-credit-provider-status-url',
  providerName: 'test-credit-provider-name',
};
reduxHooks.useCardCreditData.mockReturnValue(credit);
reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: false });

describe('ApprovedContent component', () => {
  describe('hooks', () => {
    it('initializes credit data with cardId', () => {
      render(<IntlProvider locale="en"><ApprovedContent cardId={cardId} /></IntlProvider>);
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        render(<IntlProvider locale="en"><ApprovedContent cardId={cardId} /></IntlProvider>);
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
        reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: true });
        render(<IntlProvider locale="en"><ApprovedContent cardId={cardId} /></IntlProvider>);
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
