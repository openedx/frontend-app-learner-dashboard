import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useSelectSessionModal } from 'data/context/SelectSessionProvider';

import useActionDisabledState from '../hooks';

import SelectSessionButton from './SelectSessionButton';

jest.mock('data/context/SelectSessionProvider', () => ({
  useSelectSessionModal: jest.fn().mockReturnValue({
    updateSelectSessionModal: jest.fn(),
  }),
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
      const mockedUpdateSelectSessionModal = jest.fn();
      useSelectSessionModal.mockReturnValue({
        updateSelectSessionModal: mockedUpdateSelectSessionModal,
      });
      render(<IntlProvider locale="en"><SelectSessionButton {...props} /></IntlProvider>);
      const user = userEvent.setup();
      const button = screen.getByRole('button', { name: 'Select Session' });
      await user.click(button);
      expect(mockedUpdateSelectSessionModal).toHaveBeenCalledWith(props.cardId);
    });
  });
});
