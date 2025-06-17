import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import hooks from './hooks';
import SelectSessionModal from '.';
import messages from './messages';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const hookReturn = {
  availableSessions: [],
  showModal: true,
  closeSessionModal: jest.fn().mockName('useSelectSessionModalData.closeSessionModal'),
  showLeaveOption: true,
  header: 'test-header',
  hint: 'test-hint',
};

const availableSessions = [
  { startDate: '1/2/2000', endDate: '1/2/2020', courseId: 'test-course-id-1' },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseId: 'test-course-id-2' },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseId: 'test-course-id-3' },
];

describe('SelectSessionModal', () => {
  describe('renders', () => {
    it('empty modal with leave option ', () => {
      hooks.mockReturnValueOnce({
        ...hookReturn,
      });
      render(<IntlProvider locale="en"><SelectSessionModal /></IntlProvider>);
      const sessionOption = screen.queryByDisplayValue(availableSessions[0].courseId);
      expect(sessionOption).toBeNull();
      const leaveOption = screen.getByRole('radio', { name: formatMessage(messages.leaveSessionOption) });
      expect(leaveOption).toBeInTheDocument();
    });

    it('modal with leave option ', () => {
      hooks.mockReturnValueOnce({
        ...hookReturn,
        availableSessions,
      });
      render(<IntlProvider locale="en"><SelectSessionModal /></IntlProvider>);
      const sessionOption = screen.getByDisplayValue(availableSessions[0].courseId);
      expect(sessionOption).toBeInTheDocument();
      const leaveOption = screen.getByRole('radio', { name: formatMessage(messages.leaveSessionOption) });
      expect(leaveOption).toBeInTheDocument();
    });

    it('modal without leave option ', () => {
      hooks.mockReturnValueOnce({
        ...hookReturn,
        availableSessions,
        showLeaveOption: false,
      });
      render(<IntlProvider locale="en"><SelectSessionModal /></IntlProvider>);
      const sessionOption = screen.getByDisplayValue(availableSessions[0].courseId);
      expect(sessionOption).toBeInTheDocument();
      const leaveOption = screen.queryByRole('radio', { name: formatMessage(messages.leaveSessionOption) });
      expect(leaveOption).toBeNull();
    });
  });
});
