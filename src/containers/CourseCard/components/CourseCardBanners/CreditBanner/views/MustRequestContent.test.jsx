import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import userEvent from '@testing-library/user-event';

import { reduxHooks } from '@src/hooks';
import MasqueradeUserContext from '@src/data/contexts/MasqueradeUserContext';
import messages from './messages';
import hooks from './hooks';
import MustRequestContent from './MustRequestContent';

jest.mock('./hooks', () => ({
  useCreditRequestData: jest.fn(),
}));

jest.mock('@src/hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
  },
}));

const cardId = 'test-card-id';
const requestData = {
  url: 'test-request-data-url',
  parameters: {
    key1: 'val1',
    key2: 'val2',
    key3: 'val3',
  },
};
const providerName = 'test-credit-provider-name';
const providerStatusUrl = 'test-credit-provider-status-url';
const createCreditRequest = jest.fn().mockName('createCreditRequest');

const renderMustRequestContent = (isMasquerading = false) => render(
  <IntlProvider locale="en" messages={messages}>
    <MasqueradeUserContext.Provider value={{ isMasquerading }}>
      <MustRequestContent cardId={cardId} />
    </MasqueradeUserContext.Provider>
  </IntlProvider>,
);

describe('MustRequestContent component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    hooks.useCreditRequestData.mockReturnValue({
      requestData,
      createCreditRequest,
    });
    reduxHooks.useCardCreditData.mockReturnValue({
      providerName,
      providerStatusUrl,
    });
  });

  describe('hooks', () => {
    it('initializes credit request data with cardId', () => {
      renderMustRequestContent();
      expect(hooks.useCreditRequestData).toHaveBeenCalledWith(cardId);
    });
  });

  describe('behavior', () => {
    describe('rendered content', () => {
      beforeEach(() => {
        renderMustRequestContent();
      });

      it('calls createCreditRequest when request credit button is clicked', async () => {
        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: /request credit/i });
        await user.click(button);
        expect(createCreditRequest).toHaveBeenCalled();
      });

      it('shows request credit button that is enabled', () => {
        const button = screen.getByRole('button', { name: /request credit/i });
        expect(button).toBeEnabled();
      });

      it('displays must request message with provider link', () => {
        expect(screen.getByTestId('credit-msg')).toHaveTextContent(/request credit/i);
      });

      it('renders credit request form with correct data', () => {
        const { container } = renderMustRequestContent();
        const form = container.querySelector('form');
        expect(form).toBeInTheDocument();
        expect(form).toHaveAttribute('action', requestData.url);
      });
    });

    describe('when masquerading', () => {
      beforeEach(() => {
        renderMustRequestContent(true);
      });

      it('disables the request credit button', () => {
        const button = screen.getByRole('button', { name: /request credit/i });
        expect(button).toHaveAttribute('aria-disabled', 'true');
        expect(button).toHaveClass('disabled');
      });
    });
  });
});
