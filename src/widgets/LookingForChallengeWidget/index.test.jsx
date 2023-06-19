import { shallow } from 'enzyme';

import LookingForChallengeWidget from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: () => ({
      courseSearchUrl: 'http://localhost:18000/course-search-url',
    }),
  },
}));

jest.mock('../RecommendationsPanel/track', () => ({
  findCoursesWidgetClicked: (href) => jest.fn().mockName(`track.findCoursesWidgetClicked('${href}')`),
}));

describe('LookingForChallengeWidget', () => {
  describe('snapshots', () => {
    test('default', () => {
      const wrapper = shallow(<LookingForChallengeWidget />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
