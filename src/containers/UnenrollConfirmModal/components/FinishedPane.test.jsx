import { render, screen } from '@testing-library/react';
import { formatMessage } from '@src/testUtils';
import { IntlProvider } from '@openedx/frontend-base';
import { useCourseData } from '@src/hooks';

import { FinishedPane } from './FinishedPane';
import messages from './messages';

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(),
}));

const props = {
  cardId: 'cardId',
  handleClose: jest.fn().mockName('props.handleClose'),
};

describe('UnenrollConfirmModal FinishedPane', () => {
  describe('gave reason', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      useCourseData.mockReturnValue({
        course: {
          courseName: 'Test Course',
        },
      });
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
