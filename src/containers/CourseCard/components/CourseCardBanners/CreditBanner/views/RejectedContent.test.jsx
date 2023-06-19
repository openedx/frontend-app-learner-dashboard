import React from 'react';
import { shallow } from 'enzyme';

import { formatMessage } from 'testUtils';
import { reduxHooks } from 'hooks';
import messages from './messages';
import ProviderLink from './components/ProviderLink';
import RejectedContent from './RejectedContent';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
  },
}));
jest.mock('./components/CreditContent', () => 'CreditContent');
jest.mock('./components/ProviderLink', () => 'ProviderLink');

const cardId = 'test-card-id';
const credit = {
  providerStatusUrl: 'test-credit-provider-status-url',
  providerName: 'test-credit-provider-name',
};
reduxHooks.useCardCreditData.mockReturnValue(credit);

let el;
let component;
const render = () => { el = shallow(<RejectedContent cardId={cardId} />); };
const loadComponent = () => { component = el.find('CreditContent'); };

describe('RejectedContent component', () => {
  beforeEach(render);
  describe('behavior', () => {
    it('initializes credit data with cardId', () => {
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      beforeAll(loadComponent);
      test('no action is passed', () => {
        expect(component.props().action).toEqual(undefined);
      });
      test('message is formatted rejected message', () => {
        expect(component.props().message).toEqual(formatMessage(
          messages.rejected,
          {
            linkToProviderSite: <ProviderLink cardId={cardId} />,
            providerName: credit.providerName,
          },
        ));
      });
    });
  });
});
