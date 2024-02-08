import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import CourseCard from '.';
import hooks from './hooks';

jest.mock('./hooks', () => ({
  useIsCollapsed: jest.fn(),
}));

jest.mock('./components/CourseCardBanners', () => 'CourseCardBanners');
jest.mock('./components/CourseCardImage', () => 'CourseCardImage');
jest.mock('./components/CourseCardMenu', () => 'CourseCardMenu');
jest.mock('./components/CourseCardActions', () => 'CourseCardActions');
jest.mock('./components/CourseCardDetails', () => 'CourseCardDetails');
jest.mock('./components/CourseCardTitle', () => 'CourseCardTitle');

const cardId = 'test-card-id';

describe('CourseCard component', () => {
  test('snapshot: collapsed', () => {
    hooks.useIsCollapsed.mockReturnValueOnce(true);
    expect(shallow(<CourseCard cardId={cardId} />).snapshot).toMatchSnapshot();
  });
  test('snapshot: not collapsed', () => {
    hooks.useIsCollapsed.mockReturnValueOnce(false);
    expect(shallow(<CourseCard cardId={cardId} />).snapshot).toMatchSnapshot();
  });
});
