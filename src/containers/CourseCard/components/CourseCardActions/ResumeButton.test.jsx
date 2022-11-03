import { shallow } from 'enzyme';

import { htmlProps } from 'data/constants/htmlKeys';
import { hooks } from 'data/redux';
import ResumeButton from './ResumeButton';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCourseRunData: jest.fn(() => ({ resumeUrl: 'resumeUrl' })),
    useCardEnrollmentData: jest.fn(() => ({
      hasAccess: true,
      isAudit: true,
      isAuditAccessExpired: false,
    })),
    useMasqueradeData: jest.fn(() => ({ isMasquerading: false })),
  },
}));

const { resumeUrl } = hooks.useCardCourseRunData();

describe('ResumeButton', () => {
  const props = {
    cardId: 'cardId',
    isSmall: false,
  };
  describe('snapshot', () => {
    test('renders default button when learner has access to the course', () => {
      const wrapper = shallow(<ResumeButton {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.disabled)).toEqual(false);
      expect(wrapper.prop(htmlProps.href)).toEqual(resumeUrl);
    });
    test('render small button when isSmall is true', () => {
      const wrapper = shallow(<ResumeButton {...props} isSmall />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.prop(htmlProps.size)).toEqual('sm');
    });
  });
  describe('behavior', () => {
    it('initializes course run data based on cardId', () => {
      shallow(<ResumeButton {...props} />);
      expect(hooks.useCardCourseRunData).toHaveBeenCalledWith(props.cardId);
    });
    it('initializes course enrollment data based on cardId', () => {
      shallow(<ResumeButton {...props} />);
      expect(hooks.useCardEnrollmentData).toHaveBeenCalledWith(props.cardId);
    });
    describe('disabled states', () => {
      test('masquerading', () => {
        hooks.useMasqueradeData.mockReturnValueOnce({ isMasquerading: true });
        const wrapper = shallow(<ResumeButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('learner does not have access', () => {
        hooks.useCardEnrollmentData.mockReturnValueOnce({
          hasAccess: false,
          isAudit: true,
          isAuditAccessExpired: false,
        });
        const wrapper = shallow(<ResumeButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
      test('audit access expired', () => {
        hooks.useCardEnrollmentData.mockReturnValueOnce({
          hasAccess: true,
          isAudit: true,
          isAuditAccessExpired: true,
        });
        const wrapper = shallow(<ResumeButton {...props} />);
        expect(wrapper.prop(htmlProps.disabled)).toEqual(true);
      });
    });
  });
});
