import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import ResumeButton from './ResumeButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(),
    useCardEnrollmentData: jest.fn(),
  },
}));

describe('ResumeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  hooks.useCardCourseRunData.mockReturnValue({
    resumeUrl: 'resumeUrl',
  });
  describe('snapshot', () => {
    it('renders default button', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({
        hasAccess: true,
      });
      const wrapper = shallow(<ResumeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders disabled button', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({
        hasAccess: false,
      });
      const wrapper = shallow(<ResumeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('behavior', () => {
    it('disabled button when audit access expired', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({
        hasAccess: true,
        isAudit: true,
        isAuditAccessExpired: true,
      });
      const wrapper = shallow(<ResumeButton {...props} />);
      expect(wrapper.prop('disabled')).toEqual(true);
    });
    it('enabled button when audit access not expired', () => {
      hooks.useCardEnrollmentData.mockReturnValueOnce({
        hasAccess: true,
        isAudit: true,
        isAuditAccessExpired: false,
      });
      const wrapper = shallow(<ResumeButton {...props} />);
      expect(wrapper.prop('disabled')).toEqual(false);
    });
  });
});
