import { StrictDict } from 'utils';
import { configuration } from 'config';

const baseUrl = `${configuration.LMS_BASE_URL}`;

const api = `${baseUrl}/api/`;
const init = `${api}learner_home/mock/init`;

export default StrictDict({
  api,
  init,
});
