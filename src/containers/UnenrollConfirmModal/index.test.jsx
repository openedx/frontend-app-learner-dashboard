import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';

import { UnenrollConfirmModal } from '.';

import * as hooks from './hooks';

jest.mock('./components/ConfirmPane', () => 'ConfirmPane');
jest.mock('./components/ReasonPane', () => 'ReasonPane');
jest.mock('./components/FinishedPane', () => 'FinishedPane');

jest.mock('./hooks', () => ({
  __esModule: true,
  modalStates: jest.requireActual('./hooks').modalStates,
  modalHooks: jest.fn(),
}));

describe('UnenrollConfirmModal component', () => {
  const dispatch = useDispatch();
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
  const closeModal = jest.fn().mockName('props.closeModal');
  const show = true;
  test('hooks called with dispatch and closeModal props', () => {
    hooks.modalHooks.mockReturnValueOnce(hookProps);
    shallow(<UnenrollConfirmModal {...{ closeModal, show }} />);
    expect(hooks.modalHooks).toHaveBeenCalledWith({ dispatch, closeModal });
  });
  test('snapshot: modalStates.confirm', () => {
    hooks.modalHooks.mockReturnValueOnce(hookProps);
    expect(shallow(<UnenrollConfirmModal {...{ closeModal, show }} />)).toMatchSnapshot();
  });
  test('snapshot: modalStates.finished, reason given', () => {
    hooks.modalHooks.mockReturnValueOnce({ ...hookProps, modalState: hooks.modalStates.finished });
    expect(shallow(<UnenrollConfirmModal {...{ closeModal, show }} />)).toMatchSnapshot();
  });
  test('snapshot: modalStates.finished, reason skipped', () => {
    hooks.modalHooks.mockReturnValueOnce({
      ...hookProps,
      modalState: hooks.modalStates.finished,
      isSkipped: true,
    });
    expect(shallow(<UnenrollConfirmModal {...{ closeModal, show }} />)).toMatchSnapshot();
  });
  test('snapshot: modalStates.reason', () => {
    hooks.modalHooks.mockReturnValueOnce({ ...hookProps, modalState: hooks.modalStates.reason });
    expect(shallow(<UnenrollConfirmModal {...{ closeModal, show }} />)).toMatchSnapshot();
  });
});
