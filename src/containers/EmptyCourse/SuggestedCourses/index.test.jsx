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
    bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
    title: 'Suggested course 1',
    courseUrl: 'www.edx/suggested-course',
  },
  {
    bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
    title: 'Suggested course 2',
    courseUrl: 'www.edx/suggested-course',
  },
  {
    bannerUrl: 'https://prod-discovery.edx-cdn.org/media/programs/banner_images/9a310b98-8f27-439e-be85-12d6460245c9-f2efca129273.small.jpg',
    logoUrl: 'https://prod-discovery.edx-cdn.org/organization/certificate_logos/b9dc96da-b3fc-45a6-b6b7-b8e12eb79335-ac60112330e3.png',
    title: 'Suggested course 3',
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
