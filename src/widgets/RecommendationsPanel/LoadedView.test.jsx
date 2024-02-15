import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import LoadedView from './LoadedView';
import mockData from './mockData';
import messages from './messages';

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

describe('RecommendationsPanel LoadedView', () => {
  const props = {
    courses: mockData.courses,
    isControl: null,
  };

  describe('RecommendationPanelLoadedView', () => {
    test('without personalize recommendation', () => {
      const el = shallow(<LoadedView {...props} />);
      expect(el.snapshot).toMatchSnapshot();
      expect(el.instance.findByType('h3')[0].children[0].el).toEqual(messages.popularCoursesHeading.defaultMessage);
    });

    test('with personalize recommendation', () => {
      const el = shallow(<LoadedView {...props} isControl={false} />);
      expect(el.snapshot).toMatchSnapshot();
      expect(el.instance.findByType('h3')[0].children[0].el).toEqual(messages.recommendationsHeading.defaultMessage);
    });
  });
});
