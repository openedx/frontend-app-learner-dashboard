import React from 'react';
import { shallow } from 'enzyme';

import ProductCardHeader from './ProductCardHeader';
import { executiveEducation, bootCamp } from '../constants';
import { trackProductHeaderClicked } from '../optimizelyExperiment';
import { recommendationsHeaderClicked } from '../track';

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedUser: jest.fn(() => ({ userId: '1' })),
}));

jest.mock('../optimizelyExperiment', () => ({
  trackProductHeaderClicked: jest.fn(),
}));

jest.mock('../track', () => ({
  recommendationsHeaderClicked: jest.fn(),
}));

describe('ProductRecommendations ProductCardHeader', () => {
  const coursesType = 'Courses';

  it('matches snapshot', () => {
    expect(shallow(<ProductCardHeader courseType={executiveEducation} />)).toMatchSnapshot();
  });

  describe('with bootcamp courseType prop', () => {
    it('renders a bootcamp header', () => {
      const wrapper = shallow(<ProductCardHeader courseType={bootCamp} />);

      expect(wrapper.find('h3').text()).toEqual(bootCamp);
    });
  });

  describe('with courses courseType prop', () => {
    it('renders a courses header', () => {
      const wrapper = shallow(<ProductCardHeader courseType={coursesType} />);

      expect(wrapper.find('h3').text()).toEqual(coursesType);
    });
  });

  it('send outs experiment events when clicked', () => {
    const wrapper = shallow(<ProductCardHeader courseType={executiveEducation} />);
    const hyperLink = wrapper.find('Hyperlink');
    const execEdLink = 'http://localhost:18000/executive-education?linked_from=recommender';

    hyperLink.simulate('click');

    expect(trackProductHeaderClicked).toHaveBeenCalledWith('1');
    expect(recommendationsHeaderClicked).toHaveBeenCalledWith(executiveEducation, execEdLink);
  });
});
