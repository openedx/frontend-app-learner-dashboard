import React from 'react';
import { shallow } from 'enzyme';

import LoadedView from './LoadedView';
import mockData from './mockData';

jest.mock('./components/CourseCard', () => 'CourseCard');
jest.mock('data/redux', () => ({
  hooks: {
    useCourseSearch: () => ({
      courseSearchUrl: 'course-search-url',
      courseSearchClickTracker: jest.fn().mockName('courseSearchClickTracker'),
    }),
  },
}));

describe('RecommendationsPanel LoadedView', () => {
  test('snapshot', () => {
    expect(shallow(<LoadedView courses={mockData.courses} />)).toMatchSnapshot();
  });
});
