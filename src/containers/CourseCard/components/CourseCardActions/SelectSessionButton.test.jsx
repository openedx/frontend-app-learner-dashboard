import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { reduxHooks } from 'hooks';
import useActionDisabledState from '../hooks';

import SelectSessionButton from './SelectSessionButton';

jest.mock('hooks', () => ({
  reduxHooks: {
    useUpdateSelectSessionModalCallback: jest.fn(),
  },
}));
jest.mock('../hooks', () => jest.fn(() => ({ disableSelectSession: false })));

jest.unmock('@openedx/paragon');
jest.mock('./ActionButton/hooks', () => jest.fn(() => false));

describe('SelectSessionButton', () => {
  const props = { cardId: 'cardId' };
  it('default render', () => {
    const { getByRole } = render(<SelectSessionButton {...props} />);
    const button = getByRole('button', { name: 'Select Session' });
    expect(button).toBeInTheDocument();
  });
  describe('if useActionDisabledState is false', () => {
    it('should disabled Select Session', () => {
      useActionDisabledState.mockReturnValueOnce({ disableSelectSession: true });
      const { getByRole } = render(<SelectSessionButton {...props} />);
      const button = getByRole('button', { name: 'Select Session' });
      expect(button).toBeDisabled();
    });
  });
  describe('on click', () => {
    it('should call openSessionModal', async () => {
      const { getByRole } = render(<SelectSessionButton {...props} />);
      const button = getByRole('button', { name: 'Select Session' });
      await act(async () => {
        userEvent.click(button);
      });
      expect(reduxHooks.useUpdateSelectSessionModalCallback).toHaveBeenCalledWith(props.cardId);
    });
  });
});
