import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';

import MasqueradeBar from '.';
import hooks from './hooks';
import messages from './messages';

jest.mock('./hooks', () => ({
  useMasqueradeBarData: jest.fn(),
}));

describe('MasqueradeBar', () => {
  const masqueradeMockData = {
    canMasquerade: true,
    isMasquerading: false,
    isMasqueradingFailed: false,
    isMasqueradingPending: false,
    masqueradeInput: '',
    masqueradeErrorMessage: '',
    handleMasqueradeInputChange: jest.fn().mockName('handleMasqueradeInputChange'),
    handleClearMasquerade: jest.fn().mockName('handleClearMasquerade'),
    handleMasqueradeSubmit: jest.fn().mockName('handleMasqueradeSubmit'),
    formatMessage,
  };

  describe('render', () => {
    it('can masquerade', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce(masqueradeMockData);
      render(<MasqueradeBar />);
      const labelStudentName = screen.getByText(messages.StudentNameInput.defaultMessage);
      expect(labelStudentName).toBeInTheDocument();
      const submitButton = screen.getByRole('button', { name: messages.SubmitButton.defaultMessage });
      expect(submitButton).toBeInTheDocument();
    });
    it('can masquerade with input', () => {
      const masqueradeInput = 'test';
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        masqueradeInput,
      });
      render(<MasqueradeBar />);
      const valueMasqueradeInput = screen.getByRole('textbox', { value: masqueradeInput });
      expect(valueMasqueradeInput).toBeInTheDocument();
    });
    it('cannot masquerade', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        canMasquerade: false,
      });
      render(<MasqueradeBar />);
      const labelStudentName = screen.queryByText(messages.StudentNameInput.defaultMessage);
      expect(labelStudentName).toBeNull();
    });
    it('is masquerading with input', () => {
      const masqueradeInput = 'test';
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        isMasquerading: true,
        masqueradeInput,
      });
      render(<MasqueradeBar />);
      const chipMasqueradeInput = screen.getByText(masqueradeInput);
      expect(chipMasqueradeInput).toBeInTheDocument();
      expect(chipMasqueradeInput.parentElement).toHaveClass('masquerade-chip');
    });
    it('is masquerading failed with error', () => {
      const masqueradeErrorMessage = 'test-error';
      const masqueradeInput = 'test';
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        isMasqueradingFailed: true,
        masqueradeErrorMessage,
      });
      render(<MasqueradeBar />);
      const valueMasqueradeInput = screen.getByRole('textbox', { value: masqueradeInput });
      expect(valueMasqueradeInput).toHaveClass('is-invalid');
    });
    it('is masquerading pending', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        isMasqueradingPending: true,
      });
      render(<MasqueradeBar />);
      const pendingButton = screen.getByRole('button', { name: messages.SubmitButton.defaultMessage });
      expect(pendingButton).toBeInTheDocument();
      expect(pendingButton).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
