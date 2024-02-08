import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { mockCrossProductCourses, mockOpenCourses } from '../testData';
import ProductCardContainer from './ProductCardContainer';
import { executiveEducation, bootCamp, course } from '../constants';

describe('ProductRecommendations ProductCardContainer', () => {
  const props = {
    finalProductList: [...mockCrossProductCourses, ...mockOpenCourses],
    courseTypes: [executiveEducation, bootCamp, course],
  };

  it('matches snapshot', () => {
    expect(shallow(<ProductCardContainer {...props} />).snapshot).toMatchSnapshot();
  });

  describe('with finalCourseList containing cross product and open courses', () => {
    it('renders 3 ProductCardHeaders with the 3 different course types', () => {
      const wrapper = shallow(<ProductCardContainer {...props} />);
      const productCardHeaders = wrapper.instance.findByType('ProductCardHeader');

      expect(productCardHeaders.length).toEqual(3);
      productCardHeaders.forEach((header, index) => {
        expect(header.props.courseType).toEqual(props.courseTypes[index]);
      });
    });
  });

  describe('with finalCourseList containing only open courses', () => {
    it('renders 1 ProductHeader with the one course type', () => {
      const openCoursesProps = {
        finalProductList: [...mockOpenCourses, ...mockOpenCourses],
        courseTypes: ['Course'],
      };

      const wrapper = shallow(<ProductCardContainer {...openCoursesProps} />);
      const productCardHeaders = wrapper.instance.findByType('ProductCardHeader');

      expect(productCardHeaders.length).toEqual(1);
      expect(productCardHeaders[0].props.courseType).toEqual(openCoursesProps.courseTypes[0]);
    });
  });
});
