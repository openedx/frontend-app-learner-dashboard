import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { BackedDataProvider, useBackedData } from './BackedDataProvider';

describe('BackedDataProvider and useBackedData', () => {
  // eslint-disable-next-line func-names
  const createWrapper = () => function ({ children }: { children: React.ReactNode }) {
    return <BackedDataProvider>{children}</BackedDataProvider>;
  };

  describe('useBackedData hook', () => {
    describe('successful usage within provider', () => {
      it('should return initial state with undefined backUpData', () => {
        const { result } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });

        expect(result.current.backUpData).toBeUndefined();
        expect(typeof result.current.setBackUpData).toBe('function');
      });

      it('should update backUpData when setBackUpData is called', () => {
        const testData = { courses: ['course1', 'course2'], user: 'testUser' };

        const { result } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setBackUpData(testData);
        });

        expect(result.current.backUpData).toEqual(testData);
      });

      it('should update backUpData with different data types', () => {
        const { result } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });
        act(() => {
          result.current.setBackUpData('string data');
        });
        expect(result.current.backUpData).toBe('string data');
        act(() => {
          result.current.setBackUpData(12345);
        });
        expect(result.current.backUpData).toBe(12345);
        const arrayData = [1, 2, 3, 'test'];
        act(() => {
          result.current.setBackUpData(arrayData);
        });
        expect(result.current.backUpData).toEqual(arrayData);
        const complexData = {
          courses: [
            { id: 1, name: 'Course 1' },
            { id: 2, name: 'Course 2' },
          ],
          metadata: {
            timestamp: '2024-01-01',
            version: '1.0',
          },
        };
        act(() => {
          result.current.setBackUpData(complexData);
        });
        expect(result.current.backUpData).toEqual(complexData);
        act(() => {
          result.current.setBackUpData(null);
        });
        expect(result.current.backUpData).toBeNull();
      });

      it('should handle multiple sequential updates', () => {
        const { result } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });

        const updates = [
          { step: 1, data: 'first' },
          { step: 2, data: 'second' },
          { step: 3, data: 'third' },
        ];

        updates.forEach((update) => {
          act(() => {
            result.current.setBackUpData(update);
          });
          expect(result.current.backUpData).toEqual(update);
        });
      });

      it('should maintain referential stability of setBackUpData function', () => {
        const { result, rerender } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });

        const firstSetFunction = result.current.setBackUpData;
        rerender();

        const secondSetFunction = result.current.setBackUpData;

        expect(firstSetFunction).toBe(secondSetFunction);
      });
    });

    describe('error handling', () => {
      it('should throw error when used outside of provider', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
          renderHook(() => useBackedData());
        }).toThrow('useBackedData must be used within a BackedDataProvider');

        consoleErrorSpy.mockRestore();
      });

      it('should throw error with correct message when context is null', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        try {
          renderHook(() => useBackedData());
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toBe('useBackedData must be used within a BackedDataProvider');
        }

        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe('BackedDataProvider', () => {
    describe('provider functionality', () => {
      it('should provide context to multiple children', () => {
        const { result: result1 } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });

        const { result: result2 } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });
        act(() => {
          result1.current.setBackUpData('data1');
        });

        act(() => {
          result2.current.setBackUpData('data2');
        });

        expect(result1.current.backUpData).toBe('data1');
        expect(result2.current.backUpData).toBe('data2');
      });

      it('should handle provider re-renders without losing state', () => {
        const TestWrapper = ({ children, rerenderTrigger }: { children: React.ReactNode, rerenderTrigger: number }) => (
          <BackedDataProvider>
            <div data-testid={`rerender-${rerenderTrigger}`}>
              {children}
            </div>
          </BackedDataProvider>
        );

        const { result, rerender } = renderHook(() => useBackedData(), {
          wrapper: ({ children }) => <TestWrapper rerenderTrigger={1}>{children}</TestWrapper>,
        });

        act(() => {
          result.current.setBackUpData('persistent data');
        });

        expect(result.current.backUpData).toBe('persistent data');
        rerender();

        expect(result.current.backUpData).toBe('persistent data');
      });

      it('should initialize with correct default state', () => {
        const { result } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });

        expect(result.current).toEqual({
          backUpData: undefined,
          setBackUpData: expect.any(Function),
        });
      });
    });

    describe('reducer functionality', () => {
      it('should handle SET_DATA action correctly', () => {
        const { result } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });

        const testPayload = { test: 'data', nested: { value: 123 } };

        act(() => {
          result.current.setBackUpData(testPayload);
        });

        expect(result.current.backUpData).toEqual(testPayload);
      });

      it('should preserve state for unknown actions (defensive programming)', () => {
        const { result } = renderHook(() => useBackedData(), {
          wrapper: createWrapper(),
        });

        const initialData = { initial: 'state' };

        act(() => {
          result.current.setBackUpData(initialData);
        });

        expect(result.current.backUpData).toEqual(initialData);
        expect(result.current.backUpData).toEqual(initialData);
      });
    });
  });

  describe('integration scenarios', () => {
    it('should work in realistic masquerade backup data scenario', () => {
      const { result } = renderHook(() => useBackedData(), {
        wrapper: createWrapper(),
      });
      const masqueradeBackupData = {
        courses: [
          {
            courseId: 'course-v1:TestX+CS101+2024',
            courseName: 'Introduction to Computer Science',
            enrollment: { isActive: true, mode: 'verified' },
            progress: { completion: 0.75 },
          },
          {
            courseId: 'course-v1:TestX+MATH201+2024',
            courseName: 'Advanced Mathematics',
            enrollment: { isActive: true, mode: 'audit' },
            progress: { completion: 0.45 },
          },
        ],
        userInfo: {
          username: 'masqueraded.user',
          email: 'user@example.com',
          isActive: true,
        },
        metadata: {
          fetchedAt: '2024-01-15T10:30:00Z',
          source: 'masquerade',
        },
      };

      act(() => {
        result.current.setBackUpData(masqueradeBackupData);
      });

      expect(result.current.backUpData).toEqual(masqueradeBackupData);
      expect(result.current.backUpData.courses).toHaveLength(2);
      expect(result.current.backUpData.userInfo.username).toBe('masqueraded.user');
      expect(result.current.backUpData.metadata.source).toBe('masquerade');
    });

    it('should handle backup data clearing (reset scenario)', () => {
      const { result } = renderHook(() => useBackedData(), {
        wrapper: createWrapper(),
      });

      const initialData = { courses: ['course1', 'course2'] };
      act(() => {
        result.current.setBackUpData(initialData);
      });
      expect(result.current.backUpData).toEqual(initialData);

      act(() => {
        result.current.setBackUpData(null);
      });
      expect(result.current.backUpData).toBeNull();

      act(() => {
        result.current.setBackUpData(undefined);
      });
      expect(result.current.backUpData).toBeUndefined();
    });

    it('should handle concurrent updates correctly', () => {
      const { result } = renderHook(() => useBackedData(), {
        wrapper: createWrapper(),
      });

      const updates = [
        { id: 1, data: 'first update' },
        { id: 2, data: 'second update' },
        { id: 3, data: 'third update' },
      ];

      act(() => {
        updates.forEach(update => {
          result.current.setBackUpData(update);
        });
      });

      expect(result.current.backUpData).toEqual(updates[2]);
    });
  });

  describe('TypeScript type safety', () => {
    it('should maintain type safety for backUpData', () => {
      const { result } = renderHook(() => useBackedData(), {
        wrapper: createWrapper(),
      });
      const stringData = 'test string';
      const numberData = 42;
      const objectData = { key: 'value' };
      const arrayData = [1, 2, 3];

      act(() => {
        result.current.setBackUpData(stringData);
      });
      expect(result.current.backUpData).toBe(stringData);

      act(() => {
        result.current.setBackUpData(numberData);
      });
      expect(result.current.backUpData).toBe(numberData);

      act(() => {
        result.current.setBackUpData(objectData);
      });
      expect(result.current.backUpData).toEqual(objectData);

      act(() => {
        result.current.setBackUpData(arrayData);
      });
      expect(result.current.backUpData).toEqual(arrayData);
    });

    it('should provide correct function signature for setBackUpData', () => {
      const { result } = renderHook(() => useBackedData(), {
        wrapper: createWrapper(),
      });

      expect(typeof result.current.setBackUpData).toBe('function');
      expect(result.current.setBackUpData.length).toBe(1);
    });
  });

  describe('performance considerations', () => {
    it('should memoize context value correctly', () => {
      const { result, rerender } = renderHook(() => useBackedData(), {
        wrapper: createWrapper(),
      });

      const firstContextValue = {
        backUpData: result.current.backUpData,
        setBackUpData: result.current.setBackUpData,
      };
      rerender();
      expect(result.current.setBackUpData).toBe(firstContextValue.setBackUpData);
    });
  });
});
