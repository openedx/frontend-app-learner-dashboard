import React from 'react';
import { shallow } from 'enzyme';

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
        expect(el).toMatchSnapshot();
      });
      it('loads href, onClick, and message into action row button', () => {
        const buttonEl = el.find('ActionRow Button');
        expect(buttonEl.props().href).toEqual(action.href);
        expect(buttonEl.props().onClick).toEqual(action.onClick);
        expect(buttonEl.props().disabled).toEqual(action.disabled);
        expect(buttonEl.text()).toEqual(action.message);
      });
      it('loads message into credit-msg div', () => {
        expect(el.find('div.credit-msg').text()).toEqual(message);
      });
      it('loads CreditRequestForm with passed requestData', () => {
        expect(el.find('CreditRequestForm').props().requestData).toEqual(requestData);
      });
      test('disables action button when action.disabled is true', () => {
        el.setProps({ action: { ...action, disabled: true } });
        expect(el.find('ActionRow Button').props().disabled).toEqual(true);
      });
    });
    describe('without action', () => {
      test('snapshot', () => {
        el = shallow(<CreditContent {...{ message, requestData }} />);
      });
      test('snapshot', () => {
        expect(el).toMatchSnapshot();
      });
      it('loads message into credit-msg div', () => {
        expect(el.find('div.credit-msg').text()).toEqual(message);
      });
      it('loads CreditRequestForm with passed requestData', () => {
        expect(el.find('CreditRequestForm').props().requestData).toEqual(requestData);
      });
    });
  });
});
