import React from 'react';
import { render } from '@testing-library/react';

import useCreditRequestFormData from './hooks';
import CreditRequestForm from '.';

jest.unmock('@edx/paragon');
jest.unmock('react');

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

useCreditRequestFormData.mockReturnValue({ ref });

let el;
describe('CreditRequestForm component ref behavior', () => {
  it('loads submit button with ref from hook', () => {
    el = render(<CreditRequestForm requestData={requestData} />);
    const button = el.getByRole('button');
    expect(ref.current).toEqual(button);
  });
});
