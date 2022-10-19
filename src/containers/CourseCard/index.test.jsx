import React from 'react';
import { shallow } from 'enzyme';
import { isMobileSize } from 'data/responsive';

import CourseCard from '.';

jest.mock('./components/CourseCardBanners', () => 'CourseCardBanners');
jest.mock('./components/CourseCardContent', () => 'CourseCardContent');

const cardId = 'test-card-id';

describe('CourseCard component', () => {
  test('snapshot: collapsed', () => {
    isMobileSize.mockReturnValueOnce(true);
    expect(shallow(<CourseCard cardId={cardId} />)).toMatchSnapshot();
  });
  test('snapshot: not collapsed', () => {
    isMobileSize.mockReturnValueOnce(false);
    expect(shallow(<CourseCard cardId={cardId} />)).toMatchSnapshot();
  });
});
