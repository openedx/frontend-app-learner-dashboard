import React from 'react';

import useCreditRequestFormData from './hooks';

const requestData = 'test-request-data';

let out;
const ref = {
  current: { click: jest.fn() },
};
React.useRef.mockReturnValue(ref);

describe('useCreditRequestFormData hook', () => {
  describe('behavior', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('initializes ref with null', () => {
      useCreditRequestFormData(requestData);
      expect(React.useRef).toHaveBeenCalledWith(null);
    });
    let cb;
    let prereqs;
    it('does not click current ref when request data changes and is null', () => {
      useCreditRequestFormData(null);
      ([[cb, prereqs]] = React.useEffect.mock.calls);
      expect(prereqs).toEqual([null]);
      cb();
      expect(ref.current.click).not.toHaveBeenCalled();
    });
    it('clicks current ref when request data changes and is not null', () => {
      useCreditRequestFormData(requestData);
      ([[cb, prereqs]] = React.useEffect.mock.calls);
      expect(prereqs).toEqual([requestData]);
      cb();
      expect(ref.current.click).toHaveBeenCalled();
    });
  });
  describe('output', () => {
    it('returns ref for submit button', () => {
      out = useCreditRequestFormData(requestData);
      expect(out.ref).toEqual(ref);
    });
  });
});
