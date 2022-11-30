import api from 'data/services/lms/api';
import * as trackers from './socialShare';

jest.mock('data/services/lms/api', () => ({
  trackShare: jest.fn(args => ({ trackShare: args })),
}));

const courseId = 'test-course-id';
const site = 'test-site';

describe('entitlements trackers', () => {
  describe('shareClicked', () => {
    it('creates event tracker for trackShare api event', () => {
      expect(trackers.shareClicked(courseId, site)()).toEqual(api.trackShare({ courseId, site }));
    });
  });
});
