import { eventNames } from '../constants';
import { createEventTracker } from '../utils';

/**
 * Track Social Share event click.
 * @param {string} courseId - course run identifier
 * @param {string} site - sharing destination ('facebook', 'twitter')
 * @return {func} - Callback that tracks the event when fired.
 */
export const shareClicked = (courseId, site) => () => createEventTracker(
  eventNames.shareClicked,
  { course_id: courseId, social_media_site: site, location: 'dashboard' },
);

export default shareClicked;
