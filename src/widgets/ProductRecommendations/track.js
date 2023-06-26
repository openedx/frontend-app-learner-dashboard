import { StrictDict } from 'utils';
import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';

export const eventNames = StrictDict({
  productCardClicked: 'edx.bi.2u-product-card.clicked',
  discoveryCardClicked: 'edx.bi.user.discovery.card.click',
  recommendationsHeaderClicked: 'edx.bi.link.recommendations.header.clicked',
  recommendationsViewed: 'edx.bi.user.recommendations.viewed',
});

export const productCardClicked = (courseRunKey, courseTitle, courseType, href) => {
  createLinkTracker(
    createEventTracker(eventNames.productCardClicked, {
      category: 'recommender',
      courserun_key: courseRunKey,
      label: courseTitle,
      page: 'dashboard',
      'product-line': courseType,
      product_category: '2u',
    }),
    href,
  );
};

export const discoveryCardClicked = (courseRunKey, courseTitle, href) => {
  createLinkTracker(
    createEventTracker(eventNames.discoveryCardClicked, {
      category: 'recommender',
      courserun_key: courseRunKey,
      label: courseTitle,
      page: 'dashboard',
      product_category: 'course',
    }),
    href,
  );
};

export const recommendationsHeaderClicked = (courseType, href) => {
  createLinkTracker(
    createEventTracker(eventNames.recommendationsHeaderClicked, {
      category: 'recommender',
      page: 'dashboard',
      'product-line': courseType,
    }),
    href,
  );
};

export const recommendationsViewed = (isControl, courseRunKey) => {
  createEventTracker(eventNames.recommendationsViewed, {
    is_control: isControl,
    page: 'dashboard',
    courserun_key: courseRunKey,
  });
};
