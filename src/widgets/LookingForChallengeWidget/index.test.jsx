import { shallow } from 'enzyme';

import LookingForChallengeWidget from '.';

jest.mock('data/redux', () => ({
  hooks: {
    usePlatformSettingsData: () => ({
      courseSearchUrl: 'course-search-url',
    }),
  },
}));

describe('LookingForChallengeWidget', () => {
  const props = {
    courseSearchClickTracker: jest.fn().mockName('courseSearchClickTracker'),
  };
  describe('snapshots', () => {
    test('default', () => {
      const wrapper = shallow(<LookingForChallengeWidget {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
