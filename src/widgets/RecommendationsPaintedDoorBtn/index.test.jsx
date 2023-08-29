import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, ModalDialog } from '@edx/paragon';
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
    expect(shallow(<RecommendationsPaintedDoorBtn {...props} />)).toMatchSnapshot();
  });

  it('renders painted door modal', () => {
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);

    expect(wrapper.find(ModalDialog)).toBeTruthy();
  });

  it('renders painted door navbar button', () => {
    props = {
      ...props,
      placement: EXPANDED_NAVBAR,
    };
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);

    expect(wrapper.find(NavbarButton).exists()).toBe(true);
    expect(wrapper.find(RecommendationsPanelButton).exists()).toBe(false);
  });

  it('renders painted door recommendations panel button', () => {
    props = {
      ...props,
      placement: RECOMMENDATIONS_PANEL,
    };
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);

    expect(wrapper.find(NavbarButton).exists()).toBe(false);
    expect(wrapper.find(RecommendationsPanelButton).exists()).toBe(true);
  });

  it('test no button (null) rendered for invalid placement', () => {
    props = {
      ...props,
      placement: '',
    };
    const wrapper = shallow(<RecommendationsPaintedDoorBtn {...props} />);

    expect(wrapper.find(NavbarButton).exists()).toBe(false);
    expect(wrapper.find(RecommendationsPanelButton).exists()).toBe(false);
  });

  it('test track event is fired on navbar button click', () => {
    props = {
      ...props,
      placement: EXPANDED_NAVBAR,
    };
    const wrapper = mount(<RecommendationsPaintedDoorBtn {...props} />);
    const navbarButton = wrapper.find(NavbarButton);

    navbarButton.find(Button).simulate('click');

    expect(trackPaintedDoorRecommendationHomeBtnClicked).toHaveBeenCalled();
  });

  it('test track event is fired on recommendations panel button click', () => {
    props = {
      ...props,
      placement: RECOMMENDATIONS_PANEL,
    };
    const wrapper = mount(<RecommendationsPaintedDoorBtn {...props} />);
    const navbarButton = wrapper.find(RecommendationsPanelButton);

    navbarButton.find(Button).simulate('click');

    expect(trackPaintedDoorRecommendationHomeBtnClicked).toHaveBeenCalled();
  });
});
