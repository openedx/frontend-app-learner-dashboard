import { shallow } from 'enzyme';
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
      handleClick: jest.fn().mockName('useEnterpriseDashboardHook.handleClick'),
    };
    useEnterpriseDashboardHook.mockReturnValueOnce({ ...hookData });
    const el = shallow(<EnterpriseDashboard />);
    expect(el).toMatchSnapshot();
  });
});
