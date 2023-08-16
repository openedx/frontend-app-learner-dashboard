import { shallow } from '@edx/react-unit-test-utils';

import { reduxHooks } from 'hooks';

import UpgradeButton from './UpgradeButton';
import SelectSessionButton from './SelectSessionButton';
import BeginCourseButton from './BeginCourseButton';
import ResumeButton from './ResumeButton';
import ViewCourseButton from './ViewCourseButton';

import CourseCardActions from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
    useMasqueradeData: jest.fn(),
  },
}));

jest.mock('./UpgradeButton', () => 'UpgradeButton');
jest.mock('./SelectSessionButton', () => 'SelectSessionButton');
jest.mock('./ViewCourseButton', () => 'ViewCourseButton');
jest.mock('./BeginCourseButton', () => 'BeginCourseButton');
jest.mock('./ResumeButton', () => 'ResumeButton');

const cardId = 'test-card-id';
const props = { cardId };

let el;
describe('CourseCardActions', () => {
  const mockHooks = ({
    isEntitlement = false,
    isExecEd2UCourse = false,
    isFulfilled = false,
    isArchived = false,
    isVerified = false,
    hasStarted = false,
    isMasquerading = false,
  } = {}) => {
    reduxHooks.useCardEntitlementData.mockReturnValueOnce({ isEntitlement, isFulfilled });
    reduxHooks.useCardCourseRunData.mockReturnValueOnce({ isArchived });
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isExecEd2UCourse, isVerified, hasStarted });
    reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading });
  };
  const render = () => {
    el = shallow(<CourseCardActions {...props} />);
  };
  describe('behavior', () => {
    it('initializes redux hooks', () => {
      mockHooks();
      render();
      expect(reduxHooks.useCardEntitlementData).toHaveBeenCalledWith(cardId);
      expect(reduxHooks.useCardEnrollmentData).toHaveBeenCalledWith(cardId);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('output', () => {
    describe('Exec Ed course', () => {
      it('does not render upgrade button', () => {
        mockHooks({ isExecEd2UCourse: true });
        render();
        expect(el.instance.findByType(UpgradeButton).length).toEqual(0);
      });
    });
    describe('entitlement course', () => {
      it('does not render upgrade button', () => {
        mockHooks({ isEntitlement: true });
        render();
        expect(el.instance.findByType(UpgradeButton).length).toEqual(0);
      });
      it('renders ViewCourseButton if fulfilled', () => {
        mockHooks({ isEntitlement: true, isFulfilled: true });
        render();
        expect(el.instance.findByType(ViewCourseButton)[0].props.cardId).toEqual(cardId);
      });
      it('renders SelectSessionButton if not fulfilled', () => {
        mockHooks({ isEntitlement: true });
        render();
        expect(el.instance.findByType(SelectSessionButton)[0].props.cardId).toEqual(cardId);
      });
    });
    describe('verified course', () => {
      it('does not render upgrade button', () => {
        mockHooks({ isVerified: true });
        render();
        expect(el.instance.findByType(UpgradeButton).length).toEqual(0);
      });
    });
    describe('not entielement, verified, or exec ed', () => {
      it('renders UpgradeButton and ViewCourseButton for archived courses', () => {
        mockHooks({ isArchived: true });
        render();
        expect(el.instance.findByType(UpgradeButton)[0].props.cardId).toEqual(cardId);
        expect(el.instance.findByType(ViewCourseButton)[0].props.cardId).toEqual(cardId);
      });
      describe('unstarted courses', () => {
        it('renders UpgradeButton and BeginCourseButton', () => {
          mockHooks();
          render();
          expect(el.instance.findByType(UpgradeButton)[0].props.cardId).toEqual(cardId);
          expect(el.instance.findByType(BeginCourseButton)[0].props.cardId).toEqual(cardId);
        });
      });
      describe('active courses (started, and not archived)', () => {
        it('renders UpgradeButton and ResumeButton', () => {
          mockHooks({ hasStarted: true });
          render();
          expect(el.instance.findByType(UpgradeButton)[0].props.cardId).toEqual(cardId);
          expect(el.instance.findByType(ResumeButton)[0].props.cardId).toEqual(cardId);
        });
      });
    });
  });
});
