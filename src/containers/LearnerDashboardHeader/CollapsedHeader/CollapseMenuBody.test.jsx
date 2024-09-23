import { shallow } from '@edx/react-unit-test-utils';
import { AppContext } from '@edx/frontend-platform/react';

import CollapseMenuBody from './CollapseMenuBody';

jest.mock('@edx/frontend-platform/react', () => ({
  AppContext: {
    authenticatedUser: {
      username: 'username',
    },
  },
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useEnterpriseDashboardData: () => ({
      url: 'url',
    }),
    usePlatformSettingsData: () => ({
      courseSearchUrl: '/courseSearchUrl',
    }),
  },
}));

jest.mock('../hooks', () => ({
  findCoursesNavDropdownClicked: (url) => jest.fn().mockName(`findCoursesNavDropdownClicked("${url}")`),
}));

describe('CollapseMenuBody', () => {
  test('render', () => {
    const wrapper = shallow(<CollapseMenuBody isOpen />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  test('render empty if not open', () => {
    const wrapper = shallow(<CollapseMenuBody isOpen={false} />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  test('render unauthenticated', () => {
    const { authenticatedUser } = AppContext;
    AppContext.authenticatedUser = null;
    const wrapper = shallow(<CollapseMenuBody isOpen />);
    expect(wrapper.snapshot).toMatchSnapshot();
    AppContext.authenticatedUser = authenticatedUser;
  });
});
