import React from 'react';
import { shallow } from 'enzyme';

import { mockCrossProductCourses, mockOpenCourses, mockFallbackOpenCourse } from '../testData';
import { trackProductCardClicked, trackCourseCardClicked } from '../optimizelyExperiment';
import { productCardClicked, discoveryCardClicked } from '../track';
import ProductCard from './ProductCard';
import { courseTypeToProductTypeMap } from '../utils';

jest.mock('../optimizelyExperiment', () => ({
  trackProductCardClicked: jest.fn(),
  trackCourseCardClicked: jest.fn(),
}));

jest.mock('../track', () => ({
  productCardClicked: jest.fn(),
  discoveryCardClicked: jest.fn(),
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedUser: jest.fn(() => ({ userId: '1' })),
}));

describe('ProductRecommendations ProductCard', () => {
  const getProps = (course) => {
    const {
      title,
      owners: [{ name: subtitle }],
      image: { src: headerImage },
      owners: [{ logoImageUrl: schoolLogo }],
    } = course;

    return {
      title,
      subtitle,
      headerImage,
      schoolLogo,
      courseType: courseTypeToProductTypeMap[course.courseType],
      courseRunKey: course.courseRunKey,
      url: course.marketingUrl,
    };
  };

  const crossProductProps = getProps(mockCrossProductCourses[0]);
  const openCourseProps = getProps(mockOpenCourses[0]);
  const fallbackOpenCourseProps = getProps(mockFallbackOpenCourse[0]);

  it('matches snapshot', () => {
    expect(shallow(<ProductCard {...crossProductProps} />)).toMatchSnapshot();
  });

  it('has the query string parameter attached to a fallback recommendations url', () => {
    const wrapper = shallow(<ProductCard {...fallbackOpenCourseProps} />);
    const cardUrl = wrapper.find('Card').props().destination;

    expect(cardUrl).toEqual('https://www.edx.org/course/some-course?linked_from=recommender');
  });

  it('send outs experiment events related to open courses when clicked', () => {
    const wrapper = shallow(<ProductCard {...openCourseProps} />);
    const { courseRunKey, title, url } = openCourseProps;

    wrapper.simulate('click');

    expect(trackCourseCardClicked).toHaveBeenCalledWith('1');
    expect(discoveryCardClicked).toHaveBeenCalledWith(courseRunKey, title, `${url}&linked_from=recommender`);
  });

  it('send outs experiment events related to cross product courses when clicked', () => {
    const wrapper = shallow(<ProductCard {...crossProductProps} />);
    const {
      courseRunKey,
      title,
      courseType,
      url,
    } = crossProductProps;

    wrapper.simulate('click');

    expect(trackProductCardClicked).toHaveBeenCalledWith('1');
    expect(productCardClicked).toHaveBeenCalledWith(courseRunKey, title, courseType, `${url}&linked_from=recommender`);
  });
});
