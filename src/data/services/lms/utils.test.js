import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import * as utils from './utils';

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
}));

describe('lms service utils', () => {
  describe('get', () => {
    it('forwards arguments to authenticatedHttpClient().get', () => {
      const get = jest.fn((...args) => ({ get: args }));
      getAuthenticatedHttpClient.mockReturnValue({ get });
      const args = ['some', 'args', 'for', 'the', 'test'];
      expect(utils.get(...args)).toEqual(get(...args));
    });
  });
  describe('post', () => {
    it('forwards arguments to authenticatedHttpClient().post, removes undefined attributes and appends array values', () => {
      const post = jest.fn((...args) => ({ post: args }));
      getAuthenticatedHttpClient.mockReturnValue({ post });
      const url = 'some url';
      const body = {
        some: 'body',
        for: undefined,
        test: 'yay',
        array: ['one', 'two', undefined],
      };
      const expectedUrl = utils.post(url, body);
      expect(expectedUrl).toEqual(post(url, 'some=body&test=yay&array=one&array=two'));
    });
  });
  describe('stringifyUrl', () => {
    it('forwards url and query to stringifyUrl skipping null and ""', () => {
      const url = 'here.com';
      const query = { some: 'set', of: 'queryParams' };
      expect(utils.stringifyUrl(url, query)).toEqual('here.com?some=set&of=queryParams');
    });
  });
});
