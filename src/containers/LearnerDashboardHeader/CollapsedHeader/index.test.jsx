import { shallow } from 'enzyme';

import CollapsedHeader from '.';

import { useLearnerDashboardHeaderData, useIsCollapsed } from '../hooks';
import { useRecommendationsModal } from '../../../components/ModalView/hooks';

jest.mock('../BrandLogo', () => jest.fn(() => 'BrandLogo'));
jest.mock('./CollapseMenuBody', () => jest.fn(() => 'CollapseMenuBody'));

jest.mock('../hooks', () => ({
  useIsCollapsed: jest.fn(() => true),
  useLearnerDashboardHeaderData: jest.fn(() => ({
    isOpen: false,
    toggleIsOpen: jest.fn().mockName('toggleIsOpen'),
  })),
}));

jest.mock('../../../components/ModalView/hooks', () => ({
  useRecommendationsModal: jest.fn(),
}));

describe('CollapsedHeader', () => {
  it('renders', () => {
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render nothing if not collapsed', () => {
    useIsCollapsed.mockReturnValueOnce(false);
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with isOpen true', () => {
    useLearnerDashboardHeaderData.mockReturnValueOnce({
      isOpen: true,
      toggleIsOpen: jest.fn().mockName('toggleIsOpen'),
    });
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    const wrapper = shallow(<CollapsedHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
