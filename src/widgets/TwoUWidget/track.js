import { StrictDict } from 'utils';
import { createEventTracker, createLinkTracker } from 'data/services/segment/utils';

export const eventNames = StrictDict({
  experimentViewed: 'learner-home.experiment.viewed',
  cardClicked: 'learner-home.2ulobcallout.clicked',
});

export const twoUWidgetExperimentViewed = (viewed, showBootcamp) => createEventTracker(eventNames.experimentViewed, {
  twoU_lob_callout: viewed,
  show_bootcamp: showBootcamp,
});

export const twoUWidgetCardClicked = (program, href) => createLinkTracker(
  createEventTracker(eventNames.cardClicked, {
    program,
  }),
  href,
  true,
);

export default {
  twoUWidgetExperimentViewed,
  twoUWidgetCardClicked,
};
