import { render } from '@testing-library/react';

import CreditContent from './CreditContent';

jest.unmock('@openedx/paragon');
jest.unmock('react');

const action = {
  href: 'test-action-href',
  onClick: jest.fn().mockName('test-action-onClick'),
  message: 'test-action-message',
  disabled: false,
};

const message = 'test-message';
const requestData = { url: 'test-request-data-url', parameters: { key1: 'val1' } };
const props = { action, message, requestData };

const renderCreditContent = (data) => render(
  <CreditContent {...data} />,
);

describe('CreditContent component', () => {
  describe('render', () => {
    describe('with action', () => {
      it('loads href and message into action row button', () => {
        const { getByRole } = renderCreditContent(props);
        const button = getByRole('link', { name: action.message });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('href', action.href);
        expect(button).not.toHaveAttribute('disabled');
      });
      it('loads message into credit-msg div', () => {
        const { getByTestId } = renderCreditContent(props);
        const creditMsg = getByTestId('credit-msg');
        expect(creditMsg).toBeInTheDocument();
        expect(creditMsg.innerHTML).toEqual(message);
      });
      it('loads CreditRequestForm with passed requestData', () => {
        const { container } = renderCreditContent(props);
        const creditForm = container.querySelector('form');
        expect(creditForm).toBeInTheDocument();
        expect(creditForm).toHaveAttribute('action', requestData.url);
      });
      it('disables action button when action.disabled is true', () => {
        const { getByRole } = renderCreditContent({ ...props, action: { ...action, disabled: true } });
        const button = getByRole('link', { name: action.message });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('disabled');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
    describe('without action', () => {
      it('loads message into credit-msg div', () => {
        const { getByTestId } = renderCreditContent({ message, requestData });
        const creditMsg = getByTestId('credit-msg');
        expect(creditMsg).toBeInTheDocument();
        expect(creditMsg.innerHTML).toEqual(message);
      });
      it('loads CreditRequestForm with passed requestData', () => {
        const { container } = renderCreditContent({ message, requestData });
        const creditForm = container.querySelector('form');
        expect(creditForm).toBeInTheDocument();
        expect(creditForm).toHaveAttribute('action', requestData.url);
      });
      it('does not render action row button', () => {
        const { queryByRole } = renderCreditContent({ message, requestData });
        const button = queryByRole('link', { name: action.message });
        expect(button).not.toBeInTheDocument();
      });
    });
  });
});
