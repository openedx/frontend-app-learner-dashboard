import { createEventTracker } from '@src/data/services/segment/utils';
import { eventNames } from '@src/tracking/constants';
import * as trackers from './engagement';

jest.mock('@src/data/services/segment/utils', () => ({
  createEventTracker: jest.fn(args => ({ createEventTracker: args })),
}));

const courseId = 'test-course-id';
const reason = 'test-reason';

describe('engagement trackers', () => {
  describe('unenrollReason', () => {
    test('creates event tracker for unenrollReason if not entitlement', () => {
      expect(trackers.unenrollReason(courseId, reason, false)).toEqual(
        createEventTracker(
          eventNames.unenrollReason,
          { reason, course_id: courseId, ...trackers.engagementOptions },
        ),
      );
    });
    test('creates event tracker for entitlementUnenrollReason if entitlement', () => {
      expect(trackers.unenrollReason(courseId, reason, false)).toEqual(
        createEventTracker(
          eventNames.unenrollReason,
          { reason, course_id: courseId, ...trackers.engagementOptions },
        ),
      );
    });
  });
});
