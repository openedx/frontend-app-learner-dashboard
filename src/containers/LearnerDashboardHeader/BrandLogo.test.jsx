import { shallow } from '@edx/react-unit-test-utils';

import { reduxHooks } from 'hooks';
import BrandLogo from './BrandLogo';

jest.mock('hooks', () => ({
  reduxHooks: {
    useEnterpriseDashboardData: jest.fn(),
  },
}));

describe('BrandLogo', () => {
  test('dashboard defined', () => {
    reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce({
      url: 'url',
    });
    const wrapper = shallow(<BrandLogo />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('a')[0].props.href).toEqual('url');
  });

  test('dashboard undefined', () => {
    reduxHooks.useEnterpriseDashboardData.mockReturnValueOnce(null);
    const wrapper = shallow(<BrandLogo />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.instance.findByType('a')[0].props.href).toEqual('/');
  });
});
