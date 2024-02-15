import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { Button } from '@openedx/paragon';
import LoadedView from './LoadedView';
import mockData from './mockData';
import messages from './messages';
import { usePaintedDoorExperimentContext } from '../RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext';
import RecommendationsPaintedDoorBtn from '../RecommendationsPaintedDoorBtn';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: () => ({
      courseSearchUrl: '/course-search-url',
    }),
  },
}));
jest.mock('data/services/lms/urls', () => ({
  baseAppUrl: (url) => (`http://localhost:18000${url}`),
}));
jest.mock('./track', () => ({
  findCoursesWidgetClicked: (href) => jest.fn().mockName(`track.findCoursesWidgetClicked('${href}')`),
}));
jest.mock('./components/CourseCard', () => 'CourseCard');
jest.mock('widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext', () => ({
  usePaintedDoorExperimentContext: jest.fn(),
}));

describe('RecommendationsPanel LoadedView', () => {
  const props = {
    courses: mockData.courses,
    isControl: null,
  };
  let mockExperimentContext = {
    experimentVariation: '',
    isPaintedDoorWidgetBtnVariation: true,
    experimentLoading: false,
  };
  describe('RecommendationPanelLoadedView', () => {
    test('without personalize recommendation', () => {
      usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
      const el = shallow(<LoadedView {...props} />);
      expect(el.snapshot).toMatchSnapshot();
      expect(el.instance.findByType('h3')[0].children[0].el).toEqual(messages.popularCoursesHeading.defaultMessage);
    });

    test('with personalize recommendation', () => {
      usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
      const el = shallow(<LoadedView {...props} isControl={false} />);
      expect(el.snapshot).toMatchSnapshot();
      expect(el.instance.findByType('h3')[0].children[0].el).toEqual(messages.recommendationsHeading.defaultMessage);
    });

    test('test painted door button is rendered if user is in variation', () => {
      usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
      const wrapper = shallow(<LoadedView {...props} />);
      expect(wrapper.instance.findByType(RecommendationsPaintedDoorBtn)).not.toHaveLength(0);
    });

    test('test explore courses button is returned if user is not in variation', () => {
      mockExperimentContext = {
        ...mockExperimentContext,
        isPaintedDoorWidgetBtnVariation: false,
      };
      usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
      const wrapper = shallow(<LoadedView {...props} />);
      expect(wrapper.instance.findByType(RecommendationsPaintedDoorBtn)).toHaveLength(0);
      expect(wrapper.instance.findByType(Button)[0].children[0].el)
        .toEqual(messages.exploreCoursesButton.defaultMessage);
    });

    test('test explore courses button is returned if experiment is loading', () => {
      mockExperimentContext = {
        ...mockExperimentContext,
        isPaintedDoorWidgetBtnVariation: false,
        experimentLoading: true,
      };
      usePaintedDoorExperimentContext.mockReturnValueOnce(mockExperimentContext);
      const wrapper = shallow(<LoadedView {...props} />);
      expect(wrapper.instance.findByType(RecommendationsPaintedDoorBtn)).toHaveLength(0);
      expect(wrapper.instance.findByType(Button)[0].children[0].el)
        .toEqual(messages.exploreCoursesButton.defaultMessage);
    });
  });
});
