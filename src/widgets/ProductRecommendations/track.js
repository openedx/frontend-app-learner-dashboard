import { StrictDict } from 'utils';
import { createLinkTracker, createEventTracker } from 'data/services/segment/utils';
import { courseTypeToProductLineMap, convertCourseRunKeyToCourseKey } from './utils';

export const eventNames = StrictDict({
  productCardClicked: 'edx.bi.2u-product-card.clicked',
  discoveryCardClicked: 'edx.bi.user.discovery.card.click',
  recommendationsHeaderClicked: 'edx.bi.link.recommendations.header.clicked',
  recommendationsViewed: 'edx.bi.user.recommendations.viewed',
});

export const productCardClicked = (courseRunKey, courseTitle, courseType, href) => {
  createLinkTracker(
    createEventTracker(eventNames.productCardClicked, {
      label: courseTitle,
      courserun_key: courseRunKey,
      page: 'dashboard',
      product_line: courseTypeToProductLineMap[courseType],
    }),
    href,
  );
};

export const discoveryCardClicked = (courseRunKey, courseTitle, href) => {
  createLinkTracker(
    createEventTracker(eventNames.discoveryCardClicked, {
      label: courseTitle,
      courserun_key: courseRunKey,
      page: 'dashboard',
      product_line: 'open-course',
    }),
    href,
  );
};

export const recommendationsHeaderClicked = (courseType, href) => {
  createLinkTracker(
    createEventTracker(eventNames.recommendationsHeaderClicked, {
      page: 'dashboard',
      product_line: courseTypeToProductLineMap[courseType],
    }),
    href,
  );
};

export const recommendationsViewed = (isControl, recommenderGroup, courseRunKey) => {
  createEventTracker(eventNames.recommendationsViewed, {
    is_control: isControl,
    productRecommenderGroup: recommenderGroup,
    page: 'dashboard',
    course_key: courseRunKey ? convertCourseRunKeyToCourseKey(courseRunKey) : '',
  });
};
