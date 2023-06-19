import React from 'react';
import { shallow } from 'enzyme';

import { formatMessage } from 'testUtils';

import { reduxHooks } from 'hooks';
import messages from './messages';
import hooks from './hooks';
import ProviderLink from './components/ProviderLink';
import MustRequestContent from './MustRequestContent';

jest.mock('./hooks', () => ({
  useCreditRequestData: jest.fn(),
}));
jest.mock('hooks', () => ({
  reduxHooks: { useMasqueradeData: jest.fn() },
}));
jest.mock('./components/CreditContent', () => 'CreditContent');
jest.mock('./components/ProviderLink', () => 'ProviderLink');

let el;
let component;

const cardId = 'test-card-id';
const requestData = { test: 'requestData' };
const createCreditRequest = jest.fn().mockName('createCreditRequest');
hooks.useCreditRequestData.mockReturnValue({
  requestData,
  createCreditRequest,
});
reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: false });

const render = () => {
  el = shallow(<MustRequestContent cardId={cardId} />);
};
describe('MustRequestContent component', () => {
  beforeEach(() => {
    render();
  });
  describe('behavior', () => {
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
        expect(component.props().action.message).toEqual(
          formatMessage(messages.requestCredit),
        );
      });
      test('action.disabled is false', () => {
        expect(component.props().action.disabled).toEqual(false);
      });
      test('message is formatted mustRequest message', () => {
        expect(component.props().message).toEqual(
          formatMessage(messages.mustRequest, {
            linkToProviderSite: <ProviderLink cardId={cardId} />,
            requestCredit: <b>{formatMessage(messages.requestCredit)}</b>,
          }),
        );
      });
      test('requestData drawn from useCreditRequestData hook', () => {
        expect(component.props().requestData).toEqual(requestData);
      });
    });
  });
});
