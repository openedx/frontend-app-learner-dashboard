import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';
import { bootCamp, treatment, control } from './constants';
import {
  eventNames,
  productCardClicked,
  discoveryCardClicked,
  recommendationsHeaderClicked,
  recommendationsViewed,
} from './track';

jest.mock('data/services/segment/utils', () => ({
  createEventTracker: jest.fn((args) => ({ createEventTracker: args })),
  createLinkTracker: jest.fn((args) => ({ createLinkTracker: args })),
}));

const courseKey = 'MITx+5.0.01';
const courseRunKeyNew = `course-v1:${courseKey}+2022T2`;
const courseRunKeyOld = 'MITx/5.0.01/2022T2/';
const label = 'Web Design';
const headerLink = 'https://www.edx.org/search?tab=course?linked_from=recommender';
const courseUrl = 'https://www.edx.org/course/some-course';

describe('product recommendations trackers', () => {
  describe('recommendationsViewed', () => {
    describe('with old course run key format', () => {
      it('creates an event tracker for when cross product recommendations are present', () => {
        recommendationsViewed(false, treatment, courseRunKeyOld);
        expect(createEventTracker).toHaveBeenCalledWith(
          eventNames.recommendationsViewed,
          {
            is_control: false,
            productRecommenderGroup: treatment,
            page: 'dashboard',
            course_key: courseKey,
          },
        );
      });
    });
    describe('with new course run key format', () => {
      it('creates an event tracker for when a user is bucketed into the conrol group', () => {
        recommendationsViewed(false, control, courseRunKeyNew);

        expect(createEventTracker).toHaveBeenCalledWith(
          eventNames.recommendationsViewed,
          {
            is_control: false,
            productRecommenderGroup: control,
            page: 'dashboard',
            course_key: courseKey,
          },
        );
      });
    });
    describe('with no course run key', () => {
      it('creates an event tracker for when a user is bucketed into the conrol group', () => {
        recommendationsViewed(false, control, '');
        expect(createEventTracker).toHaveBeenCalledWith(
          eventNames.recommendationsViewed,
          {
            is_control: false,
            productRecommenderGroup: control,
            page: 'dashboard',
            course_key: '',
          },
        );
      });
    });
  });
  describe('recommendationsHeaderClicked', () => {
    it('creates a link tracker for when a recommendations header is clicked', () => {
      const attributes = {
        product_line: 'open-courses',
        page: 'dashboard',
      };
      const args = [eventNames.recommendationsHeaderClicked, attributes];

      recommendationsHeaderClicked('Course', headerLink);
      expect(createEventTracker).toHaveBeenCalledWith(...args);
      expect(createLinkTracker).toHaveBeenCalledWith(createEventTracker(...args), headerLink);
    });
  });
  describe('discoveryCardClicked', () => {
    it('creates a link tracker for when a open course card is clicked', () => {
      const attributes = {
        label,
        courserun_key: courseRunKeyNew,
        page: 'dashboard',
        product_line: 'open-course',
      };
      const args = [eventNames.discoveryCardClicked, attributes];

      discoveryCardClicked(courseRunKeyNew, label, courseUrl);
      expect(createEventTracker).toHaveBeenCalledWith(...args);
      expect(createLinkTracker).toHaveBeenCalledWith(createEventTracker(...args), courseUrl);
    });
  });
  describe('productCardClicked', () => {
    it('creates a link tracker for when a cross product course card is clicked', () => {
      const attributes = {
        label,
        courserun_key: courseRunKeyNew,
        page: 'dashboard',
        product_line: 'boot-camps',
      };
      const args = [eventNames.productCardClicked, attributes];

      productCardClicked(courseRunKeyNew, label, bootCamp, courseUrl);
      expect(createEventTracker).toHaveBeenCalledWith(...args);
      expect(createLinkTracker).toHaveBeenCalledWith(createEventTracker(...args), courseUrl);
    });
  });
});
