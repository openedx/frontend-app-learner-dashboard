import isValidCssColor from './colors';

describe('isValidCssColor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when the browser supports CSS.supports', () => {
    const originalCSS = globalThis.CSS;
    const supports = jest.fn();

    beforeEach(() => {
      globalThis.CSS = { supports } as unknown as typeof CSS;
    });

    afterEach(() => {
      globalThis.CSS = originalCSS;
    });

    it.each([true, false])('returns what CSS.supports returns (%s)', (isSupported) => {
      supports.mockReturnValue(isSupported);
      expect(isValidCssColor('#9B1766')).toBe(isSupported);
      expect(supports).toHaveBeenCalledWith('color', '#9B1766');
    });
  });

  // jsdom has no CSS.supports, so these use the fallback that sets the color on an element
  describe('when the browser does not support CSS.supports', () => {
    it.each(['#9B1766', 'rgb(155, 23, 102)', 'red'])('accepts the valid color %s', (color) => {
      expect(isValidCssColor(color)).toBe(true);
    });

    it.each(['not-a-color', '#12345', ''])('rejects the invalid color "%s"', (color) => {
      expect(isValidCssColor(color)).toBe(false);
    });

    it('rejects the color when it cannot be checked', () => {
      jest.spyOn(document, 'createElement').mockImplementation(() => {
        throw new Error('createElement failed');
      });
      expect(isValidCssColor('#9B1766')).toBe(false);
    });
  });
});
