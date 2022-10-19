import { shallow } from 'enzyme';

import { hooks } from 'data/redux';

import LookingForChallengeWidget from '.';

jest.mock('data/redux', () => ({
  hooks: {
    usePlatformSettingsData: jest.fn(),
  },
}));

describe('LookingForChallengeWidget', () => {
  describe('snapshots', () => {
    test('default', () => {
      hooks.usePlatformSettingsData.mockReturnValueOnce({});
      const wrapper = shallow(<LookingForChallengeWidget />);
      expect(wrapper).toMatchSnapshot();
    });

    test('with course-search-url', () => {
      hooks.usePlatformSettingsData.mockReturnValueOnce({
        courseSearchUrl: 'course-search-url',
      });
      const wrapper = shallow(<LookingForChallengeWidget />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
