import { parseDateOnly } from './dateFormatter';

describe('parseDateOnly', () => {
  it('returns null for empty/falsy input', () => {
    expect(parseDateOnly(null)).toBeNull();
    expect(parseDateOnly(undefined)).toBeNull();
    expect(parseDateOnly('')).toBeNull();
  });

  it('parses a date-only string as a local calendar day, not a UTC instant', () => {
    const result = parseDateOnly('2026-07-12');
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(6); // 0-indexed: July
    expect(result.getDate()).toBe(12);
  });

  it('ignores a time/timezone component if present, keeping just the calendar day', () => {
    const result = parseDateOnly('2026-04-05T23:59:00+00:00');
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(3); // April
    expect(result.getDate()).toBe(5);
  });

  it('never rounds to a different day than the input, unlike new Date(dateOnlyString)', () => {
    // This is the exact bug this function exists to avoid: new Date("2026-07-12") is parsed as
    // UTC midnight, which can display as a different calendar day depending on the local
    // timezone the test/browser is running in.
    const cases = ['2026-01-01', '2026-06-30', '2026-12-31'];
    cases.forEach((dateOnlyString) => {
      const [year, month, day] = dateOnlyString.split('-').map(Number);
      const result = parseDateOnly(dateOnlyString);
      expect([result.getFullYear(), result.getMonth() + 1, result.getDate()]).toEqual([
        year, month, day,
      ]);
    });
  });

  it('falls back to new Date(value) for a malformed date-only string', () => {
    const result = parseDateOnly('not-a-date');
    expect(result instanceof Date).toBe(true);
  });
});
