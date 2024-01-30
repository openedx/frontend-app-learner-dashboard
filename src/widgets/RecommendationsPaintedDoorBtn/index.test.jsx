import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';
import { ModalDialog } from '@edx/paragon';
import RecommendationsPaintedDoorBtn from './index';
import { EXPANDED_NAVBAR, RECOMMENDATIONS_PANEL } from './constants';
import NavbarButton from './components/NavbarButton';
import RecommendationsPanelButton from './components/RecommendationsPanelButton';
import { trackPaintedDoorRecommendationHomeBtnClicked } from './track';

jest.mock('./components/PaintedDoorModal/hooks', () => ({
  usePaintedDoorModal: jest.fn(() => ({
    isModalOpen: false,
    toggleModal: jest.fn(),
  })),
}));

jest.mock('./track', () => ({
  trackPaintedDoorRecommendationHomeBtnClicked: jest.fn(),
}));

describe('RecommendationsPaintedDoorBtn', () => {
  let props = {
    placement: RECOMMENDATIONS_PANEL,
    experimentVariation: '',
  };

  it('matches snapshot', () => {
    expect(shallow(<RecommendationsPaintedDoorBtn {...props} />).snapshot).toMatchSnapshot();
  });

  it('renders painted door modal', () => {
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);

    expect(wrapper.instance.findByType(ModalDialog)).toBeTruthy();
  });

  it('renders painted door navbar button', () => {
    props = {
      ...props,
      placement: EXPANDED_NAVBAR,
    };
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);

    expect(wrapper.instance.findByType(NavbarButton)).not.toHaveLength(0);
    expect(wrapper.instance.findByType(RecommendationsPanelButton)).toHaveLength(0);
  });

  it('renders painted door recommendations panel button', () => {
    props = {
      ...props,
      placement: RECOMMENDATIONS_PANEL,
    };
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);

    expect(wrapper.instance.findByType(NavbarButton)).toHaveLength(0);
    expect(wrapper.instance.findByType(RecommendationsPanelButton)).not.toHaveLength(0);
  });

  it('test no button (null) rendered for invalid placement', () => {
    props = {
      ...props,
      placement: '',
    };
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);

    expect(wrapper.instance.findByType(NavbarButton)).toHaveLength(0);
    expect(wrapper.instance.findByType(RecommendationsPanelButton)).toHaveLength(0);
  });

  it('test track event is fired on navbar button click', () => {
    props = {
      ...props,
      placement: EXPANDED_NAVBAR,
    };
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);
    const navbarButton = wrapper.instance.findByType(NavbarButton)[0];

    navbarButton.props.handleClick();

    expect(trackPaintedDoorRecommendationHomeBtnClicked).toHaveBeenCalled();
  });

  it('test track event is fired on recommendations panel button click', () => {
    props = {
      ...props,
      placement: RECOMMENDATIONS_PANEL,
    };
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);
    const recommendationsPanelButton = wrapper.instance.findByType(RecommendationsPanelButton)[0];

    recommendationsPanelButton.props.handleClick();

    expect(trackPaintedDoorRecommendationHomeBtnClicked).toHaveBeenCalled();
  });
});
