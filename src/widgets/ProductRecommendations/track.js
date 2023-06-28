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
      catagory: 'recommender',
      courserun_key: courseRunKey,
      label: courseTitle,
      page: 'dashboard',
      product_line: courseType,
    }),
    href,
  );
};

export const discoveryCardClicked = (courseRunKey, courseTitle, href) => {
  createLinkTracker(
    createEventTracker(eventNames.discoveryCardClicked, {
      catagory: 'recommender',
      courserun_key: courseRunKey,
      label: courseTitle,
      page: 'dashboard',
      product_line: 'open-course',
    }),
    href,
  );
};

export const recommendationsHeaderClicked = (courseType, href) => {
  createLinkTracker(
    createEventTracker(eventNames.recommendationsHeaderClicked, {
      category: 'recommender',
      product_line: courseType,
      page: 'dashboard',
    }),
    href,
  );
};

export const recommendationsViewed = (isControl, courseKey) => {
  createEventTracker(eventNames.recommendationsViewed, {
    is_control: isControl,
    page: 'dashboard',
    course_key: courseKey,
  });
};
