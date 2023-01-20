import { get, stringifyUrl } from 'data/services/lms/utils';
import api, { fetchUrl } from './api';

jest.mock('data/services/lms/utils', () => ({
  stringifyUrl: (...args) => ({ stringifyUrl: args }),
  get: (...args) => ({ get: args }),
}));

describe('twoUWidgetContext api', () => {
  describe('fetchTwoUWidgetContext', () => {
    it('call gets the country code of the user', () => {
      expect(api.fetchTwoUWidgetContext()).toEqual(
        get(stringifyUrl(fetchUrl)),
      );
    });
  });
});
