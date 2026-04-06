import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useCourseData } from 'hooks';
import track from 'tracking';

import messages from './messages';
import EligibleContent from './EligibleContent';

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
}));

jest.mock('tracking', () => ({
  credit: {
    purchase: jest.fn(),
  },
}));

const cardId = 'test-card-id';
const courseId = 'test-course-id';
const credit = {
  providerName: 'test-credit-provider-name',
};
useCourseData.mockReturnValue({ credit, courseRun: { courseId } });

const renderEligibleContent = () => render(<IntlProvider locale="en" messages={{}}><EligibleContent cardId={cardId} /></IntlProvider>);

describe('EligibleContent component', () => {
  describe('hooks', () => {
    it('initializes credit data with cardId', () => {
      renderEligibleContent();
      expect(useCourseData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('behavior', () => {
    describe('rendered CreditContent component', () => {
      it('action message is formatted getCredit message', () => {
        renderEligibleContent();
        const button = screen.getByRole('button', { name: messages.getCredit.defaultMessage });
        expect(button).toBeInTheDocument();
      });
      it('onClick sends credit purchase track event', async () => {
        const user = userEvent.setup();
        renderEligibleContent();
        const button = screen.getByRole('button', { name: messages.getCredit.defaultMessage });
        await user.click(button);
        expect(track.credit.purchase).toHaveBeenCalledWith(courseId);
      });
      it('message is formatted eligible message if provider', () => {
        renderEligibleContent();
        const eligibleMessage = screen.getByTestId('credit-msg');
        expect(eligibleMessage).toBeInTheDocument();
        expect(eligibleMessage).toHaveTextContent(credit.providerName);
      });
      it('message is formatted eligible message if no provider', () => {
        useCourseData.mockReturnValue({ credit: {}, courseRun: { courseId } });
        renderEligibleContent();
        const eligibleMessage = screen.getByTestId('credit-msg');
        expect(eligibleMessage).toBeInTheDocument();
        expect(eligibleMessage).toHaveTextContent(messages.getCredit.defaultMessage);
      });
    });
  });
});
