import React from 'react';
import { shallow } from 'enzyme';
import { reduxHooks } from 'hooks';
import hooks from './hooks';
import ProductRecommendations from './index';
import LoadingView from './components/LoadingView';
import LoadedView from './components/LoadedView';
import NoCoursesView from '../../containers/CourseList/NoCoursesView';
import { mockCrossProductResponse, mockAmplitudeResponse } from './testData';

jest.mock('./hooks', () => ({
  useProductRecommendationsData: jest.fn(),
  useIsMobile: jest.fn(),
}));

jest.mock('hooks', () => ({
  reduxHooks: {
    useHasCourses: jest.fn(),
  },
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

  beforeEach(() => reduxHooks.useHasCourses.mockReturnValueOnce(true));

  it('matches snapshot', () => {
    hooks.useIsMobile.mockReturnValueOnce(false);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...successfullLoadValues,
    });

    expect(shallow(<ProductRecommendations />)).toMatchSnapshot();
  });

  it('renders the LoadingView if the request is pending', () => {
    hooks.useIsMobile.mockReturnValueOnce(false);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...defaultValues,
      isLoading: true,
    });

    expect(shallow(<ProductRecommendations />)).toMatchObject(
      shallow(<LoadingView />),
    );
  });
  it('renders nothing if the request has failed', () => {
    hooks.useIsMobile.mockReturnValueOnce(false);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...defaultValues,
      hasFailed: true,
    });

    const wrapper = shallow(<ProductRecommendations />);

    expect(wrapper.type()).toBeNull();
  });
  it('renders nothing if the user is on the mobile view', () => {
    hooks.useIsMobile.mockReturnValueOnce(true);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...successfullLoadValues,
    });

    const wrapper = shallow(<ProductRecommendations />);

    expect(wrapper.type()).toBeNull();
  });

  it('renders NoCoursesView if the request is loaded, user has courses, and the response is empty', () => {
    hooks.useIsMobile.mockReturnValueOnce(false);
    hooks.useProductRecommendationsData.mockReturnValueOnce({
      ...successfullLoadValues,
      productRecommendations: {
        amplitudeCourses: [],
        crossProductCourses: [],
      },
    });

    expect(shallow(<ProductRecommendations />)).toMatchObject(
      shallow(<NoCoursesView />),
    );
  });

  describe('LoadedView', () => {
    it('renders with cross product data if the request completed and the user has courses', () => {
      hooks.useIsMobile.mockReturnValueOnce(false);
      hooks.useProductRecommendationsData.mockReturnValueOnce({
        ...successfullLoadValues,
      });

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
      hooks.useIsMobile.mockReturnValueOnce(false);
      hooks.useProductRecommendationsData.mockReturnValueOnce({
        ...successfullLoadValues,
        productRecommendations: mockAmplitudeResponse,
      });

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
