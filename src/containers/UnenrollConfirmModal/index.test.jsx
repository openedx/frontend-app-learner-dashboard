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
    const finishMsg = screen.getByText((text) => text.includes('You have been unenrolled from the course'));
    expect(finishMsg).toBeInTheDocument();
  });
  it('modalStates.finished, cancel unenrollment', () => {
    hooks.useUnenrollData.mockReturnValueOnce({
      ...hookProps,
      modalState: hooks.modalStates.finished,
    });
    render(<IntlProvider><UnenrollConfirmModal {...props} /></IntlProvider>);
    const finishHeading = screen.getByText(formatMessage(messages.finishHeading));
    expect(finishHeading).toBeInTheDocument();
    const okButton = screen.queryByText((text) => text.includes('Ok'));
    expect(okButton).toBeInTheDocument();
    const finishMsg = screen.queryByText('You have been unenrolled from the course');
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
