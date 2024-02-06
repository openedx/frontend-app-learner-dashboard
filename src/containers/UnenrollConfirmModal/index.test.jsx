import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { UnenrollConfirmModal } from '.';

import * as hooks from './hooks';

jest.mock('./components/ConfirmPane', () => 'ConfirmPane');
jest.mock('./components/ReasonPane', () => 'ReasonPane');
jest.mock('./components/FinishedPane', () => 'FinishedPane');

jest.mock('./hooks', () => ({
  __esModule: true,
  modalStates: jest.requireActual('./hooks').modalStates,
  useUnenrollData: jest.fn(),
}));

describe('UnenrollConfirmModal component', () => {
  const hookProps = {
    confirm: jest.fn().mockName('hooks.confirm'),
    reason: {
      isSkipped: false,
      reasonProps: 'other',
    },
    close: jest.fn().mockName('hooks.close'),
    closeAndRefresh: jest.fn().mockName('hooks.closeAndRefresh'),
    modalState: hooks.modalStates.confirm,
  };
  const closeModal = jest.fn().mockName('closeModal');
  const cardId = 'cardId';
  const props = {
    closeModal,
    show: true,
    cardId,
  };
  test('hooks called with closeModal and cardId', () => {
    hooks.useUnenrollData.mockReturnValueOnce(hookProps);
    shallow(<UnenrollConfirmModal {...props} />);
    expect(hooks.useUnenrollData).toHaveBeenCalledWith({ closeModal, cardId });
  });
  test('snapshot: modalStates.confirm', () => {
    hooks.useUnenrollData.mockReturnValueOnce(hookProps);
    expect(shallow(<UnenrollConfirmModal {...props} />).snapshot).toMatchSnapshot();
  });
  test('snapshot: modalStates.finished, reason given', () => {
    hooks.useUnenrollData.mockReturnValueOnce({ ...hookProps, modalState: hooks.modalStates.finished });
    expect(shallow(<UnenrollConfirmModal {...props} />).snapshot).toMatchSnapshot();
  });
  test('snapshot: modalStates.finished, reason skipped', () => {
    hooks.useUnenrollData.mockReturnValueOnce({
      ...hookProps,
      modalState: hooks.modalStates.finished,
      isSkipped: true,
    });
    expect(shallow(<UnenrollConfirmModal {...props} />).snapshot).toMatchSnapshot();
  });
  test('snapshot: modalStates.reason, should be fullscreen with no shadow', () => {
    hooks.useUnenrollData.mockReturnValueOnce({ ...hookProps, modalState: hooks.modalStates.reason });
    expect(shallow(<UnenrollConfirmModal {...props} />).snapshot).toMatchSnapshot();
  });
});
