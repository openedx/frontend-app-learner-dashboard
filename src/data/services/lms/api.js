import { get } from './utils';
import urls from './urls';

/*********************************************************************************
 * GET Actions
 *********************************************************************************/
const initializeList = () => get(urls.init).then(({ data }) => data);

export default { initializeList };
