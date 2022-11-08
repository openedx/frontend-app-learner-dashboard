import { shallow } from 'enzyme';

import LookingForChallengeWidget from '.';

jest.mock('data/redux', () => ({
  hooks: {
    useCourseSearch: () => ({
      courseSearchUrl: 'course-search-url',
      courseSearchClickTracker: jest.fn().mockName('courseSearchClickTracker'),
    }),
  },
}));

describe('LookingForChallengeWidget', () => {
  describe('snapshots', () => {
    test('default', () => {
      const wrapper = shallow(<LookingForChallengeWidget />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
