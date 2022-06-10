import React from 'react';
import { shallow } from 'enzyme';

import hooks from './hooks';
import CourseCardActions from '.';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const courseNumber = 'test-course-number';

describe('CourseCard Actions component', () => {
  it('loads primary and secondary button props from hook', () => {
    const mockHook = (args) => ({
      primary: {
        prop1: 'primary-prop1',
        prop2: 'primary-prop2',
        children: 'primary-children',
        courseNumber: args.courseNumber,
      },
      secondary: {
        prop1: 'primary-prop1',
        prop2: 'primary-prop2',
        children: 'primary-children',
        courseNumber: args.courseNumber,
      },
    });
    hooks.mockImplementationOnce(mockHook);
    expect(shallow(<CourseCardActions courseNumber={courseNumber} />)).toMatchSnapshot();
  });
  it('does not render secondary button if null is returned for secondary props', () => {
    const mockHook = (args) => ({
      primary: {
        prop1: 'primary-prop1',
        prop2: 'primary-prop2',
        children: 'primary-children',
        courseNumber: args.courseNumber,
      },
      secondary: null,
    });
    hooks.mockImplementationOnce(mockHook);
    expect(shallow(<CourseCardActions courseNumber={courseNumber} />)).toMatchSnapshot();
  });
});
