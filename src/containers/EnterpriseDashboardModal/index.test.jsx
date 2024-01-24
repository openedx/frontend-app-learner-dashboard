import { shallow } from '@edx/react-unit-test-utils';
import EnterpriseDashboard from '.';

import useEnterpriseDashboardHook from './hooks';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('EnterpriseDashboard', () => {
  test('snapshot', () => {
    const hookData = {
      dashboard: { label: 'edX, Inc.', url: '/edx-dashboard' },
      showDialog: false,
      handleClose: jest.fn().mockName('useEnterpriseDashboardHook.handleClose'),
      handleCTAClick: jest.fn().mockName('useEnterpriseDashboardHook.handleCTAClick'),
      handleEscape: jest.fn().mockName('useEnterpriseDashboardHook.handleEscape'),
    };
    useEnterpriseDashboardHook.mockReturnValueOnce({ ...hookData });
    const el = shallow(<EnterpriseDashboard />);
    expect(el.snapshot).toMatchSnapshot();
  });
  test('empty snapshot', () => {
    useEnterpriseDashboardHook.mockReturnValueOnce({});
    const el = shallow(<EnterpriseDashboard />);
    expect(el.snapshot).toMatchSnapshot();
  });
});
