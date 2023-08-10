import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';

import CourseCardActions from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
    useCardEntitlementData: jest.fn(),
    useMasqueradeData: jest.fn(),
  },
}));

jest.mock('../hooks', () => jest.fn(() => ({ isExecutiveEd2uCourse: false })));

jest.mock('./UpgradeButton', () => 'UpgradeButton');
jest.mock('./SelectSessionButton', () => 'SelectSessionButton');
jest.mock('./ViewCourseButton', () => 'ViewCourseButton');
jest.mock('./BeginCourseButton', () => 'BeginCourseButton');
jest.mock('./ResumeButton', () => 'ResumeButton');

describe('CourseCardActions', () => {
  const props = {
    cardId: 'cardId',
  };
  const createWrapper = ({
    isEntitlement, isFulfilled, isArchived, isVerified, hasStarted, isMasquerading,
  }) => {
    reduxHooks.useCardEntitlementData.mockReturnValueOnce({ isEntitlement, isFulfilled });
    reduxHooks.useCardCourseRunData.mockReturnValueOnce({ isArchived });
    reduxHooks.useCardEnrollmentData.mockReturnValueOnce({ isVerified, hasStarted });
    reduxHooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading });
    return shallow(<CourseCardActions {...props} />);
  };
  describe('snapshot', () => {
    test('show upgrade button when not verified and not entitlement', () => {
      const wrapper = createWrapper({
        isEntitlement: false, isFulfilled: false, isArchived: false, isVerified: false, hasStarted: false,
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('show select session button when not verified and entitlement', () => {
      const wrapper = createWrapper({
        isEntitlement: true, isFulfilled: false, isArchived: false, isVerified: false, hasStarted: false,
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('show begin course button when verified and not entitlement and has started', () => {
      const wrapper = createWrapper({
        isEntitlement: false, isFulfilled: false, isArchived: false, isVerified: true, hasStarted: false,
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('show resume button when verified and not entitlement and has started', () => {
      const wrapper = createWrapper({
        isEntitlement: false, isFulfilled: false, isArchived: false, isVerified: true, hasStarted: true,
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('show view course button when not verified and entitlement and fulfilled', () => {
      const wrapper = createWrapper({
        isEntitlement: true, isFulfilled: true, isArchived: false, isVerified: false, hasStarted: false,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behavior', () => {
    it('show upgrade button when not verified and not entitlement', () => {
      const wrapper = createWrapper({
        isEntitlement: false, isFulfilled: false, isArchived: false, isVerified: false, hasStarted: false,
      });
      expect(wrapper.find('UpgradeButton')).toHaveLength(1);
    });
    it('show select session button when not verified and entitlement', () => {
      const wrapper = createWrapper({
        isEntitlement: true, isFulfilled: false, isArchived: false, isVerified: false, hasStarted: false,
      });
      expect(wrapper.find('SelectSessionButton')).toHaveLength(1);
    });
    it('show begin course button when verified and not entitlement and has started', () => {
      const wrapper = createWrapper({
        isEntitlement: false, isFulfilled: false, isArchived: false, isVerified: true, hasStarted: false,
      });
      expect(wrapper.find('BeginCourseButton')).toHaveLength(1);
    });
    it('show resume button when verified and not entitlement and has started', () => {
      const wrapper = createWrapper({
        isEntitlement: false, isFulfilled: false, isArchived: false, isVerified: true, hasStarted: true,
      });
      expect(wrapper.find('ResumeButton')).toHaveLength(1);
    });
    it('show view course button when not verified and entitlement and fulfilled', () => {
      const wrapper = createWrapper({
        isEntitlement: true, isFulfilled: true, isArchived: false, isVerified: false, hasStarted: false,
      });
      expect(wrapper.find('ViewCourseButton')).toHaveLength(1);
    });
    it('show view course button when not verified and entitlement and fulfilled and archived', () => {
      const wrapper = createWrapper({
        isEntitlement: true, isFulfilled: true, isArchived: true, isVerified: false, hasStarted: false,
      });
      expect(wrapper.find('ViewCourseButton')).toHaveLength(1);
    });
  });
});
