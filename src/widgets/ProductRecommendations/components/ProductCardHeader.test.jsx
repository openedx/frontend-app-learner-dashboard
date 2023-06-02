import React from 'react';
import { shallow } from 'enzyme';

import { mockCrossProductCourses } from '../testData';
import ProductCardHeader from './ProductCardHeader';
import { courseTypeToProductTypeMap } from '../utils';

describe('ProductRecommendations ProductCardHeader', () => {
  const course = mockCrossProductCourses[0];

  it('matches snapshot', () => {
    expect(shallow(<ProductCardHeader courseType={courseTypeToProductTypeMap[course.courseType]} />)).toMatchSnapshot();
  });
});
