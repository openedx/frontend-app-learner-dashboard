import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import CreditContent from './CreditContent';

let el;
const action = {
  href: 'test-action-href',
  onClick: jest.fn().mockName('test-action-onClick'),
  message: 'test-action-message',
  disabled: false,
};

const message = 'test-message';
const requestData = { url: 'test-request-data-url', parameters: { key1: 'val1' } };
const props = { action, message, requestData };

describe('CreditContent component', () => {
  describe('render', () => {
    describe('with action', () => {
      beforeEach(() => {
        el = shallow(<CreditContent {...props} />);
      });
      test('snapshot', () => {
        expect(el.snapshot).toMatchSnapshot();
      });
      it('loads href, onClick, and message into action row button', () => {
        const buttonEl = el.instance.findByTestId('action-row-btn')[0];
        expect(buttonEl.props.href).toEqual(action.href);
        expect(buttonEl.props.onClick).toEqual(action.onClick);
        expect(buttonEl.props.disabled).toEqual(action.disabled);
        expect(buttonEl.children[0].el).toEqual(action.message);
      });
      it('loads message into credit-msg div', () => {
        expect(el.instance.findByTestId('credit-msg')[0].children[0].el).toEqual(message);
      });
      it('loads CreditRequestForm with passed requestData', () => {
        expect(el.instance.findByType('CreditRequestForm')[0].props.requestData).toEqual(requestData);
      });
      test('disables action button when action.disabled is true', () => {
        el = shallow(<CreditContent {...props} action={{ ...action, disabled: true }} />);
        expect(el.instance.findByTestId('action-row-btn')[0].props.disabled).toEqual(true);
      });
    });
    describe('without action', () => {
      test('snapshot', () => {
        el = shallow(<CreditContent {...{ message, requestData }} />);
      });
      test('snapshot', () => {
        expect(el.snapshot).toMatchSnapshot();
      });
      it('loads message into credit-msg div', () => {
        expect(el.instance.findByTestId('credit-msg')[0].children[0].el).toEqual(message);
      });
      it('loads CreditRequestForm with passed requestData', () => {
        expect(el.instance.findByType('CreditRequestForm')[0].props.requestData).toEqual(requestData);
      });
    });
  });
});
