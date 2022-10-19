import { useWindowSize, breakpoints } from '@edx/paragon';
import {
  isDesktopSize,
  isIpadSize,
  isMobileSize,
} from './responsive';

jest.unmock('./responsive');

describe('responsive', () => {
  describe('isDesktopSize', () => {
    test('large screen is the same as large breakpoints or larger', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.minWidth });
      expect(isDesktopSize()).toBe(true);
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.minWidth + 1 });
      expect(isDesktopSize()).toBe(true);
      useWindowSize.mockReturnValueOnce({ width: breakpoints.large.minWidth - 1 });
      expect(isDesktopSize()).toBe(false);
    });
  });

  describe('isIpadSize', () => {
    test('medium screen is the same as medium breakpoints or larger', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.medium.minWidth });
      expect(isIpadSize()).toBe(true);
      useWindowSize.mockReturnValueOnce({ width: breakpoints.medium.minWidth + 1 });
      expect(isIpadSize()).toBe(true);
      useWindowSize.mockReturnValueOnce({ width: breakpoints.medium.minWidth - 1 });
      expect(isIpadSize()).toBe(false);
    });
  });

  describe('isMobileSize', () => {
    test('small screen is smaller than medium', () => {
      useWindowSize.mockReturnValueOnce({ width: breakpoints.medium.minWidth - 1 });
      expect(isMobileSize()).toBe(true);
      useWindowSize.mockReturnValueOnce({ width: breakpoints.medium.minWidth });
      expect(isMobileSize()).toBe(false);
    });
  });

  describe('only one of the three sizes is true', () => {
    test('only one of the three sizes is true', () => {
      // eslint-disable-next-line no-bitwise
      const xorTest = () => expect(isDesktopSize() ^ isIpadSize() ^ isMobileSize()).toEqual(1);
      useWindowSize.mockReturnValue({ width: breakpoints.large.minWidth });
      xorTest();
      useWindowSize.mockReturnValue({ width: breakpoints.medium.minWidth });
      xorTest();
      useWindowSize.mockReturnValue({ width: breakpoints.medium.minWidth - 1 });
      xorTest();
    });
  });
});
