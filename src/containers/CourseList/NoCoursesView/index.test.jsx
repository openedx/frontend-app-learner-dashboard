import React from 'react';
import { shallow } from 'enzyme';

import EmptyCourse from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    useRecommendedCoursesData: jest.fn(() => ({ courses: [], isPersonalizedRecommendation: false })),
    useRequestIsPending: jest.fn(),
    usePlatformSettingsData: () => ({
      courseSearchUrl: 'course-search-url',
    }),
  },
}));

jest.mock('containers/Dashboard/hooks', () => ({
  useIsDashboardCollapsed: jest.fn(() => true),
}));

describe('NoCoursesView', () => {
  test('snapshot', () => {
    expect(shallow(<EmptyCourse />)).toMatchSnapshot();
  });
});
