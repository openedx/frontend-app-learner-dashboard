import { shallow } from 'enzyme';

import CollapsedHeader from '.';

import { useLearnerDashboardHeaderVariantData, useIsCollapsed } from '../hooks';

jest.mock('../BrandLogo', () => jest.fn(() => 'BrandLogo'));
jest.mock('./CollapseMenuBody', () => jest.fn(() => 'CollapseMenuBody'));

jest.mock('../hooks', () => ({
  useIsCollapsed: jest.fn(() => true),
  useLearnerDashboardHeaderVariantData: jest.fn(() => ({
    isOpen: false,
    toggleIsOpen: jest.fn().mockName('toggleIsOpen'),
  })),
}));

describe('CollapsedHeader', () => {
  it('renders', () => {
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render nothing if not collapsed', () => {
    useIsCollapsed.mockReturnValueOnce(false);
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with isOpen true', () => {
    useLearnerDashboardHeaderVariantData.mockReturnValueOnce({
      isOpen: true,
      toggleIsOpen: jest.fn().mockName('toggleIsOpen'),
    });
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
