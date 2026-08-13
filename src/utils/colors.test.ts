import isValidCssColor from './colors';

describe('isValidCssColor', () => {
  describe('when CSS.supports is available', () => {
    let originalCSS: typeof CSS;

    beforeEach(() => {
      originalCSS = globalThis.CSS;
      globalThis.CSS = { supports: jest.fn() } as unknown as typeof CSS;
    });

    afterEach(() => {
      globalThis.CSS = originalCSS;
    });

    it('returns true when CSS.supports reports the color is valid', () => {
      (CSS.supports as jest.Mock).mockReturnValue(true);
      expect(isValidCssColor('red')).toBe(true);
      expect(CSS.supports).toHaveBeenCalledWith('color', 'red');
    });

    it('returns false when CSS.supports reports the color is invalid', () => {
      (CSS.supports as jest.Mock).mockReturnValue(false);
      expect(isValidCssColor('not-a-color')).toBe(false);
    });

    it('returns false when CSS.supports throws', () => {
      (CSS.supports as jest.Mock).mockImplementation(() => { throw new Error('boom'); });
      expect(isValidCssColor('red')).toBe(false);
    });
  });

  describe('when CSS.supports is unavailable', () => {
    let originalCSS: typeof CSS;

    beforeEach(() => {
      originalCSS = globalThis.CSS;
      // @ts-expect-error simulate environments without the CSS global
      delete globalThis.CSS;
    });

    afterEach(() => {
      globalThis.CSS = originalCSS;
    });

    it('falls back to document and returns true for a valid color', () => {
      expect(isValidCssColor('red')).toBe(true);
    });

    it('falls back to document and returns false for an invalid color', () => {
      expect(isValidCssColor('not-a-color')).toBe(false);
    });

    it('returns false when document is unavailable', () => {
      const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');
      Object.defineProperty(globalThis, 'document', {
        value: undefined,
        configurable: true,
      });

      expect(isValidCssColor('red')).toBe(false);

      Object.defineProperty(globalThis, 'document', originalDescriptor as PropertyDescriptor);
    });
  });
});
