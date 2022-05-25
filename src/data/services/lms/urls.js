import { StrictDict } from 'utils';
import { configuration } from 'config';

const baseUrl = `${configuration.LMS_BASE_URL}`;

const api = `${baseUrl}/api/`;

export default StrictDict({
  api,
});
