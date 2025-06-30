import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { UnenrollConfirmModal } from '.';

import * as hooks from './hooks';
import messages from './components/messages';

jest.mock('./hooks', () => ({
  __esModule: true,
  modalStates: jest.requireActual('./hooks').modalStates,
  useUnenrollData: jest.fn(),
}));

describe('UnenrollConfirmModal component', () => {
  const hookProps = {
    confirm: jest.fn().mockName('hooks.confirm'),
    reason: {
      isSkipped: false,
      reasonProps: 'other',
    },
    close: jest.fn().mockName('hooks.close'),
    closeAndRefresh: jest.fn().mockName('hooks.closeAndRefresh'),
    modalState: hooks.modalStates.confirm,
  };
  const closeModal = jest.fn().mockName('closeModal');
  const cardId = 'cardId';
  const props = {
    closeModal,
    show: true,
    cardId,
  };
  it('hooks called with closeModal and cardId', () => {
    hooks.useUnenrollData.mockReturnValueOnce(hookProps);
    render(<IntlProvider><UnenrollConfirmModal {...props} /></IntlProvider>);
    expect(hooks.useUnenrollData).toHaveBeenCalledWith({ closeModal, cardId });
  });
  it('modalStates.confirm display correct component and to have class shadow', () => {
    hooks.useUnenrollData.mockReturnValueOnce(hookProps);
    render(<IntlProvider><UnenrollConfirmModal {...props} /></IntlProvider>);
    const confirmHeader = screen.getByText(formatMessage(messages.confirmHeader));
    expect(confirmHeader).toBeInTheDocument();
    const dialogContainer = screen.getByRole('dialog').firstElementChild;
    expect(dialogContainer).toHaveClass('shadow');
  });
  it('modalStates.finished, reason given, display correct component', () => {
    hooks.useUnenrollData.mockReturnValueOnce({ ...hookProps, modalState: hooks.modalStates.finished });
    render(<IntlProvider><UnenrollConfirmModal {...props} /></IntlProvider>);
    const finishHeading = screen.getByText(formatMessage(messages.finishHeading));
    expect(finishHeading).toBeInTheDocument();
    const thanksMsg = screen.getByText((text) => text.includes('Thank you'));
    expect(thanksMsg).toBeInTheDocument();
    expect(thanksMsg.innerHTML).toContain(formatMessage(messages.finishThanksText));
  });
  it('modalStates.finished, reason skipped', () => {
    hooks.useUnenrollData.mockReturnValueOnce({
      ...hookProps,
      modalState: hooks.modalStates.finished,
      reason: { isSkipped: true },
    });
    render(<IntlProvider><UnenrollConfirmModal {...props} /></IntlProvider>);
    const finishHeading = screen.getByText(formatMessage(messages.finishHeading));
    expect(finishHeading).toBeInTheDocument();
    const thanksMsg = screen.queryByText((text) => text.includes('Thank you'));
    expect(thanksMsg).toBeNull();
    const finishMsg = screen.getByText(formatMessage(messages.finishText));
    expect(finishMsg).toBeInTheDocument();
  });
  it('modalStates.reason, should display correct component with no shadow', () => {
    hooks.useUnenrollData.mockReturnValueOnce({ ...hookProps, modalState: hooks.modalStates.reason });
    render(<IntlProvider><UnenrollConfirmModal {...props} /></IntlProvider>);
    const reasonHeading = screen.getByText(formatMessage(messages.reasonHeading));
    expect(reasonHeading).toBeInTheDocument();
    const dialogContainer = screen.getByRole('dialog').firstElementChild;
    expect(dialogContainer).not.toHaveClass('shadow');
  });
});
