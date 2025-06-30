import { when } from 'jest-when';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { render, screen } from '@testing-library/react';

import track from 'tracking';
import { reduxHooks } from 'hooks';

import { useEmailSettings } from './hooks';
import SocialShareMenu from './SocialShareMenu';
import messages from './messages';

jest.mock('tracking', () => ({
  socialShare: 'test-social-share-key',
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useMasqueradeData: jest.fn(),
    useCardCourseData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardSocialSettingsData: jest.fn(),
    useTrackCourseEvent: jest.fn((...args) => ({ trackCourseEvent: args })),
  },
}));
jest.mock('./hooks', () => ({
  useEmailSettings: jest.fn(),
}));

const props = {
  cardId: 'test-card-id',
  emailSettings: { show: jest.fn() },
};

const mockHook = (fn, returnValue, options = {}) => {
  if (options.isCardHook) {
    when(fn).calledWith(props.cardId).mockReturnValue(returnValue);
  } else {
    when(fn).calledWith().mockReturnValue(returnValue);
  }
};

const courseName = 'test-course-name';

const socialShare = {
  facebook: {
    isEnabled: true,
    shareUrl: 'facebook-share-url',
    socialBrand: 'facebook-social-brand',
  },
  twitter: {
    isEnabled: true,
    shareUrl: 'twitter-share-url',
    socialBrand: 'twitter-social-brand',
  },
};

const mockHooks = (returnVals = {}) => {
  mockHook(
    reduxHooks.useCardEnrollmentData,
    {
      isEmailEnabled: !!returnVals.isEmailEnabled,
      isExecEd2UCourse: !!returnVals.isExecEd2UCourse,
    },
    { isCardHook: true },
  );
  mockHook(reduxHooks.useCardCourseData, { courseName }, { isCardHook: true });
  mockHook(reduxHooks.useMasqueradeData, { isMasquerading: !!returnVals.isMasquerading });
  mockHook(
    reduxHooks.useCardSocialSettingsData,
    {
      facebook: { ...socialShare.facebook, isEnabled: !!returnVals.facebook?.isEnabled },
      twitter: { ...socialShare.twitter, isEnabled: !!returnVals.twitter?.isEnabled },
    },
    { isCardHook: true },
  );
};

const renderComponent = () => render(<IntlProvider locale="en"><SocialShareMenu {...props} /></IntlProvider>);

describe('SocialShareMenu', () => {
  describe('behavior', () => {
    beforeEach(() => {
      mockHooks();
      renderComponent();
    });
    it('initializes local hooks', () => {
      when(useEmailSettings).expectCalledWith();
    });
    it('initializes redux hook data ', () => {
      when(reduxHooks.useCardEnrollmentData).expectCalledWith(props.cardId);
      when(reduxHooks.useCardCourseData).expectCalledWith(props.cardId);
      when(reduxHooks.useCardSocialSettingsData).expectCalledWith(props.cardId);
      when(reduxHooks.useMasqueradeData).expectCalledWith();
      when(reduxHooks.useTrackCourseEvent).expectCalledWith(track.socialShare, props.cardId, 'twitter');
      when(reduxHooks.useTrackCourseEvent).expectCalledWith(track.socialShare, props.cardId, 'facebook');
    });
  });
  describe('render', () => {
    it('renders null if exec ed course', () => {
      mockHooks({ isExecEd2UCourse: true });
      renderComponent();
      const emailSettingsButton = screen.queryByRole('button', { name: messages.emailSettings.defaultMessage });
      expect(emailSettingsButton).toBeNull();
      const facebookShareButton = screen.queryByRole('button', { name: 'facebook' });
      expect(facebookShareButton).toBeNull();
      const twitterShareButton = screen.queryByRole('button', { name: 'twitter' });
      expect(twitterShareButton).toBeNull();
    });
    const testEmailSettingsDropdown = (isMasquerading = false) => {
      describe('email settings dropdown', () => {
        it('renders', () => {
          const emailSettingsButton = screen.getByRole('button', { name: messages.emailSettings.defaultMessage });
          expect(emailSettingsButton).toBeInTheDocument();
        });
        if (isMasquerading) {
          it('is disabled', () => {
            const emailSettingsButton = screen.getByRole('button', { name: messages.emailSettings.defaultMessage });
            expect(emailSettingsButton).toHaveAttribute('aria-disabled', 'true');
          });
        } else {
          it('is enabled', () => {
            const emailSettingsButton = screen.getByRole('button', { name: messages.emailSettings.defaultMessage });
            expect(emailSettingsButton).toBeEnabled();
          });
        }
      });
    };
    const testFacebookShareButton = () => {
      it('renders facebook share button', () => {
        const facebookShareButton = screen.getByRole('button', { name: 'facebook' });
        expect(facebookShareButton).toBeInTheDocument();
      });
    };
    const testTwitterShareButton = () => {
      it('renders twitter share button', () => {
        const twitterShareButton = screen.getByRole('button', { name: 'twitter' });
        expect(twitterShareButton).toBeInTheDocument();
      });
    };
    describe('all enabled', () => {
      beforeEach(() => {
        mockHooks({
          facebook: { isEnabled: true },
          twitter: { isEnabled: true },
          isEmailEnabled: true,
        });
        renderComponent();
      });
      testEmailSettingsDropdown();
      testFacebookShareButton();
      testTwitterShareButton();
    });
    describe('only email enabled', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        mockHooks({ isEmailEnabled: true });
        renderComponent();
      });
      testEmailSettingsDropdown();
      it('does not render facebook or twitter controls', () => {
        const facebookShareButton = screen.queryByRole('button', { name: 'facebook' });
        expect(facebookShareButton).toBeNull();
        const twitterShareButton = screen.queryByRole('button', { name: 'twitter' });
        expect(twitterShareButton).toBeNull();
      });
    });
    describe('masquerading', () => {
      beforeEach(() => {
        mockHooks({ isEmailEnabled: true, isMasquerading: true });
        renderComponent();
      });
      testEmailSettingsDropdown(true);
    });
    describe('only facebook enabled', () => {
      beforeEach(() => {
        mockHooks({ facebook: { isEnabled: true } });
        renderComponent();
      });
      testFacebookShareButton();
      it('does not render email or twitter controls', () => {
        const emailSettingsButton = screen.queryByRole('button', { name: messages.emailSettings.defaultMessage });
        expect(emailSettingsButton).toBeNull();
        const twitterShareButton = screen.queryByRole('button', { name: 'twitter' });
        expect(twitterShareButton).toBeNull();
      });
    });
    describe('only twitter enabled', () => {
      beforeEach(() => {
        mockHooks({ twitter: { isEnabled: true } });
        renderComponent();
      });
      testTwitterShareButton();
      it('does not render email or facebook controls', () => {
        const emailSettingsButton = screen.queryByRole('button', { name: messages.emailSettings.defaultMessage });
        expect(emailSettingsButton).toBeNull();
        const facebookShareButton = screen.queryByRole('button', { name: 'facebook' });
        expect(facebookShareButton).toBeNull();
      });
    });
  });
});
