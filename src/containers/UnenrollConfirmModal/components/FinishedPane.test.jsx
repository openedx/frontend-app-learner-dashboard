import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { FinishedPane } from './FinishedPane';
import messages from './messages';

const props = {
  cardId: 'cardId',
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
      const finishSuccessMessage = screen.getByText((text) => text.includes('Unenrollment Successful'));
      expect(finishSuccessMessage).toBeInTheDocument();
    });
  });
});
