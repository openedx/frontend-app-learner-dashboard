import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import RejectedContent from './RejectedContent';

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
reduxHooks.useCardCreditData.mockReturnValue(credit);

const renderRejectedContent = () => render(<IntlProvider><RejectedContent cardId={cardId} /></IntlProvider>);

describe('RejectedContent component', () => {
  describe('hooks', () => {
    it('initializes credit data with cardId', () => {
      renderRejectedContent();
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      it('no action is passed', () => {
        renderRejectedContent();
        const action = screen.queryByTestId('action-row-btn');
        expect(action).not.toBeInTheDocument();
      });
      it('message is formatted rejected message', () => {
        renderRejectedContent();
        const message = screen.getByTestId('credit-msg');
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent(`${credit.providerName} did not approve your request for course credit.`);
      });
    });
  });
});
