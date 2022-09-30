import React from 'react';
import { shallow } from 'enzyme';
import { formatMessage } from 'testUtils';

import MasqueradeBar from '.';
import hooks from './hooks';

jest.mock('./hooks', () => ({
  useMasqueradeBarData: jest.fn(),
}));

describe('MasqueradeBar', () => {
  const masqueradeMockData = {
    canMasquerade: true,
    isMasquerading: false,
    isMasqueradingFailed: false,
    isMasqueradingPending: false,
    masqueradeInput: '',
    masqueradeError: '',
    handleMasqueradeInputChange: jest.fn().mockName('handleMasqueradeInputChange'),
    handleClearMasquerade: jest.fn().mockName('handleClearMasquerade'),
    handleMasqueradeSubmit: jest.fn().mockName('handleMasqueradeSubmit'),
    formatMessage,
  };

  describe('snapshot', () => {
    test('can masquerade', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce(masqueradeMockData);
      expect(shallow(<MasqueradeBar />)).toMatchSnapshot();
    });
    test('can masquerade with input', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        masqueradeInput: 'test',
      });
      expect(shallow(<MasqueradeBar />)).toMatchSnapshot();
    });
    test('cannot masquerade', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        canMasquerade: false,
      });
      expect(shallow(<MasqueradeBar />)).toMatchSnapshot();
    });
    test('is masquerading with input', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        isMasquerading: true,
        masqueradeInput: 'test',
      });
      expect(shallow(<MasqueradeBar />)).toMatchSnapshot();
    });
    test('is masquerading failed with error', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        isMasqueradingFailed: true,
        masqueradeError: 'test-error',
      });
      expect(shallow(<MasqueradeBar />)).toMatchSnapshot();
    });
    test('is masquerading pending', () => {
      hooks.useMasqueradeBarData.mockReturnValueOnce({
        ...masqueradeMockData,
        isMasqueradingPending: true,
      });
      expect(shallow(<MasqueradeBar />)).toMatchSnapshot();
    });
  });
});
