import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { formatMessage } from 'testUtils';
import { reduxHooks } from 'hooks';
import messages from './messages';
import ProviderLink from './components/ProviderLink';
import ApprovedContent from './ApprovedContent';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
    useMasqueradeData: jest.fn(),
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
reduxHooks.useCardCreditData.mockReturnValue(credit);
reduxHooks.useMasqueradeData.mockReturnValue({ isMasquerading: false });

describe('ApprovedContent component', () => {
  beforeEach(() => {
    el = shallow(<ApprovedContent cardId={cardId} />);
  });
  describe('behavior', () => {
    it('initializes credit data with cardId', () => {
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      let component;
      beforeAll(() => {
        component = el.instance.findByType('CreditContent');
      });
      test('action.href from credit.providerStatusUrl', () => {
        expect(component[0].props.action.href).toEqual(credit.providerStatusUrl);
      });
      test('action.message is formatted viewCredit message', () => {
        expect(component[0].props.action.message).toEqual(formatMessage(messages.viewCredit));
      });
      test('action.disabled is false', () => {
        expect(component[0].props.action.disabled).toEqual(false);
      });
      test('message is formatted approved message', () => {
        expect(component[0].props.message).toEqual(formatMessage(
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
