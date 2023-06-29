import React from 'react';
import { shallow } from 'enzyme';

import { mockCrossProductCourses } from '../testData';
import ProductCard from './ProductCard';
import { courseTypeToProductTypeMap } from '../utils';

describe('ProductRecommendations ProductCard', () => {
  const course = mockCrossProductCourses[0];
  const {
    title,
    owners: [{ name: subtitle }],
    image: { src: headerImage },
    owners: [{ logoImageUrl: schoolLogo }],
  } = course;

  const props = {
    title,
    subtitle,
    headerImage,
    schoolLogo,
    courseType: courseTypeToProductTypeMap[course.courseType],
    url: `${course.marketingUrl}&linked_from=recommender`,
  };

  it('matches snapshot', () => {
    expect(shallow(<ProductCard {...props} />)).toMatchSnapshot();
  });
});
