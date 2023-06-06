import React from 'react';
import { shallow } from 'enzyme';

import ProductCardHeader from './ProductCardHeader';

describe('ProductRecommendations ProductCardHeader', () => {
  const bootCampType = 'Boot Camp';
  const executiveEducationType = 'Executive Education';
  const courseType = 'Courses';

  it('matches snapshot', () => {
    expect(shallow(<ProductCardHeader courseType={executiveEducationType} />)).toMatchSnapshot();
  });
  describe('with bootcamp courseType prop', () => {
    it('renders a bootcamp header', () => {
      const wrapper = shallow(<ProductCardHeader courseType={bootCampType} />);

      expect(wrapper.find('h3').text()).toEqual(bootCampType);
    });
  });

  describe('with course courseType prop', () => {
    it('renders a courses header', () => {
      const wrapper = shallow(<ProductCardHeader courseType={courseType} />);

      expect(wrapper.find('h3').text()).toEqual(courseType);
    });
  });
});
