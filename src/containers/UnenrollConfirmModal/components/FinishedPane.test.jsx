import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from 'react-intl';

import { FinishedPane } from './FinishedPane';
import messages from './messages';

jest.unmock('@edx/frontend-platform/i18n');
jest.unmock('@openedx/paragon');
jest.unmock('react');

describe('UnenrollConfirmModal FinishedPane', () => {
  it('renders heading', () => {
    const props = {
      gaveReason: true,
      handleClose: jest.fn().mockName('props.handleClose'),
    };
    render(<IntlProvider locale="en"><FinishedPane {...props} /></IntlProvider>);
    const heading = screen.getByText(formatMessage(messages.finishHeading));
    expect(heading).toBeInTheDocument();
  });
  it('renders return button', () => {
    const props = {
      gaveReason: true,
      handleClose: jest.fn().mockName('props.handleClose'),
    };
    render(<IntlProvider locale="en"><FinishedPane {...props} /></IntlProvider>);
    const returnButton = screen.getByRole('button', { name: formatMessage(messages.finishReturn) });
    expect(returnButton).toBeInTheDocument();
  });
  it('Gave reason, display thanks message', () => {
    const props = {
      gaveReason: true,
      handleClose: jest.fn().mockName('props.handleClose'),
    };
    render(<IntlProvider locale="en"><FinishedPane {...props} /></IntlProvider>);
    const thanksMsg = screen.getByText((text) => text.includes('Thank you'));
    expect(thanksMsg).toBeInTheDocument();
    expect(thanksMsg.innerHTML).toContain(formatMessage(messages.finishThanksText));
  });
  it('Did not give reason, so not display thanks message', () => {
    const props = {
      gaveReason: false,
      handleClose: jest.fn().mockName('props.handleClose'),
    };
    render(<IntlProvider locale="en"><FinishedPane {...props} /></IntlProvider>);
    const thanksMsg = screen.queryByText((text) => text.includes('Thank you'));
    expect(thanksMsg).toBeNull();
    const finishMsg = screen.getByText(formatMessage(messages.finishText));
    expect(finishMsg).toBeInTheDocument();
  });
});
