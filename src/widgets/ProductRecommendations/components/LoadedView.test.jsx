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
  describe('with less than 2 cross product courses', () => {
    it('passes in one course type and 4 open courses to the ProductCardContainer props', () => {
      const wrapper = shallow(
        <LoadedView
          crossProductCourses={[mockCrossProductCourses[0]]}
          openCourses={mockOpenCourses}
        />,
      );

      const productCardContainerProps = wrapper.find('ProductCardContainer').props();

      expect(productCardContainerProps.courseTypes.length).toEqual(1);
      expect(productCardContainerProps.courseTypes[0]).toEqual('Course');
      expect(productCardContainerProps.finalProductList).toEqual(mockOpenCourses);
    });
  });
});
