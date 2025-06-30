import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';

import SelectSessionButton from './SelectSessionButton';

jest.mock('hooks', () => ({
  reduxHooks: {
    useUpdateSelectSessionModalCallback: jest.fn(),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableSelectSession: false })));

jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

describe('SelectSessionButton', () => {
  const props = { cardId: 'cardId' };
  it('default render', () => {
    render(<IntlProvider locale="en"><SelectSessionButton {...props} /></IntlProvider>);
    const button = screen.getByRole('button', { name: 'Select Session' });
    expect(button).toBeInTheDocument();
  });
  describe('if useActionDisabledState is false', () => {
    it('should disabled Select Session', () => {
      useActionDisabledState.mockReturnValueOnce({ disableSelectSession: true });
      render(<IntlProvider locale="en"><SelectSessionButton {...props} /></IntlProvider>);
      const button = screen.getByRole('button', { name: 'Select Session' });
      expect(button).toBeDisabled();
    });
  });
  describe('on click', () => {
    it('should call openSessionModal', async () => {
      render(<IntlProvider locale="en"><SelectSessionButton {...props} /></IntlProvider>);
      const user = userEvent.setup();
      const button = screen.getByRole('button', { name: 'Select Session' });
      await user.click(button);
      expect(reduxHooks.useUpdateSelectSessionModalCallback).toHaveBeenCalledWith(props.cardId);
    });
  });
});
