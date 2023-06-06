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

  it('renders a bootcamp header if the bootcamp course type is passed as a prop', () => {
    const wrapper = shallow(<ProductCardHeader courseType={bootCampType} />);

    expect(wrapper.find('h3').text()).toEqual(bootCampType);
  });

  it('renders a courses header if the courses course type is passed as a prop', () => {
    const wrapper = shallow(<ProductCardHeader courseType={courseType} />);

    expect(wrapper.find('h3').text()).toEqual(courseType);
  });
});
