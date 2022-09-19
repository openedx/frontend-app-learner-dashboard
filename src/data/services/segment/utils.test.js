import * as constants from './constants';
import { handleEvent } from './utils';

jest.mock('@redux-beacon/segment', () => ({
  trackEvent: (handleFn) => ({ trackEvent: handleFn }),
}));

const category = 'AFakeCategory';
describe('segment service utils', () => {
  beforeAll(() => {
    global.window = Object.create(window);
    constants.trackingCategory = category;
  });

  describe('handleEvent', () => {
    const name = 'aName';
    const payload = { field1: 'some data', field2: 'other data' };
    describe('when called with just a name', () => {
      it('returns a TrackEvent call with the name and tracking category', () => {
        const handler = handleEvent(name).trackEvent;
        expect(handler(payload)).toEqual({
          name,
          properties: { category },
        });
      });
    });
    describe('when a propsFn is provided', () => {
      it('adds the output of propsFn(event.payload) to properties', () => {
        const propsFn = ({ field1 }) => ({ field1 });
        const handler = handleEvent(name, { propsFn }).trackEvent;
        expect(handler({ payload })).toEqual({
          name,
          properties: { category, field1: payload.field1 },
        });
      });
    });
    describe('when an extrasFn object is provided', () => {
      it('adds the output of extrasFn(event.payload) to top-level object', () => {
        const extrasFn = ({ field2 }) => ({ field2 });
        const handler = handleEvent(name, { extrasFn }).trackEvent;
        expect(handler({ payload })).toEqual({
          name,
          field2: payload.field2,
          properties: { category },
        });
      });
    });
  });
});
