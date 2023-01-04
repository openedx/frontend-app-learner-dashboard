import { get, stringifyUrl } from 'data/services/lms/utils';
import urls from 'data/services/lms/urls';

export const fetchUrl = `${urls.api}/learner_home/twou_widget_context/`;

const fetchTwoUWidgetContext = () => get(stringifyUrl(fetchUrl));

export default {
  fetchTwoUWidgetContext,
};
