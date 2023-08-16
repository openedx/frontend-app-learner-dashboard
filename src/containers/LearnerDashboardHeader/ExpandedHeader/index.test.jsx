import { shallow } from 'enzyme';

import ExpandedHeader from '.';

import { useIsCollapsed } from '../hooks';
import { useRecommendationsModal } from '../../../components/ModalView/hooks';

jest.mock('data/services/lms/urls', () => ({
  programsUrl: 'programsUrl',
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
  useRecommendationsModal: jest.fn(),
  findCoursesNavClicked: (url) => jest.fn().mockName(`findCoursesNavClicked("${url}")`),
}));

jest.mock('../../../components/ModalView/hooks', () => ({
  useRecommendationsModal: jest.fn(),
}));

jest.mock('./AuthenticatedUserDropdown', () => 'AuthenticatedUserDropdown');
jest.mock('../BrandLogo', () => 'BrandLogo');

describe('ExpandedHeader', () => {
  test('render', () => {
    useIsCollapsed.mockReturnValueOnce(false);
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    const wrapper = shallow(<ExpandedHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  test('render empty if collapsed', () => {
    useIsCollapsed.mockReturnValueOnce(true);
    useRecommendationsModal.mockReturnValueOnce({
      isRecommendationsModalOpen: false,
      toggleRecommendationsModal: jest.fn(),
    });
    const wrapper = shallow(<ExpandedHeader />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
