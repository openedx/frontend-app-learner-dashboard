import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import hooks from './hooks';
import ConfirmEmailBanner from '.';
import messages from './messages';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const hookProps = {
  isNeeded: true,
  showPageBanner: jest.fn().mockName('showPageBanner'),
  closePageBanner: jest.fn().mockName('closePageBanner'),
  showConfirmModal: jest.fn().mockName('showConfirmModal'),
  closeConfirmModal: jest.fn().mockName('closeConfirmModal'),
  openConfirmModalButtonClick: jest.fn().mockName('openConfirmModalButtonClick'),
  userConfirmEmailButtonClick: jest.fn().mockName('userConfirmEmailButtonClick'),
};

describe('ConfirmEmailBanner', () => {
  describe('render', () => {
    it('do not show on already verified', () => {
      hooks.mockReturnValueOnce({ ...hookProps, isNeeded: false });
      render(<IntlProvider locale="en"><ConfirmEmailBanner /></IntlProvider>);
      const banner = screen.queryByRole('alert');
      expect(banner).toBeNull();
    });
    describe('On unverified', () => {
      beforeEach(() => {
        hooks.mockReturnValueOnce({ ...hookProps });
        render(<IntlProvider locale="en"><ConfirmEmailBanner /></IntlProvider>);
      });
      it('show banner', () => {
        const banner = screen.getByRole('alert');
        expect(banner).toContainHTML('Remember to confirm');
      });
      it('show confirm now button', () => {
        const confirmButton = screen.getByRole('button', { name: messages.confirmNowButton.defaultMessage });
        expect(confirmButton).toBeInTheDocument();
      });
      it('show modal', () => {
        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
      });
      it('show modal header and body', () => {
        const modalHeader = screen.getByText(messages.confirmEmailModalHeader.defaultMessage);
        expect(modalHeader).toBeInTheDocument();
        const modalBody = screen.getByText(messages.confirmEmailModalBody.defaultMessage);
        expect(modalBody).toBeInTheDocument();
      });
      it('show confirm image', () => {
        const confirmButton = screen.getByRole('img', { name: messages.confirmEmailImageAlt.defaultMessage });
        expect(confirmButton).toBeInTheDocument();
      });
      it('show confirm email button', () => {
        const confirmButton = screen.getByRole('button', { name: messages.verifiedConfirmEmailButton.defaultMessage });
        expect(confirmButton).toBeInTheDocument();
      });
    });
  });
});
