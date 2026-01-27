import { render, screen } from '@testing-library/react';

import CreditContent from './CreditContent';

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
        renderCreditContent(props);
        const button = screen.getByRole('link', { name: action.message });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('href', action.href);
        expect(button).not.toHaveAttribute('disabled');
      });
      it('loads message into credit-msg div', () => {
        renderCreditContent(props);
        const creditMsg = screen.getByTestId('credit-msg');
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
        renderCreditContent({ ...props, action: { ...action, disabled: true } });
        const button = screen.getByRole('link', { name: action.message });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('disabled');
        expect(button).toHaveAttribute('aria-disabled', 'true');
      });
    });
    describe('without action', () => {
      it('loads message into credit-msg div', () => {
        renderCreditContent({ message, requestData });
        const creditMsg = screen.getByTestId('credit-msg');
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
        renderCreditContent({ message, requestData });
        const button = screen.queryByRole('link', { name: action.message });
        expect(button).not.toBeInTheDocument();
      });
    });
  });
});
