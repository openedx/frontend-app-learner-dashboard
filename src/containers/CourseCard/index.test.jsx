import React from 'react';
import { shallow } from 'enzyme';

import CourseCard from '.';
import hooks from './hooks';

jest.mock('./hooks', () => ({
  useIsCollapsed: jest.fn(),
}));

jest.mock('./components/CourseCardBanners', () => 'CourseCardBanners');
jest.mock('./components/CourseCardContent', () => 'CourseCardContent');

const cardId = 'test-card-id';

describe('CourseCard component', () => {
  test('snapshot: collapsed', () => {
    hooks.useIsCollapsed.mockReturnValueOnce(true);
    expect(shallow(<CourseCard cardId={cardId} />)).toMatchSnapshot();
  });
  test('snapshot: not collapsed', () => {
    hooks.useIsCollapsed.mockReturnValueOnce(false);
    expect(shallow(<CourseCard cardId={cardId} />)).toMatchSnapshot();
  });
});
