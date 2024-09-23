import { shallow } from '@edx/react-unit-test-utils';

import CollapsedHeader from '.';

import { useLearnerDashboardHeaderData, useIsCollapsed } from '../hooks';

jest.mock('../BrandLogo', () => jest.fn(() => 'BrandLogo'));
jest.mock('./CollapseMenuBody', () => jest.fn(() => 'CollapseMenuBody'));

jest.mock('../hooks', () => ({
  useIsCollapsed: jest.fn(() => true),
  useLearnerDashboardHeaderData: jest.fn(() => ({
    isOpen: false,
    toggleIsOpen: jest.fn().mockName('toggleIsOpen'),
  })),
}));

describe('CollapsedHeader', () => {
  it('renders', () => {
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('render nothing if not collapsed', () => {
    useIsCollapsed.mockReturnValueOnce(false);
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });

  it('renders with isOpen true', () => {
    useLearnerDashboardHeaderData.mockReturnValueOnce({
      isOpen: true,
      toggleIsOpen: jest.fn().mockName('toggleIsOpen'),
    });
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper.snapshot).toMatchSnapshot();
  });
});
