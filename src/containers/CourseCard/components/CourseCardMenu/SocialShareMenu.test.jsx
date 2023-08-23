import { when } from 'jest-when';
import * as ReactShare from 'react-share';

import { useIntl } from '@edx/frontend-platform/i18n';
import { formatMessage, shallow } from '@edx/react-unit-test-utils';

import track from 'tracking';
import { reduxHooks } from 'hooks';

import { useEmailSettings } from './hooks';
import SocialShareMenu, { testIds } from './SocialShareMenu';
import messages from './messages';

jest.mock('react-share', () => ({
  FacebookShareButton: () => 'FacebookShareButton',
  TwitterShareButton: () => 'TwitterShareButton',
}));

jest.mock('tracking', () => ({
  socialShare: 'test-social-share-key',
}));

jest.mock('@edx/frontend-platform/i18n', () => ({
  useIntl: jest.fn().mockReturnValue({
    formatMessage: jest.requireActual('@edx/react-unit-test-utils').formatMessage,
  }),
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
    when(fn).calledWith(props.cardId).mockReturnValueOnce(returnValue);
  } else {
    when(fn).calledWith().mockReturnValueOnce(returnValue);
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

let el;
const render = () => {
  el = shallow(<SocialShareMenu {...props} />);
};

describe('SocialShareMenu', () => {
  describe('behavior', () => {
    beforeEach(() => {
      mockHooks();
      render();
    });
    it('initializes intl hook', () => {
      expect(useIntl).toHaveBeenCalledWith();
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
      render();
      expect(el.isEmptyRender()).toEqual(true);
    });
    const testEmailSettingsDropdown = (isMasquerading = false) => {
      describe('email settings dropdown', () => {
        const loadToggle = () => el.instance.findByTestId(testIds.emailSettingsModalToggle)[0];
        it('renders', () => {
          expect(el.instance.findByTestId(testIds.emailSettingsModalToggle).length).toEqual(1);
        });
        if (isMasquerading) {
          it('is disabled', () => {
            expect(loadToggle().props.disabled).toEqual(true);
          });
        } else {
          it('is enabled', () => {
            expect(loadToggle().props.disabled).toEqual(false);
          });
        }
        test('show email settings modal on click', () => {
          expect(loadToggle().props.onClick).toEqual(props.emailSettings.show);
        });
      });
    };
    const testFacebookShareButton = () => {
      test('renders facebook share button with courseName and brand', () => {
        const button = el.instance.findByType(ReactShare.FacebookShareButton)[0];
        expect(button.props.url).toEqual(socialShare.facebook.shareUrl);
        expect(button.props.onClick).toEqual(
          reduxHooks.useTrackCourseEvent(track.socialShare, props.cardId, 'facebook'),
        );
        expect(button.props.title).toEqual(formatMessage(messages.shareQuote, {
          courseName,
          socialBrand: socialShare.facebook.socialBrand,
        }));
      });
    };
    const testTwitterShareButton = () => {
      test('renders twitter share button with courseName and brand', () => {
        const button = el.instance.findByType(ReactShare.TwitterShareButton)[0];
        expect(button.props.url).toEqual(socialShare.twitter.shareUrl);
        expect(button.props.onClick).toEqual(
          reduxHooks.useTrackCourseEvent(track.socialShare, props.cardId, 'twitter'),
        );
        expect(button.props.title).toEqual(formatMessage(messages.shareQuote, {
          courseName,
          socialBrand: socialShare.twitter.socialBrand,
        }));
      });
    };
    describe('all enabled', () => {
      beforeEach(() => {
        mockHooks({
          facebook: { isEnabled: true },
          twitter: { isEnabled: true },
          isEmailEnabled: true,
        });
        render();
      });
      describe('email settings dropdown', () => {
        const loadToggle = () => el.instance.findByTestId(testIds.emailSettingsModalToggle)[0];
        it('renders', () => {
          expect(el.instance.findByTestId(testIds.emailSettingsModalToggle).length).toEqual(1);
        });
        it('is enabled', () => {
          expect(loadToggle().props.disabled).toEqual(false);
        });
        test('show email settings modal on click', () => {
          expect(loadToggle().props.onClick).toEqual(props.emailSettings.show);
        });
      });
      testEmailSettingsDropdown();
      testFacebookShareButton();
      testTwitterShareButton();
    });
    describe('only email enabled', () => {
      beforeEach(() => {
        mockHooks({ isEmailEnabled: true });
        render();
      });
      testEmailSettingsDropdown();
      it('does not render facebook or twitter controls', () => {
        expect(el.instance.findByType(ReactShare.FacebookShareButton).length).toEqual(0);
        expect(el.instance.findByType(ReactShare.TwitterShareButton).length).toEqual(0);
      });
      describe('masquerading', () => {
        beforeEach(() => {
          mockHooks({ isEmailEnabled: true, isMasquerading: true });
          render();
        });
        testEmailSettingsDropdown(true);
      });
    });
    describe('only facebook enabled', () => {
      beforeEach(() => {
        mockHooks({ facebook: { isEnabled: true } });
        render();
      });
      testFacebookShareButton();
      it('does not render email or twitter controls', () => {
        expect(el.instance.findByTestId(testIds.emailSettingsModalToggle).length).toEqual(0);
        expect(el.instance.findByType(ReactShare.TwitterShareButton).length).toEqual(0);
      });
    });
    describe('only twitter enabled', () => {
      beforeEach(() => {
        mockHooks({ twitter: { isEnabled: true } });
        render();
      });
      testTwitterShareButton();
      it('does not render email or facebook controls', () => {
        expect(el.instance.findByTestId(testIds.emailSettingsModalToggle).length).toEqual(0);
        expect(el.instance.findByType(ReactShare.FacebookShareButton).length).toEqual(0);
      });
    });
  });
});
