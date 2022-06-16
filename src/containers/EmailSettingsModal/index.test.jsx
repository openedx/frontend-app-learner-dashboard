import React from 'react';
import { useDispatch } from 'react-redux';
import { shallow } from 'enzyme';

import hooks from './hooks';
import EmailSettingsModal from '.';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const hookProps = {
  toggleValue: false,
  onToggle: jest.fn().mockName('hooks.onToggle'),
  save: jest.fn().mockName('hooks.save'),
};

const props = {
  closeModal: jest.fn().mockName('closeModal'),
  show: true,
  courseNumber: 'test-course-number',
};

const dispatch = useDispatch();

describe('EmailSettingsModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('behavior', () => {
    beforeEach(() => {
      hooks.mockReturnValueOnce(hookProps);
      shallow(<EmailSettingsModal {...props} />);
    });
    it('calls hook w/ dispatch from redux hook, and closeModal, courseNumber from props', () => {
      expect(hooks).toHaveBeenCalledWith({
        closeModal: props.closeModal,
        dispatch,
        courseNumber: props.courseNumber,
      });
    });
  });
  describe('render', () => {
    test('snapshot: emails disabled, show: false', () => {
      hooks.mockReturnValueOnce(hookProps);
      expect(shallow(<EmailSettingsModal {...props} show={false} />)).toMatchSnapshot();
    });
    test('snapshot: emails disabled, show: true', () => {
      hooks.mockReturnValueOnce(hookProps);
      expect(shallow(<EmailSettingsModal {...props} />)).toMatchSnapshot();
    });
    test('snapshot: emails enabled, show: true', () => {
      hooks.mockReturnValueOnce({
        ...hookProps,
        toggleValue: true,
      });
      expect(shallow(<EmailSettingsModal {...props} />)).toMatchSnapshot();
    });
  });
});
