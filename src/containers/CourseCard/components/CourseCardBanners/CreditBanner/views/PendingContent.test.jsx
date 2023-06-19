import React from 'react';
import { shallow } from 'enzyme';

import { formatMessage } from 'testUtils';
import { reduxHooks } from 'hooks';

import messages from './messages';
import PendingContent from './PendingContent';

jest.mock('hooks', () => ({
  reduxHooks: { useCardCreditData: jest.fn(), useMasqueradeData: jest.fn() },
}));
jest.mock('./components/CreditContent', () => 'CreditContent');
jest.mock('./components/ProviderLink', () => 'ProviderLink');

let el;
let component;

const cardId = 'test-card-id';
const providerName = 'test-credit-provider-name';
const providerStatusUrl = 'test-credit-provider-status-url';
reduxHooks.useCardCreditData.mockReturnValue({
  providerName,
  providerStatusUrl,
});
reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: false });

const render = () => {
  el = shallow(<PendingContent cardId={cardId} />);
};
describe('PendingContent component', () => {
  beforeEach(() => {
    render();
  });
  describe('behavior', () => {
    it('initializes card credit data with cardId', () => {
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      beforeEach(() => {
        component = el.find('CreditContent');
      });
      test('action.href will go to provider status site', () => {
        expect(component.props().action.href).toEqual(providerStatusUrl);
      });
      test('action.message is formatted requestCredit message', () => {
        expect(component.props().action.message).toEqual(
          formatMessage(messages.viewDetails),
        );
      });
      test('action.disabled is false', () => {
        expect(component.props().action.disabled).toEqual(false);
      });
      test('message is formatted pending message', () => {
        expect(component.props().message).toEqual(
          formatMessage(messages.received, { providerName }),
        );
      });
    });
  });
});
