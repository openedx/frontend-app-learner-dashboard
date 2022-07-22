import fakeData from 'data/services/lms/fakeData/courses';
/*
import { StrictDict } from 'utils';
import { locationId } from 'data/constants/app';
import { paramKeys } from './constants';
import urls from './urls';
import {
  client,
  get,
  post,
  stringifyUrl,
} from './utils';
*/

/*********************************************************************************
 * GET Actions
 *********************************************************************************/
const initializeList = () => Promise.resolve({
  enrollments: fakeData.courseRunData,
  entitlements: fakeData.entitlementData,
  ...fakeData.globalData,
});

export default { initializeList };
