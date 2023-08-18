import { shallow } from 'enzyme';

import React from 'react';
import LookingForChallengeWidget from '.';
import { trackRecommendationUnavailable } from '../RecommendationsPanel/track';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: () => ({
      courseSearchUrl: 'http://localhost:18000/course-search-url',
    }),
  },
}));

jest.mock('../RecommendationsPanel/track', () => ({
  findCoursesWidgetClicked: (href) => jest.fn().mockName(`track.findCoursesWidgetClicked('${href}')`),
  trackRecommendationUnavailable: jest.fn(),
}));

describe('LookingForChallengeWidget', () => {
  describe('snapshots', () => {
    test('default', () => {
      const wrapper = shallow(<LookingForChallengeWidget />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  test('test recommendations unavailable event is fired', () => {
    shallow(<LookingForChallengeWidget />);
    const [cb] = React.useEffect.mock.calls[0];
    cb();
    expect(trackRecommendationUnavailable).toBeCalled();
  });
});
