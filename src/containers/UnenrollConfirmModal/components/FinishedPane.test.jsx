import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { FinishedPane } from './FinishedPane';
import messages from './messages';

const props = {
  gaveReason: true,
  handleClose: jest.fn().mockName('props.handleClose'),
};

describe('UnenrollConfirmModal FinishedPane', () => {
  describe('gave reason', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      render(<IntlProvider locale="en"><FinishedPane {...props} /></IntlProvider>);
    });
    it('renders heading', () => {
      const heading = screen.getByText(formatMessage(messages.finishHeading));
      expect(heading).toBeInTheDocument();
    });
    it('renders return button', () => {
      const returnButton = screen.getByRole('button', { name: formatMessage(messages.finishReturn) });
      expect(returnButton).toBeInTheDocument();
    });
    it('Gave reason, display thanks message', () => {
      const thanksMsg = screen.getByText((text) => text.includes('Thank you'));
      expect(thanksMsg).toBeInTheDocument();
      expect(thanksMsg.innerHTML).toContain(formatMessage(messages.finishThanksText));
    });
  });
  describe('Did not give reason', () => {
    it('Does not display thanks message', () => {
      const customProps = {
        gaveReason: false,
        handleClose: jest.fn().mockName('props.handleClose'),
      };
      render(<IntlProvider locale="en"><FinishedPane {...customProps} /></IntlProvider>);
      const thanksMsg = screen.queryByText((text) => text.includes('Thank you'));
      expect(thanksMsg).toBeNull();
      const finishMsg = screen.getByText(formatMessage(messages.finishText));
      expect(finishMsg).toBeInTheDocument();
    });
  });
});
