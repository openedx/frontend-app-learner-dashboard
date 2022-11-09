import { handleEvent } from 'data/services/segment/utils';
import { eventNames } from 'data/services/segment/constants';
import * as hooks from './hooks';

jest.mock('data/services/segment/utils', () => ({
  handleEvent: jest.fn(),
}));

describe('CourseCardActions hooks', () => {
  describe('trackUpgradeClick', () => {
    it('calls handleEvent with correct params', () => {
      const out = hooks.useCourseCardActionData();
      out.trackUpgradeClick();
      expect(handleEvent).toHaveBeenCalledWith(eventNames.upgradeCourse, {
        pageName: 'learner_home',
        linkType: 'button',
        linkCategory: 'green_upgrade',
      });
    });
  });
});
