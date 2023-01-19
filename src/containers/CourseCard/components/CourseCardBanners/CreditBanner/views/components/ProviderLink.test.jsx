import React from 'react';
import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';

import ProviderLink from './ProviderLink';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
  },
}));

const cardId = 'test-card-id';
const credit = {
  providerStatusUrl: 'test-credit-provider-status-url',
  providerName: 'test-credit-provider-name',
};
let el;

describe('ProviderLink component', () => {
  beforeEach(() => {
    reduxHooks.useCardCreditData.mockReturnValue(credit);
    el = shallow(<ProviderLink cardId={cardId} />);
  });
  describe('behavior', () => {
    it('initializes credit hook with cardId', () => {
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    test('snapshot', () => {
      expect(el).toMatchSnapshot();
    });
    it('passes credit.providerStatusUrl to the hyperlink href', () => {
      expect(el.find('Hyperlink').props().href).toEqual(credit.providerStatusUrl);
    });
    it('passes providerName for the link message', () => {
      expect(el.find('Hyperlink').text()).toEqual(credit.providerName);
    });
  });
});
