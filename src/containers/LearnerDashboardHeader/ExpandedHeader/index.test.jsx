import { shallow } from '@edx/react-unit-test-utils';

import ExpandedHeader from '.';

import { useIsCollapsed } from '../hooks';

jest.mock('data/services/lms/urls', () => ({
  programsUrl: () => 'programsUrl',
  baseAppUrl: url => (`http://localhost:18000${url}`),
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: () => ({
      courseSearchUrl: '/courseSearchUrl',
    }),
  },
}));

jest.mock('../hooks', () => ({
  useIsCollapsed: jest.fn(),
  findCoursesNavClicked: (url) => jest.fn().mockName(`findCoursesNavClicked("${url}")`),
}));

jest.mock('./AuthenticatedUserDropdown', () => 'AuthenticatedUserDropdown');
jest.mock('../BrandLogo', () => 'BrandLogo');

describe('ExpandedHeader', () => {
  test('render', () => {
    useIsCollapsed.mockReturnValueOnce(false);
    const wrapper = shallow(<ExpandedHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  test('render empty if collapsed', () => {
    useIsCollapsed.mockReturnValueOnce(true);
    const wrapper = shallow(<ExpandedHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
