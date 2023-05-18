import React from 'react';
import { shallow } from 'enzyme';

import { keyStore } from 'utils';

import useCreditRequestFormData from './hooks';
import CreditRequestForm from '.';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const ref = 'test-ref';
const requestData = {
  url: 'test-request-data-url',
  parameters: {
    key1: 'val1',
    key2: 'val2',
    key3: 'val3',
  },
};

const paramKeys = keyStore(requestData.parameters);

useCreditRequestFormData.mockReturnValue({ ref });

let el;
const shallowRender = (data) => { el = shallow(<CreditRequestForm requestData={data} />); };
describe('CreditRequestForm component', () => {
  describe('behavior', () => {
    it('initializes ref from hook with requestData', () => {
      shallowRender(requestData);
      expect(useCreditRequestFormData).toHaveBeenCalledWith(requestData);
    });
  });
  describe('render output', () => {
    describe('null requestData', () => {
      it('returns null', () => {
        shallowRender(null);
        expect(el.isEmptyRender()).toEqual(true);
      });
    });
    describe('valid requestData', () => {
      beforeEach(() => {
        shallowRender(requestData);
      });
      test('snapshot', () => {
        expect(el).toMatchSnapshot();
      });
      it('loads Form with requestData url', () => {
        expect(el.find('Form').props().action).toEqual(requestData.url);
      });
      it('loads a textarea form control for each requestData parameter', () => {
        const controls = el.find('FormControl');
        expect(controls.at(0).props().name).toEqual(paramKeys.key1);
        expect(controls.at(0).props().value).toEqual(requestData.parameters.key1);
        expect(controls.at(1).props().name).toEqual(paramKeys.key2);
        expect(controls.at(1).props().value).toEqual(requestData.parameters.key2);
        expect(controls.at(2).props().name).toEqual(paramKeys.key3);
        expect(controls.at(2).props().value).toEqual(requestData.parameters.key3);
      });
    });
  });
});
