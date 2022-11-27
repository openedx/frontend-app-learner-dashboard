import { shallow } from 'enzyme';

import * as hooks from './hooks';
import InterviewWidget from '.';

jest.mock('./hooks', () => ({
  useDismissPanel: jest.fn(),
}));

describe('InterviewWidget', () => {
  describe('snapshots', () => {
    test('default', () => {
      hooks.useDismissPanel.mockReturnValueOnce({
        hideWidget: false,
        handleDismiss: jest.fn(),
      });
      const wrapper = shallow(<InterviewWidget />);
      expect(wrapper).toMatchSnapshot();
    });
    test('dismissed', () => {
      hooks.useDismissPanel.mockReturnValueOnce({
        hideWidget: true,
        handleDismiss: jest.fn(),
      });
      const wrapper = shallow(<InterviewWidget />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
