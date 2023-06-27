import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';
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
const courseRunKey = `course-v1:${courseKey}+2022T2`;
const label = 'Web Design';
const coursesLink = 'https://www.edx.org/search?tab=course?linked_from=recommender';
const courseUrl = 'https://www.edx.org/course/some-course';
const catagory = 'recommender';

describe('product recommendations trackers', () => {
  describe('recommendationsViewed', () => {
    it('creates an event tracker for when cross product recommendations are present', () => {
      recommendationsViewed(false, courseKey);
      expect(createEventTracker).toHaveBeenCalledWith(
        eventNames.recommendationsViewed,
        {
          is_control: false,
          page: 'dashboard',
          course_key: courseKey,
        },
      );
    });
  });
  describe('recommendationsHeaderClicked', () => {
    it('creates a link tracker for when a recommendations header is clicked', () => {
      const attributes = {
        category: catagory,
        'product-line': 'course',
        linkProps: {
          page: 'dashboard',
        },
      };
      const args = [eventNames.recommendationsHeaderClicked, attributes];

      recommendationsHeaderClicked('course', coursesLink);
      expect(createEventTracker).toHaveBeenCalledWith(...args);
      expect(createLinkTracker).toHaveBeenCalledWith(createEventTracker(...args), coursesLink);
    });
  });
  describe('discoveryCardClicked', () => {
    it('creates a link tracker for when a open course card is clicked', () => {
      const attributes = {
        linkProps: {
          label,
          courserun_key: courseRunKey,
          page: 'dashboard',
          product_category: 'course',
        },
      };
      const args = [eventNames.discoveryCardClicked, attributes];

      discoveryCardClicked(courseRunKey, label, courseUrl);
      expect(createEventTracker).toHaveBeenCalledWith(...args);
      expect(createLinkTracker).toHaveBeenCalledWith(createEventTracker(...args), courseUrl);
    });
  });
  describe('productCardClicked', () => {
    it('creates a link tracker for when a cross product course card is clicked', () => {
      const attributes = {
        linkProps: {
          label,
          courserun_key: courseRunKey,
          page: 'dashboard',
          'product-line': 'bootcamp-2u',
          product_category: '2u',
        },
      };
      const args = [eventNames.productCardClicked, attributes];

      productCardClicked(courseRunKey, label, 'bootcamp-2u', courseUrl);
      expect(createEventTracker).toHaveBeenCalledWith(...args);
      expect(createLinkTracker).toHaveBeenCalledWith(createEventTracker(...args), courseUrl);
    });
  });
});
