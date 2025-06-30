import { render } from '@testing-library/react';

import { keyStore } from 'utils';

import useCreditRequestFormData from './hooks';
import CreditRequestForm from '.';

jest.mock('./hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const ref = { current: { click: jest.fn() }, useRef: jest.fn() };

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

const renderForm = (data) => render(<CreditRequestForm requestData={data} />);
describe('CreditRequestForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('hooks', () => {
    it('initializes ref from hook with requestData', () => {
      renderForm(requestData);
      expect(useCreditRequestFormData).toHaveBeenCalledWith(requestData);
    });
  });
  describe('render output', () => {
    describe('null requestData', () => {
      it('returns null', () => {
        const { container } = renderForm(null);
        expect(container.firstChild).toBeNull();
      });
    });
    describe('valid requestData', () => {
      it('loads Form with requestData url', () => {
        const { container } = renderForm(requestData);
        const creditForm = container.querySelector('form');
        expect(creditForm).toBeInTheDocument();
        expect(creditForm).toHaveAttribute('action', requestData.url);
      });
      it('loads a textarea form control for each requestData parameter', () => {
        const { container } = renderForm(requestData);
        const controls = container.querySelectorAll('textarea');
        expect(controls.length).toEqual(Object.keys(requestData.parameters).length);
        expect(controls[0]).toHaveAttribute('name', paramKeys.key1);
        expect(controls[0]).toHaveValue(requestData.parameters.key1);
        expect(controls[1]).toHaveAttribute('name', paramKeys.key2);
        expect(controls[1]).toHaveValue(requestData.parameters.key2);
        expect(controls[2]).toHaveAttribute('name', paramKeys.key3);
        expect(controls[2]).toHaveValue(requestData.parameters.key3);
      });
    });
  });
});
