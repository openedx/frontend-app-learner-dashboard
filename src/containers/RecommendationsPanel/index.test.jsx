import React from 'react';
import { shallow } from 'enzyme';

import RecommendationsPanel from '.';

const recommendedCourses = [
  {
    courseKey: 'edX+cs50',
    title: 'Computer Science',
    logoImageUrl: 'https://edx.org/small.jpg',
    marketingUrl: 'https://edx.org',
  },
  {
    courseKey: 'edX+cs50x',
    title: 'Course Test',
    logoImageUrl: 'https://edx.org/small.jpg',
    marketingUrl: 'https://edx.org',
  },
];

describe('RecommendationsPanel snapshot', () => {
  test('no recommended courses', () => {
    expect(shallow(<RecommendationsPanel courses={[]} />)).toMatchSnapshot();
  });

  test('has 2 recommended courses', () => {
    expect(shallow(<RecommendationsPanel courses={recommendedCourses} />)).toMatchSnapshot();
  });
});
