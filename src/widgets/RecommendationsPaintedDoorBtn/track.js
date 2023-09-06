import { StrictDict } from 'utils';
import { createEventTracker } from 'data/services/segment/utils';

export const eventNames = StrictDict({
  variationGroup: 'edx.bi.user.recommendation_home.variation.group',
  recommendationHomeBtnClicked: 'edx.bi.user.recommendation_home.btn.clicked',
  recommendationHomeModalInterestBtnClicked: 'edx.bi.user.recommendation_home.modal.interest_btn.clicked',
  recommendationHomeModalSkipBtnClicked: 'edx.bi.user.recommendation_home.modal.skip_btn.clicked',
});

export const trackPaintedDoorVariationGroup = (variation) => {
  createEventTracker(eventNames.variationGroup, {
    variation,
    page: 'dashboard',
  })();
};

export const trackPaintedDoorRecommendationHomeBtnClicked = (variation) => {
  createEventTracker(eventNames.recommendationHomeBtnClicked, {
    variation,
    page: 'dashboard',
  })();
};

export const trackPaintedDoorRecommendationHomeInterestBtnClicked = (variation) => {
  createEventTracker(eventNames.recommendationHomeModalInterestBtnClicked, {
    variation,
  })();
};

export const trackPaintedDoorRecommendationHomeSkipBtnClicked = (variation) => {
  createEventTracker(eventNames.recommendationHomeModalSkipBtnClicked, {
    variation,
  })();
};
