import { shallow } from 'enzyme';

import LookingForChallengeWidget from '.';

jest.mock('data/redux', () => ({
  hooks: {
    usePlatformSettingsData: () => ({
      courseSearchUrl: 'course-search-url',
    }),
  },
}));

jest.mock('../RecommendationsPanel/track', () => ({
  findCoursesClicked: jest.fn().mockName('track.findCoursesClicked'),
}));

describe('LookingForChallengeWidget', () => {
  describe('snapshots', () => {
    test('default', () => {
      const wrapper = shallow(<LookingForChallengeWidget />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
