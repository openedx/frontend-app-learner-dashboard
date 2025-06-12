import { render, screen } from '@testing-library/react';

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

const mockFormatMessage = (msg, values) => {
  let message = msg.defaultMessage;
  if (values === undefined) {
    return message;
  }

  Object.keys(values).forEach((key) => {
    message = message.replaceAll(`{${key}}`, values[key]);
  });
  return message;
};

jest.mock('@edx/frontend-platform/i18n', () => {
  const i18n = jest.requireActual('@edx/frontend-platform/i18n');
  return {
    ...i18n,
    useIntl: () => ({
      formatMessage: mockFormatMessage,
    }),
  };
});

jest.unmock('@openedx/paragon');
jest.unmock('react');

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
      render(<ApprovedContent cardId={cardId} />);
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        render(<ApprovedContent cardId={cardId} />);
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
        render(<ApprovedContent cardId={cardId} />);
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
