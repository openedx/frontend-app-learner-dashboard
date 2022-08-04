import React from 'react';
import { shallow } from 'enzyme';

import EmptyCourse from '.';

jest.mock('./SuggestedCourses', () => 'SuggestedCourses');

describe('EmptyCourse', () => {
  test('snapshot', () => {
    expect(shallow(<EmptyCourse />)).toMatchSnapshot();
  });
});
