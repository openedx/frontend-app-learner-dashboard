import { createEventTracker } from 'data/services/segment/utils';
import {
  eventNames,
  trackPaintedDoorRecommendationHomeBtnClicked,
  trackPaintedDoorVariationGroup,
  trackPaintedDoorRecommendationHomeSkipBtnClicked,
  trackPaintedDoorRecommendationHomeInterestBtnClicked,
} from './track';

jest.mock('data/services/segment/utils', () => ({
  createEventTracker: jest.fn(() => () => {}),
}));

const TEST_VARIATION = 'testVariation';

describe('Recommendations Painted Door experiment trackers', () => {
  it('test creates an event tracker for painted door variation group', () => {
    trackPaintedDoorVariationGroup(TEST_VARIATION);
    expect(createEventTracker).toHaveBeenCalledWith(
      eventNames.variationGroup,
      {
        variation: TEST_VARIATION,
        page: 'dashboard',
      },
    );
  });

  it('test creates an event tracker for painted door button click', () => {
    trackPaintedDoorRecommendationHomeBtnClicked(TEST_VARIATION);
    expect(createEventTracker).toHaveBeenCalledWith(
      eventNames.recommendationHomeBtnClicked,
      {
        variation: TEST_VARIATION,
        page: 'dashboard',
      },
    );
  });

  it('test creates an event tracker for painted door skip button click', () => {
    trackPaintedDoorRecommendationHomeSkipBtnClicked(TEST_VARIATION);
    expect(createEventTracker).toHaveBeenCalledWith(
      eventNames.recommendationHomeModalSkipBtnClicked,
      {
        variation: TEST_VARIATION,
      },
    );
  });

  it('test creates an event tracker for painted door interest button click', () => {
    trackPaintedDoorRecommendationHomeInterestBtnClicked(TEST_VARIATION);
    expect(createEventTracker).toHaveBeenCalledWith(
      eventNames.recommendationHomeModalInterestBtnClicked,
      {
        variation: TEST_VARIATION,
      },
    );
  });
});
