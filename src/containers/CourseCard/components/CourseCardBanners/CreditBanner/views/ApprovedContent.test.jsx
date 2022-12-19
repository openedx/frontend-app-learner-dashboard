import React from 'react';
import { shallow } from 'enzyme';

import { formatMessage } from 'testUtils';
import { hooks as appHooks } from 'data/redux';
import messages from './messages';
import ProviderLink from './components/ProviderLink';
import ApprovedContent from './ApprovedContent';

jest.mock('data/redux', () => ({
  hooks: {
    useCardCreditData: jest.fn(),
  },
}));
jest.mock('./components/CreditContent', () => 'CreditContent');
jest.mock('./components/ProviderLink', () => 'ProviderLink');

let el;
const cardId = 'test-card-id';
const credit = {
  providerStatusUrl: 'test-credit-provider-status-url',
  providerName: 'test-credit-provider-name',
};
appHooks.useCardCreditData.mockReturnValue(credit);

describe('ApprovedContent component', () => {
  beforeEach(() => {
    el = shallow(<ApprovedContent cardId={cardId} />);
  });
  describe('behavior', () => {
    it('initializes credit data with cardId', () => {
      expect(appHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      let component;
      beforeAll(() => {
        component = el.find('CreditContent');
      });
      test('action.href from credit.providerStatusUrl', () => {
        expect(component.props().action.href).toEqual(credit.providerStatusUrl);
      });
      test('action.message is formatted viewCredit message', () => {
        expect(component.props().action.message).toEqual(formatMessage(messages.viewCredit));
      });
      test('message is formatted approved message', () => {
        expect(component.props().message).toEqual(formatMessage(
          messages.approved,
          {
            congratulations: (<b>{formatMessage(messages.congratulations)}</b>),
            linkToProviderSite: <ProviderLink cardId={cardId} />,
            providerName: credit.providerName,
          },
        ));
      });
    });
  });
});
