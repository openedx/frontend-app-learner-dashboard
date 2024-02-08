import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import hooks from './hooks';
import EmailSettingsModal from '.';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const hookProps = {
  isOptedOut: true,
  onToggle: jest.fn().mockName('hooks.onToggle'),
  save: jest.fn().mockName('hooks.save'),
};

const props = {
  closeModal: jest.fn().mockName('closeModal'),
  show: true,
  cardId: 'test-course-number',
};

describe('EmailSettingsModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('behavior', () => {
    beforeEach(() => {
      hooks.mockReturnValueOnce(hookProps);
      shallow(<EmailSettingsModal {...props} />);
    });
    it('calls hook w/ closeModal and cardId from props', () => {
      expect(hooks).toHaveBeenCalledWith({
        closeModal: props.closeModal,
        cardId: props.cardId,
      });
    });
  });
  describe('render', () => {
    test('snapshot: emails disabled, show: false', () => {
      hooks.mockReturnValueOnce(hookProps);
      expect(shallow(<EmailSettingsModal {...props} show={false} />).snapshot).toMatchSnapshot();
    });
    test('snapshot: emails disabled, show: true', () => {
      hooks.mockReturnValueOnce(hookProps);
      expect(shallow(<EmailSettingsModal {...props} />).snapshot).toMatchSnapshot();
    });
    test('snapshot: emails enabled, show: true', () => {
      hooks.mockReturnValueOnce({
        ...hookProps,
        isOptedOut: false,
      });
      expect(shallow(<EmailSettingsModal {...props} />).snapshot).toMatchSnapshot();
    });
  });
});
