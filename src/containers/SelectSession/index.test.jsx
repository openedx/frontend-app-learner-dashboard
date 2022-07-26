import React from 'react';
import { shallow } from 'enzyme';

import { hooks as appHooks } from 'data/redux';

import SelectSession from '.';

jest.mock('data/redux', () => ({
  hooks: {
    useSelectSessionsModalData: jest.fn(),
  },
}));

describe('SelectSession', () => {
  describe('snapshot', () => {
    test('no courseNumber', () => {
      appHooks.useSelectSessionsModalData.mockReturnValueOnce({ courseNumber: null });
      expect(shallow(<SelectSession />)).toMatchSnapshot();
    });

    test('has courseNumber', () => {
      appHooks.useSelectSessionsModalData.mockReturnValueOnce({ courseNumber: 'some course' });
      expect(shallow(<SelectSession />)).toMatchSnapshot();
    });
  });
});
