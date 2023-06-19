import React from 'react';
import { shallow } from 'enzyme';

import EmptyCourse from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(() => ({
      courseSearchUrl: '/course-search-url',
    })),
  },
}));

describe('NoCoursesView', () => {
  test('snapshot', () => {
    expect(shallow(<EmptyCourse />)).toMatchSnapshot();
  });
});
