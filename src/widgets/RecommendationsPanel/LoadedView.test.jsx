import React from 'react';
import { shallow } from 'enzyme';

import { hooks } from 'data/redux';
import LoadedView from './LoadedView';
import mockData from './mockData';

jest.mock('./components/CourseCard', () => 'CourseCard');
jest.mock('data/redux', () => ({
  hooks: {
    usePlatformSettingsData: jest.fn(),
  },
}));

const courseSearchUrl = 'test-course-search-url';
hooks.usePlatformSettingsData.mockReturnValue(courseSearchUrl);

describe('RecommendationsPanel LoadedView', () => {
  test('snapshot', () => {
    expect(shallow(<LoadedView courses={mockData.courses} />)).toMatchSnapshot();
  });
});
