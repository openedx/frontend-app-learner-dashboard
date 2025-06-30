import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import hooks from './hooks';
import EmailSettingsModal from '.';
import messages from './messages';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const hookProps = {
  isOptedOut: true,
  onToggle: jest.fn().mockName('hooks.onToggle'),
  save: jest.fn().mockName('hooks.save'),
};

const props = {
  closeModal: jest.fn().mockName('closeModal'),
  show: true,
  cardId: 'test-course-number',
};

describe('EmailSettingsModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('behavior', () => {
    beforeEach(() => {
      hooks.mockReturnValueOnce(hookProps);
      render(<IntlProvider locale="en"><EmailSettingsModal {...props} /></IntlProvider>);
    });
    it('calls hook w/ closeModal and cardId from props', () => {
      expect(hooks).toHaveBeenCalledWith({
        closeModal: props.closeModal,
        cardId: props.cardId,
      });
    });
  });
  describe('render', () => {
    it('emails disabled, show: false', () => {
      hooks.mockReturnValue(hookProps);
      render(<IntlProvider locale="en"><EmailSettingsModal {...props} show={false} /></IntlProvider>);
      const modal = screen.queryByRole('dialog');
      expect(modal).toBeNull();
    });
    it('emails disabled, show: true', () => {
      hooks.mockReturnValueOnce(hookProps);
      render(<IntlProvider locale="en"><EmailSettingsModal {...props} /></IntlProvider>);
      const modal = screen.getByRole('dialog');
      const heading = screen.getByText(messages.header.defaultMessage);
      const emailsMsg = screen.getByText(messages.emailsOff.defaultMessage);
      expect(modal).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(emailsMsg).toBeInTheDocument();
    });
    it('emails enabled, show: true', () => {
      hooks.mockReturnValueOnce({
        ...hookProps,
        isOptedOut: false,
      });
      render(<IntlProvider locale="en"><EmailSettingsModal {...props} /></IntlProvider>);
      const emailsMsg = screen.getByText(messages.emailsOn.defaultMessage);
      const description = screen.getByText(messages.description.defaultMessage);
      const buttonNeverMind = screen.getByRole('button', { name: messages.nevermind.defaultMessage });
      const buttonSave = screen.getByRole('button', { name: messages.save.defaultMessage });
      expect(emailsMsg).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(buttonNeverMind).toBeInTheDocument();
      expect(buttonSave).toBeInTheDocument();
    });
  });
});
