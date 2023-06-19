import simpleSelectorFactory from './utils';

describe('Redux utilities - creators', () => {
  describe('simpleSelectors', () => {
    const data = { a: 1, b: 2, c: 3 };
    const state = {
      testGroup: data,
      other: 'stuff',
    };
    const transformer = ({ testGroup }) => testGroup;

    test('given a list of strings, returns a dict w/ a simple selector per string', () => {
      const keys = ['a', 'b'];
      const selectors = simpleSelectorFactory(transformer, keys);
      expect(Object.keys(selectors)).toEqual(['root', ...keys]);
      expect(selectors.root(state)).toEqual(data);
      expect(selectors.a(state)).toEqual(data.a);
      expect(selectors.b(state)).toEqual(data.b);
    });
    test('given an object for keys, returns a dict w/ simple selector per key', () => {
      const selectors = simpleSelectorFactory(transformer, data);
      expect(Object.keys(selectors)).toEqual(['root', ...Object.keys(data)]);
      expect(selectors.root(state)).toEqual(data);
      expect(selectors.a(state)).toEqual(data.a);
      expect(selectors.b(state)).toEqual(data.b);
      expect(selectors.c(state)).toEqual(data.c);
    });
  });
});
