import { configuration } from 'config';
import * as urls from './urls';

describe('urls', () => {
  describe('baseAppUrl', () => {
    it('returns the url if it is not relative', () => {
      const url = 'http://edx.org';
      expect(urls.baseAppUrl(url)).toEqual(url);
    });
    it('returns the url if it is relative', () => {
      const url = '/edx.org';
      expect(urls.baseAppUrl(url)).toEqual(
        `${configuration.LMS_BASE_URL}${url}`,
      );
    });
    it('return null if url is null', () => {
      expect(urls.baseAppUrl(null)).toEqual(null);
    });
  });
  describe('learningMfeUrl', () => {
    it('returns the url if it is not relative', () => {
      const url = 'http://edx.org';
      expect(urls.learningMfeUrl(url)).toEqual(url);
    });
    it('returns the url if it is relative', () => {
      const url = '/edx.org';
      expect(urls.learningMfeUrl(url)).toEqual(
        `${configuration.LEARNING_BASE_URL}${url}`,
      );
    });
    it('return null if url is null', () => {
      expect(urls.learningMfeUrl(null)).toEqual(null);
    });
  });
});
