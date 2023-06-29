import React from 'react';
import { shallow } from 'enzyme';
import { useWindowSize } from '@edx/paragon';
import hooks from './hooks';
import ProductRecommendations from './index';
import LoadingView from './components/LoadingView';
import LoadedView from './components/LoadedView';
import NoCoursesView from '../../containers/CourseList/NoCoursesView';
import { mockCrossProductResponse, mockAmplitudeResponse } from './testData';

jest.mock('./hooks', () => ({
  useProductRecommendationsData: jest.fn(),
  useHasCourses: jest.fn(),
}));

jest.mock('./components/LoadingView', () => 'LoadingView');
jest.mock('./components/LoadedView', () => 'LoadedView');
jest.mock('containers/CourseList/NoCoursesView', () => 'NoCoursesView');

describe('ProductRecommendations', () => {
  const defaultValues = {
    productRecommendations: {},
    isLoading: false,
    isLoaded: false,
    hasFailed: false,
  };

  const successfullLoadValues = {
    ...defaultValues,
    isLoaded: true,
    productRecommendations: mockCrossProductResponse,
  };

  const desktopWindowSize = {
    width: 1400,
    height: 943,
  };

  it('matches snapshot', () => {
    useWindowSize.mockReturnValueOnce(desktopWindowSize);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...successfullLoadValues,
    });

    expect(shallow(<ProductRecommendations />)).toMatchSnapshot();
  });

  it('renders the LoadingView if the request is pending', () => {
    useWindowSize.mockReturnValueOnce(desktopWindowSize);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...defaultValues,
      isLoading: true,
    });

    expect(shallow(<ProductRecommendations />)).toMatchObject(
      shallow(<LoadingView />),
    );
  });
  it('renders nothing if the request has failed', () => {
    useWindowSize.mockReturnValueOnce(desktopWindowSize);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...defaultValues,
      hasFailed: true,
    });

    const wrapper = shallow(<ProductRecommendations />);

    expect(wrapper.type()).toBeNull();
  });
  it('renders nothing if the width of the screen size is less than 576px (mobile view)', () => {
    useWindowSize.mockReturnValueOnce({ width: 575, height: 976 });
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...successfullLoadValues,
    });

    const wrapper = shallow(<ProductRecommendations />);

    expect(wrapper.type()).toBeNull();
  });

  it('renders NoCoursesView if the request is loaded, user has courses, and the response is empty', () => {
    useWindowSize.mockReturnValueOnce(desktopWindowSize);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...successfullLoadValues,
      productRecommendations: {
        amplitudeCourses: [],
        crossProductCourses: [],
      },
    });
    hooks.useHasCourses.mockReturnValueOnce(true);

    expect(shallow(<ProductRecommendations />)).toMatchObject(
      shallow(<NoCoursesView />),
    );
  });

  describe('LoadedView', () => {
    it('renders with cross product data if the request completed and the user has courses', () => {
      useWindowSize.mockReturnValueOnce(desktopWindowSize);
      hooks.useProductRecommendationsData.mockReturnValueOnce({
        ...successfullLoadValues,
      });
      hooks.useHasCourses.mockReturnValueOnce(true);

      expect(shallow(<ProductRecommendations />)).toMatchObject(
        shallow(
          <LoadedView
            openCourses={mockCrossProductResponse.amplitudeCourses}
            crossProductCourses={mockCrossProductResponse.crossProductCourses}
          />,
        ),
      );
    });

    it('renders the LoadedView with Amplitude course data if the request completed', () => {
      useWindowSize.mockReturnValueOnce(desktopWindowSize);
      hooks.useProductRecommendationsData.mockReturnValueOnce({
        ...successfullLoadValues,
        productRecommendations: mockAmplitudeResponse,
      });
      hooks.useHasCourses.mockReturnValueOnce(true);

      expect(shallow(<ProductRecommendations />)).toMatchObject(
        shallow(
          <LoadedView
            openCourses={mockCrossProductResponse.amplitudeCourses}
            crossProductCourses={[]}
          />,
        ),
      );
    });
  });
});
