import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

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
        expect(el.snapshot).toMatchSnapshot();
      });
      it('loads Form with requestData url', () => {
        expect(el.instance.findByType('Form')[0].props.action).toEqual(requestData.url);
      });
      it('loads a textarea form control for each requestData parameter', () => {
        const controls = el.instance.findByType('FormControl');
        expect(controls[0].props.name).toEqual(paramKeys.key1);
        expect(controls[0].props.value).toEqual(requestData.parameters.key1);
        expect(controls[1].props.name).toEqual(paramKeys.key2);
        expect(controls[1].props.value).toEqual(requestData.parameters.key2);
        expect(controls[2].props.name).toEqual(paramKeys.key3);
        expect(controls[2].props.value).toEqual(requestData.parameters.key3);
      });
    });
  });
});
