import { render, screen } from '@testing-library/react';
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

jest.mock('plugin-slots/CourseCardActionSlot', () => jest.fn(() => <div>CourseCardActionSlot</div>));
jest.mock('./SelectSessionButton', () => jest.fn(() => <div>SelectSessionButton</div>));
jest.mock('./ViewCourseButton', () => jest.fn(() => <div>ViewCourseButton</div>));
jest.mock('./BeginCourseButton', () => jest.fn(() => <div>BeginCourseButton</div>));
jest.mock('./ResumeButton', () => jest.fn(() => <div>ResumeButton</div>));

const cardId = 'test-card-id';
const props = { cardId };

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
  const renderComponent = () => render(<CourseCardActions {...props} />);
  describe('hooks', () => {
    it('initializes redux hooks', () => {
      mockHooks();
      renderComponent();
      expect(reduxHooks.useCardEntitlementData).toHaveBeenCalledWith(cardId);
      expect(reduxHooks.useCardEnrollmentData).toHaveBeenCalledWith(cardId);
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('output', () => {
    describe('entitlement course', () => {
      it('renders ViewCourseButton if fulfilled', () => {
        mockHooks({ isEntitlement: true, isFulfilled: true });
        renderComponent();
        const ViewCourseButton = screen.getByText('ViewCourseButton');
        expect(ViewCourseButton).toBeInTheDocument();
      });
      it('renders SelectSessionButton if not fulfilled', () => {
        mockHooks({ isEntitlement: true });
        renderComponent();
        const SelectSessionButton = screen.getByText('SelectSessionButton');
        expect(SelectSessionButton).toBeInTheDocument();
      });
    });
    describe('not entitlement, verified, or exec ed', () => {
      it('renders CourseCardActionSlot and ViewCourseButton for archived courses', () => {
        mockHooks({ isArchived: true });
        renderComponent();
        const CourseCardActionSlot = screen.getByText('CourseCardActionSlot');
        expect(CourseCardActionSlot).toBeInTheDocument();
        const ViewCourseButton = screen.getByText('ViewCourseButton');
        expect(ViewCourseButton).toBeInTheDocument();
      });
      describe('unstarted courses', () => {
        it('renders CourseCardActionSlot and BeginCourseButton', () => {
          mockHooks();
          renderComponent();
          const CourseCardActionSlot = screen.getByText('CourseCardActionSlot');
          expect(CourseCardActionSlot).toBeInTheDocument();
          const BeginCourseButton = screen.getByText('BeginCourseButton');
          expect(BeginCourseButton).toBeInTheDocument();
        });
      });
      describe('active courses (started, and not archived)', () => {
        it('renders CourseCardActionSlot and ResumeButton', () => {
          mockHooks({ hasStarted: true });
          renderComponent();
          const CourseCardActionSlot = screen.getByText('CourseCardActionSlot');
          expect(CourseCardActionSlot).toBeInTheDocument();
          const ResumeButton = screen.getByText('ResumeButton');
          expect(ResumeButton).toBeInTheDocument();
        });
      });
    });
  });
});
