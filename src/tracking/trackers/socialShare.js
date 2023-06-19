import api from 'data/services/lms/api';

/**
 * Track Social Share event click.
 * @param {string} courseId - course run identifier
 * @param {string} site - sharing destination ('facebook', 'twitter')
 * @return {func} - Callback that tracks the event when fired.
 */
export const shareClicked = (courseId, site) => () => api.logShare({ courseId, site });

export default shareClicked;
