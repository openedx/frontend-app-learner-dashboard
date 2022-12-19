import React from 'react';
import { shallow } from 'enzyme';

import { formatMessage } from 'testUtils';
import { hooks as appHooks } from 'data/redux';

import messages from './messages';
import hooks from './hooks';
import PendingContent from './PendingContent';

jest.mock('data/redux', () => ({ hooks: { useCardCreditData: jest.fn() } }));
jest.mock('./hooks', () => ({ useCreditRequestData: jest.fn() }));
jest.mock('./components/CreditContent', () => 'CreditContent');
jest.mock('./components/ProviderLink', () => 'ProviderLink');

let el;
let component;

const cardId = 'test-card-id';
const requestData = { test: 'requestData' };
const providerName = 'test-credit-provider-name';
const createCreditRequest = jest.fn().mockName('createCreditRequest');
appHooks.useCardCreditData.mockReturnValue({ providerName });
hooks.useCreditRequestData.mockReturnValue({ requestData, createCreditRequest });

const render = () => {
  el = shallow(<PendingContent cardId={cardId} />);
};
describe('PendingContent component', () => {
  beforeEach(() => {
    render();
  });
  describe('behavior', () => {
    it('initializes card credit data with cardId', () => {
      expect(appHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
    it('initializes credit request data with cardId', () => {
      expect(hooks.useCreditRequestData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      beforeEach(() => {
        component = el.find('CreditContent');
      });
      test('action.onClick calls createCreditRequest from useCreditRequestData hook', () => {
        expect(component.props().action.onClick).toEqual(createCreditRequest);
      });
      test('action.message is formatted requestCredit message', () => {
        expect(component.props().action.message).toEqual(formatMessage(messages.viewDetails));
      });
      test('message is formatted pending message', () => {
        expect(component.props().message).toEqual(
          formatMessage(messages.received, { providerName }),
        );
      });
      test('requestData drawn from useCreditRequestData hook', () => {
        expect(component.props().requestData).toEqual(requestData);
      });
    });
  });
});
