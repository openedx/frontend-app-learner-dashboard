import { renderHook } from '@testing-library/react';
import useEntitlementInfo from './useEntitlementInfo';

describe('useEntitlementInfo', () => {
  const today = new Date();
  const pastDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
  const futureDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
  const farFutureDate = new Date(today.getTime() + 200 * 24 * 60 * 60 * 1000); // 200 days from now

  const mockAvailableSessions = [
    {
      sessionId: 'session-1',
      courseName: 'Session 1',
      startDate: '2024-03-01',
    },
    {
      sessionId: 'session-2',
      courseName: 'Session 2',
      startDate: '2024-06-01',
    },
  ];

  describe('non-entitlement scenarios', () => {
    it('should return isEntitlement: false when entitlement is null', () => {
      const courseData = {
        entitlement: null,
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current).toEqual({
        isEntitlement: false,
      });
    });

    it('should return isEntitlement: false when entitlement is undefined', () => {
      const courseData = {
        entitlement: undefined,
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current).toEqual({
        isEntitlement: false,
      });
    });

    it('should return isEntitlement: false when entitlement is empty object', () => {
      const courseData = {
        entitlement: {},
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current).toEqual({
        isEntitlement: false,
      });
    });

    it('should return isEntitlement: false when entitlement.isEntitlement is false', () => {
      const courseData = {
        entitlement: {
          isEntitlement: false,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current).toEqual({
        isEntitlement: false,
      });
    });

    it('should return isEntitlement: false when courseData is null', () => {
      const { result } = renderHook(() => useEntitlementInfo(null));

      expect(result.current).toEqual({
        isEntitlement: false,
      });
    });

    it('should return isEntitlement: false when courseData is undefined', () => {
      const { result } = renderHook(() => useEntitlementInfo(undefined));

      expect(result.current).toEqual({
        isEntitlement: false,
      });
    });
  });

  describe('valid entitlement scenarios', () => {
    const baseEntitlementData = {
      entitlement: {
        isEntitlement: true,
        uuid: 'test-uuid-123',
        changeDeadline: futureDate.toISOString(),
        isExpired: false,
        isFulfilled: false,
        availableSessions: mockAvailableSessions,
      },
    };

    it('should return complete entitlement info for valid entitlement', () => {
      const { result } = renderHook(() => useEntitlementInfo(baseEntitlementData));

      expect(result.current).toMatchObject({
        isEntitlement: true,
        availableSessions: mockAvailableSessions,
        changeDeadline: expect.any(Date),
        isExpired: false,
        isFulfilled: false,
        uuid: 'test-uuid-123',
        hasSessions: true,
        canChange: true,
        showExpirationWarning: true,
      });
    });

    it('should correctly parse changeDeadline as Date object', () => {
      const { result } = renderHook(() => useEntitlementInfo(baseEntitlementData));

      expect(result.current.changeDeadline).toBeInstanceOf(Date);
      expect(result.current.changeDeadline?.getTime()).toBe(futureDate.getTime());
    });

    it('should return hasSessions: true when availableSessions has items', () => {
      const { result } = renderHook(() => useEntitlementInfo(baseEntitlementData));

      expect(result.current.hasSessions).toBe(true);
    });

    it('should return hasSessions: false when availableSessions is empty', () => {
      const courseData = {
        entitlement: {
          ...baseEntitlementData.entitlement,
          availableSessions: [],
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.hasSessions).toBe(false);
    });

    it('should return hasSessions: false when availableSessions is null', () => {
      const courseData = {
        entitlement: {
          ...baseEntitlementData.entitlement,
          availableSessions: null,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.hasSessions).toBe(false);
    });

    it('should return hasSessions: false when availableSessions is undefined', () => {
      const courseData = {
        entitlement: {
          ...baseEntitlementData.entitlement,
          availableSessions: undefined,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.hasSessions).toBe(false);
    });
  });

  describe('deadline and expiration logic', () => {
    it('should return canChange: false when deadline has passed', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: pastDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.canChange).toBe(false);
    });

    it('should return canChange: true when deadline has not passed', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.canChange).toBe(true);
    });

    it('should return showExpirationWarning: false when already fulfilled', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: true,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.showExpirationWarning).toBe(false);
    });

    it('should return showExpirationWarning: false when deadline has passed', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: pastDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.showExpirationWarning).toBe(false);
    });

    it('should return showExpirationWarning: false when deadline is more than 6 months away', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: farFutureDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.showExpirationWarning).toBe(false);
    });

    it('should return showExpirationWarning: true when conditions are met', () => {
      const withinSixMonths = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days from now

      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: withinSixMonths.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.showExpirationWarning).toBe(true);
    });
  });

  describe('entitlement properties passthrough', () => {
    it('should pass through isExpired property', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
          isExpired: true,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.isExpired).toBe(true);
    });

    it('should pass through isFulfilled property', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: true,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.isFulfilled).toBe(true);
    });

    it('should pass through uuid property', () => {
      const testUuid = 'unique-entitlement-uuid-456';
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: testUuid,
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.uuid).toBe(testUuid);
    });

    it('should pass through availableSessions property', () => {
      const customSessions = [
        { sessionId: 'custom-1', courseName: 'Custom Session' },
      ];

      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: customSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.availableSessions).toEqual(customSessions);
    });
  });

  describe('memoization behavior', () => {
    it('should memoize result when courseData does not change', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result, rerender } = renderHook(
        ({ data }) => useEntitlementInfo(data),
        { initialProps: { data: courseData } },
      );

      const firstResult = result.current;

      rerender({ data: courseData });

      expect(result.current).toBe(firstResult);
    });

    it('should recalculate when courseData changes', () => {
      const courseData1 = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid-1',
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const courseData2 = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid-2',
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: true,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result, rerender } = renderHook(
        ({ data }) => useEntitlementInfo(data),
        { initialProps: { data: courseData1 } },
      );

      const firstResult = result.current;

      rerender({ data: courseData2 });

      expect(result.current).not.toBe(firstResult);
      expect(result.current.uuid).toBe('test-uuid-2');
      expect(result.current.isFulfilled).toBe(true);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle invalid date strings gracefully', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: 'invalid-date-string',
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.changeDeadline).toBeInstanceOf(Date);
    });

    it('should handle missing changeDeadline property', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.changeDeadline).toBeInstanceOf(Date);
    });

    it('should handle entitlement with missing optional properties', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.isEntitlement).toBe(true);
      expect(result.current.uuid).toBe('test-uuid');
      expect(result.current.isExpired).toBeUndefined();
      expect(result.current.isFulfilled).toBeUndefined();
      expect(result.current.availableSessions).toBeUndefined();
      expect(result.current.hasSessions).toBe(false);
    });

    it('should handle courseData with extra properties', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: futureDate.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
        course: {
          courseName: 'Extra Course Info',
        },
        enrollment: {
          isActive: true,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.isEntitlement).toBe(true);
      expect(result.current.uuid).toBe('test-uuid');
    });
  });

  describe('boundary date calculations', () => {
    it('should correctly calculate 6-month boundary for showExpirationWarning', () => {
      const exactly180Days = new Date();
      exactly180Days.setDate(exactly180Days.getDate() + 180);

      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: exactly180Days.toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));

      expect(result.current.showExpirationWarning).toBe(true);
    });

    it('should handle date exactly at deadline boundary', () => {
      const courseData = {
        entitlement: {
          isEntitlement: true,
          uuid: 'test-uuid',
          changeDeadline: new Date().toISOString(),
          isExpired: false,
          isFulfilled: false,
          availableSessions: mockAvailableSessions,
        },
      };

      const { result } = renderHook(() => useEntitlementInfo(courseData));
      expect(typeof result.current.canChange).toBe('boolean');
      expect(typeof result.current.showExpirationWarning).toBe('boolean');
    });
  });
});
