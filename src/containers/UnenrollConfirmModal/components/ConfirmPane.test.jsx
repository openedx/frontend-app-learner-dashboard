import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from 'react-intl';

import { ConfirmPane } from './ConfirmPane';
import messages from './messages';

jest.unmock('@edx/frontend-platform/i18n');
jest.unmock('@openedx/paragon');
jest.unmock('react');

describe('UnenrollConfirmModal ConfirmPane', () => {
  it('renders title', () => {
    const props = {
      handleClose: jest.fn().mockName('props.handleClose'),
      handleConfirm: jest.fn().mockName('props.handleConfirm'),
    };
    render(<IntlProvider locale="en"><ConfirmPane {...props} /></IntlProvider>);
    const header = screen.getByText(formatMessage(messages.confirmHeader));
    expect(header).toBeInTheDocument();
  });
  it('renders cancel button', () => {
    const props = {
      handleClose: jest.fn().mockName('props.handleClose'),
      handleConfirm: jest.fn().mockName('props.handleConfirm'),
    };
    render(<IntlProvider locale="en"><ConfirmPane {...props} /></IntlProvider>);
    const cancelButton = screen.getByRole('button', { name: formatMessage(messages.confirmCancel) });
    expect(cancelButton).toBeInTheDocument();
  });
  it('renders unenroll button', () => {
    const props = {
      handleClose: jest.fn().mockName('props.handleClose'),
      handleConfirm: jest.fn().mockName('props.handleConfirm'),
    };
    render(<IntlProvider locale="en"><ConfirmPane {...props} /></IntlProvider>);
    const unenrollButton = screen.getByRole('button', { name: formatMessage(messages.confirmUnenroll) });
    expect(unenrollButton).toBeInTheDocument();
  });
});
