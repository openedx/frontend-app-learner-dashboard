import React from 'react';
import { shallow } from 'enzyme';

import { reduxHooks } from 'hooks';
import { formatMessage } from 'testUtils';
import track from 'tracking';

import messages from './messages';
import EligibleContent from './EligibleContent';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCreditData: jest.fn(),
    useCardCourseRunData: jest.fn(),
  },
}));
jest.mock('./components/CreditContent', () => 'CreditContent');
jest.mock('tracking', () => ({
  credit: {
    purchase: (...args) => ({ trackCredit: args }),
  },
}));

let el;
let component;

const cardId = 'test-card-id';
const courseId = 'test-course-id';
const credit = {
  providerName: 'test-credit-provider-name',
};
reduxHooks.useCardCreditData.mockReturnValue(credit);
reduxHooks.useCardCourseRunData.mockReturnValue({ courseId });

const render = () => {
  el = shallow(<EligibleContent cardId={cardId} />);
};
const loadComponent = () => {
  component = el.find('CreditContent');
};
describe('EligibleContent component', () => {
  beforeEach(() => {
    render();
  });
  describe('behavior', () => {
    it('initializes credit data with cardId', () => {
      expect(reduxHooks.useCardCreditData).toHaveBeenCalledWith(cardId);
    });
    it('initializes course run data with cardId', () => {
      expect(reduxHooks.useCardCourseRunData).toHaveBeenCalledWith(cardId);
    });
  });
  describe('render', () => {
    describe('rendered CreditContent component', () => {
      beforeEach(() => {
        loadComponent();
      });
      test('action.onClick sends credit purchase track event', () => {
        expect(component.props().action.onClick).toEqual(
          track.credit.purchase(courseId),
        );
      });
      test('action.message is formatted getCredit message', () => {
        expect(component.props().action.message).toEqual(formatMessage(messages.getCredit));
      });
      test('message is formatted eligible message if no provider', () => {
        reduxHooks.useCardCreditData.mockReturnValueOnce({});
        render();
        loadComponent();
        expect(component.props().message).toEqual(formatMessage(
          messages.eligible,
          { getCredit: (<b>{formatMessage(messages.getCredit)}</b>) },
        ));
      });
      test('message is formatted eligible message if provider', () => {
        expect(component.props().message).toEqual(
          formatMessage(messages.eligibleFromProvider, { providerName: credit.providerName }),
        );
      });
    });
  });
});
