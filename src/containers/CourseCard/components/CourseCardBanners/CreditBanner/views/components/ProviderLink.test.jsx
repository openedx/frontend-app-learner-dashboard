import { render } from '@testing-library/react';
import { reduxHooks } from 'hooks';

import ProviderLink from './ProviderLink';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
  },
}));

jest.unmock('@openedx/paragon');
jest.unmock('react');

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

jest.mock('react-intl', () => {
  const i18n = jest.requireActual('react-intl');
  return {
    ...i18n,
    useIntl: () => ({
      formatMessage: mockFormatMessage,
    }),
  };
});

const cardId = 'test-card-id';
const credit = {
  providerStatusUrl: 'test-credit-provider-status-url',
  providerName: 'test-credit-provider-name',
};

const renderProviderLink = () => render(
  <ProviderLink cardId={cardId} />,
);

describe('ProviderLink component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    reduxHooks.useCardCreditData.mockReturnValue(credit);
  });
  describe('hooks', () => {
    it('initializes credit hook with cardId', () => {
      renderProviderLink();
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    it('passes credit.providerStatusUrl to the hyperlink href', () => {
      const { getByRole } = renderProviderLink();
      const providerLink = getByRole('link', { href: credit.providerStatusUrl });
      expect(providerLink).toBeInTheDocument();
    });
    it('passes providerName for the link message', () => {
      const { getByRole } = renderProviderLink();
      const providerLink = getByRole('link', { href: credit.providerStatusUrl });
      expect(providerLink).toHaveTextContent(credit.providerName);
    });
  });
});
