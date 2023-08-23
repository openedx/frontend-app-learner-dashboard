import { when } from 'jest-when';

import { Dropdown } from '@edx/paragon';
import { shallow } from '@edx/react-unit-test-utils';
import { useIntl } from '@edx/frontend-platform/i18n';

import EmailSettingsModal from 'containers/EmailSettingsModal';
import UnenrollConfirmModal from 'containers/UnenrollConfirmModal';
import { reduxHooks } from 'hooks';
import SocialShareMenu from './SocialShareMenu';
import * as hooks from './hooks';
import CourseCardMenu, { testIds } from '.';

jest.mock('@edx/frontend-platform/i18n', () => ({
  useIntl: jest.fn().mockReturnValue({
    formatMessage: jest.requireActual('@edx/react-unit-test-utils').formatMessage,
  }),
}));
jest.mock('hooks', () => ({
  reduxHooks: { useMasqueradeData: jest.fn(), useCardEnrollmentData: jest.fn() },
}));
jest.mock('./SocialShareMenu', () => 'SocialShareMenu');
jest.mock('./hooks', () => ({
  useEmailSettings: jest.fn(),
  useUnenrollData: jest.fn(),
  useHandleToggleDropdown: jest.fn(),
  useOptionVisibility: jest.fn(),
}));

const props = {
  cardId: 'test-card-id',
};

const emailSettings = {
  isVisible: false,
  show: jest.fn().mockName('emailSettingShow'),
  hide: jest.fn().mockName('emailSettingHide'),
};

const unenrollData = {
  isVisible: false,
  show: jest.fn().mockName('unenrollShow'),
  hide: jest.fn().mockName('unenrollHide'),
};

let el;

const mockHook = (fn, returnValue, options = {}) => {
  if (options.isCardHook) {
    when(fn).calledWith(props.cardId).mockReturnValueOnce(returnValue);
  } else {
    when(fn).calledWith().mockReturnValueOnce(returnValue);
  }
};

const handleToggleDropdown = jest.fn().mockName('hooks.handleToggleDropdown');

const mockHooks = (returnVals = {}) => {
  mockHook(
    hooks.useEmailSettings,
    returnVals.emailSettings ? returnVals.emailSettings : emailSettings,
  );
  mockHook(
    hooks.useUnenrollData,
    returnVals.unenrollData ? returnVals.unenrollData : unenrollData,
  );
  mockHook(hooks.useHandleToggleDropdown, handleToggleDropdown, { isCardHook: true });
  mockHook(
    hooks.useOptionVisibility,
    {
      shouldShowUnenrollItem: !!returnVals.shouldShowUnenrollItem,
      shouldShowDropdown: !!returnVals.shouldShowDropdown,
    },
    { isCardHook: true },
  );
  mockHook(reduxHooks.useMasqueradeData, { isMasquerading: !!returnVals.isMasquerading });
  mockHook(
    reduxHooks.useCardEnrollmentData,
    { isEmailEnabled: !!returnVals.isEmailEnabled },
    { isCardHook: true },
  );
};

const render = () => {
  el = shallow(<CourseCardMenu {...props} />);
};

