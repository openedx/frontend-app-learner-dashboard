import React from 'react';
import { shallow } from 'enzyme';

import LoadedView from './LoadedView';
import mockData from './mockData';

jest.mock('./components/CourseCard', () => 'CourseCard');
jest.mock('data/redux', () => ({
  hooks: {
    usePlatformSettingsData: () => ({
      courseSearchUrl: 'course-search-url',
    }),
  },
}));

describe('RecommendationsPanel LoadedView', () => {
  const props = {
    courses: mockData.courses,
    isPersonalizedRecommendation: false,
    courseSearchClickTracker: jest.fn().mockName('courseSearchClickTracker'),
  };
  test('snapshot', () => {
    expect(shallow(<LoadedView {...props} />)).toMatchSnapshot();
  });
});
