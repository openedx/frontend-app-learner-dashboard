import React from 'react';
import { shallow } from 'enzyme';

import { hooks as appHooks } from 'data/redux';
import SuggestedCourses from '.';

jest.mock('data/redux', () => ({
  hooks: {
    useSuggestedCoursesData: jest.fn(),
  },
}));

const suggestedCourses = [
  {
    bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    courseName: 'Suggested course 1',
    courseUrl: 'www.edx/suggested-course',
  },
  {
    bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    courseName: 'Suggested course 2',
    courseUrl: 'www.edx/suggested-course',
  },
  {
    bannerImgSrc: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    courseName: 'Suggested course 3',
    courseUrl: 'www.edx/suggested-course',
  },
];

describe('SuggestedCourses snapshot', () => {
  test('no suggested courses', () => {
    appHooks.useSuggestedCoursesData.mockReturnValueOnce([]);
    expect(shallow(<SuggestedCourses />)).toMatchSnapshot();
  });

  test('has 3 suggested courses', () => {
    appHooks.useSuggestedCoursesData.mockReturnValueOnce(suggestedCourses);
    expect(shallow(<SuggestedCourses />)).toMatchSnapshot();
  });
});
