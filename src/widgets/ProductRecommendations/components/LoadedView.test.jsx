import React from 'react';
import { shallow } from 'enzyme';

import { mockCrossProductCourses, mockOpenCourses } from '../testData';
import LoadedView from './LoadedView';

describe('ProductRecommendations LoadedView', () => {
  it('matches snapshot', () => {
    expect(
      shallow(
        <LoadedView
          crossProductCourses={mockCrossProductCourses}
          openCourses={mockOpenCourses}
        />,
      ),
    ).toMatchSnapshot();
  });
});
