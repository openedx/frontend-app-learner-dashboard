import React from 'react';
import { shallow } from 'enzyme';

import hooks from './hooks';
import SelectSessionModal from '.';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const hookReturn = {
  entitlementessions: [],
  showModal: true,
  closeSessionModal: jest.fn().mockName('useSelectSessionModalData.closeSessionModal'),
  showLeaveOption: true,
  header: 'test-header',
  hint: 'test-hint',
};

const availableSessions = [
  { startDate: '1/2/2000', endDate: '1/2/2020', courseId: 'test-course-id-1' },
  { startDate: '2/3/2000', endDate: '2/3/2020', courseId: 'test-course-id-2' },
  { startDate: '3/4/2000', endDate: '3/4/2020', courseId: 'test-course-id-3' },
];

describe('SelectSessionModal', () => {
  describe('snapshot', () => {
    test('empty modal with leave option ', () => {
      hooks.mockReturnValueOnce({
        ...hookReturn,
      });
      expect(shallow(<SelectSessionModal />)).toMatchSnapshot();
    });

    test('modal with leave option ', () => {
      hooks.mockReturnValueOnce({
        ...hookReturn,
        entitlementessions: [...availableSessions],
      });
      expect(shallow(<SelectSessionModal />)).toMatchSnapshot();
    });

    test('modal without leave option ', () => {
      hooks.mockReturnValueOnce({
        ...hookReturn,
        entitlementessions: [...availableSessions],
        showLeaveOption: false,
      });
      expect(shallow(<SelectSessionModal />)).toMatchSnapshot();
    });
  });
});
