import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import hooks from './hooks';
import ConfirmEmailBanner from '.';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const hookProps = {
  isNeeded: true,
  showPageBanner: jest.fn().mockName('showPageBanner'),
  closePageBanner: jest.fn().mockName('closePageBanner'),
  showConfirmModal: jest.fn().mockName('showConfirmModal'),
  closeConfirmModal: jest.fn().mockName('closeConfirmModal'),
  openConfirmModalButtonClick: jest.fn().mockName('openConfirmModalButtonClick'),
  userConfirmEmailButtonClick: jest.fn().mockName('userConfirmEmailButtonClick'),
};

describe('ConfirmEmailBanner', () => {
  describe('snapshot', () => {
    test('do not show on already verified', () => {
      hooks.mockReturnValueOnce({ ...hookProps, isNeeded: false });
      const el = shallow(<ConfirmEmailBanner />);
      expect(el.snapshot).toMatchSnapshot();
    });
    test('Show on unverified', () => {
      hooks.mockReturnValueOnce({ ...hookProps });
      const el = shallow(<ConfirmEmailBanner />);
      expect(el.snapshot).toMatchSnapshot();
    });
  });
});
