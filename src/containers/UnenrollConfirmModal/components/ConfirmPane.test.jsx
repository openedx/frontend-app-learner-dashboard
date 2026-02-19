import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useCourseData } from 'hooks';

import { ConfirmPane } from './ConfirmPane';
import messages from './messages';

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
}));

const props = {
  cardId: 'cardId',
  handleClose: jest.fn().mockName('props.handleClose'),
  handleConfirm: jest.fn().mockName('props.handleConfirm'),
};

describe('UnenrollConfirmModal ConfirmPane', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCourseData.mockReturnValue({
      course: {
        courseName: 'Test Course',
      },
    });
    render(<IntlProvider locale="en"><ConfirmPane {...props} /></IntlProvider>);
  });
  it('renders title', () => {
    const header = screen.getByText(formatMessage(messages.confirmHeader));
    expect(header).toBeInTheDocument();
  });
  it('renders cancel button', () => {
    const cancelButton = screen.getByRole('button', { name: formatMessage(messages.confirmCancel) });
    expect(cancelButton).toBeInTheDocument();
  });
  it('renders unenroll button', () => {
    const unenrollButton = screen.getByRole('button', { name: formatMessage(messages.confirmUnenroll) });
    expect(unenrollButton).toBeInTheDocument();
  });
});