describe('CourseCardMenu', () => {
  describe('behavior', () => {
    beforeEach(() => {
      mockHooks();
      render();
    });
    it('initializes intl hook', () => {
      expect(useIntl).toHaveBeenCalledWith();
    });
    it('initializes local hooks', () => {
      when(hooks.useEmailSettings).expectCalledWith();
      when(hooks.useUnenrollData).expectCalledWith();
      when(hooks.useHandleToggleDropdown).expectCalledWith(props.cardId);
      when(hooks.useOptionVisibility).expectCalledWith(props.cardId);
    });
    it('initializes redux hook data ', () => {
      when(reduxHooks.useMasqueradeData).expectCalledWith();
      when(reduxHooks.useCardEnrollmentData).expectCalledWith(props.cardId);
    });
  });
  describe('render', () => {
    it('renders null if showDropdown is false', () => {
      mockHooks();
      render();
      expect(el.isEmptyRender()).toEqual(true);
    });
    const testHandleToggle = () => {
      it('displays Dropdown with onToggle=handleToggleDropdown', () => {
        expect(el.instance.findByType(Dropdown)[0].props.onToggle).toEqual(handleToggleDropdown);
      });
    };
    const testUnenrollConfirmModal = () => {
      it('displays UnenrollConfirmModal with cardId and unenrollModal data', () => {
        const modal = el.instance.findByType(UnenrollConfirmModal)[0];
        expect(modal.props.show).toEqual(unenrollData.isVisible);
        expect(modal.props.closeModal).toEqual(unenrollData.hide);
        expect(modal.props.cardId).toEqual(props.cardId);
      });
    };
    const testSocialShareMenu = () => {
      it('displays SocialShareMenu with cardID and emailSettings', () => {
        const menu = el.instance.findByType(SocialShareMenu)[0];
        expect(menu.props.cardId).toEqual(props.cardId);
        expect(menu.props.emailSettings).toEqual(emailSettings);
      });
    };
    describe('show dropdown', () => {
      describe('hide unenroll item and disable email', () => {
        beforeEach(() => {
          mockHooks({ shouldShowDropdown: true });
          render();
        });
        test('snapshot', () => {
          expect(el.snapshot).toMatchSnapshot();
        });
        testHandleToggle();
        testSocialShareMenu();
        it('does not render unenroll modal toggle', () => {
          expect(el.instance.findByTestId(testIds.unenrollModalToggle).length).toEqual(0);
        });
        it('does not render EmailSettingsModal', () => {
          expect(el.instance.findByType(EmailSettingsModal).length).toEqual(0);
        });
        testUnenrollConfirmModal();
      });
      describe('show unenroll and enable email', () => {
        const hookProps = {
          shouldShowDropdown: true,
          isEmailEnabled: true,
          shouldShowUnenrollItem: true,
        };
        beforeEach(() => {
          mockHooks(hookProps);
          render();
        });
        test('snapshot', () => {
          expect(el.snapshot).toMatchSnapshot();
        });
        testHandleToggle();
        testSocialShareMenu();
        describe('unenroll modal toggle', () => {
          let toggle;
          describe('not masquerading', () => {
            beforeEach(() => {
              mockHooks(hookProps);
              render();
              [toggle] = el.instance.findByTestId(testIds.unenrollModalToggle);
            });
            it('renders unenroll modal toggle', () => {
              expect(el.instance.findByTestId(testIds.unenrollModalToggle).length).toEqual(1);
            });
            test('onClick from unenroll modal hook', () => {
              expect(toggle.props.onClick).toEqual(unenrollData.show);
            });
            test('disabled', () => {
              expect(toggle.props.disabled).toEqual(false);
            });
          });
          describe('masquerading', () => {
            beforeEach(() => {
              mockHooks({ ...hookProps, isMasquerading: true });
              render();
              [toggle] = el.instance.findByTestId(testIds.unenrollModalToggle);
            });
            it('renders', () => {
              expect(el.instance.findByTestId(testIds.unenrollModalToggle).length).toEqual(1);
            });
            test('onClick from unenroll modal hook', () => {
              expect(toggle.props.onClick).toEqual(unenrollData.show);
            });
            test('disabled', () => {
              expect(toggle.props.disabled).toEqual(true);
            });
          });
        });
        testUnenrollConfirmModal();
        it('displays EmaiSettingsModal with cardId and emailSettingsModal data', () => {
          const modal = el.instance.findByType(EmailSettingsModal)[0];
          expect(modal.props.show).toEqual(emailSettings.isVisible);
          expect(modal.props.closeModal).toEqual(emailSettings.hide);
          expect(modal.props.cardId).toEqual(props.cardId);
        });
      });
    });
  });
});
