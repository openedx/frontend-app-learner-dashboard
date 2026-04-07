import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { MasqueradeProvider, useMasquerade } from './MasqueradeProvider';

describe('MasqueradeProvider and useMasquerade', () => {
  // eslint-disable-next-line func-names
  const createWrapper = () => function ({ children }: { children: React.ReactNode }) {
    return <MasqueradeProvider>{children}</MasqueradeProvider>;
  };

  describe('useMasquerade hook', () => {
    describe('initial state', () => {
      it('should return initial masquerade state', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        expect(result.current.masqueradeUser).toBeUndefined();
        expect(typeof result.current.setMasqueradeUser).toBe('function');
      });

      it('should have expected properties in context', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        const expectedProperties = ['masqueradeUser', 'setMasqueradeUser'];

        expectedProperties.forEach(prop => {
          expect(result.current).toHaveProperty(prop);
        });
      });
    });

    describe('error handling', () => {
      it('should throw error when used outside of provider', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
          renderHook(() => useMasquerade());
        }).toThrow('useMasquerade must be used within a MasqueradeProvider');

        consoleErrorSpy.mockRestore();
      });

      it('should throw error with correct message when context is null', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        try {
          renderHook(() => useMasquerade());
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toBe('useMasquerade must be used within a MasqueradeProvider');
        }

        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe('masquerade user management', () => {
    describe('setMasqueradeUser', () => {
      it('should set masquerade user to string value', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        const testUser = 'test-user@example.com';

        act(() => {
          result.current.setMasqueradeUser(testUser);
        });

        expect(result.current.masqueradeUser).toBe(testUser);
      });

      it('should set masquerade user to undefined', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setMasqueradeUser('initial-user');
        });

        act(() => {
          result.current.setMasqueradeUser(undefined);
        });

        expect(result.current.masqueradeUser).toBeUndefined();
      });

      it('should handle email format users', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        const emailUser = 'student@university.edu';

        act(() => {
          result.current.setMasqueradeUser(emailUser);
        });

        expect(result.current.masqueradeUser).toBe(emailUser);
      });

      it('should handle username format users', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        const usernameUser = 'student123';

        act(() => {
          result.current.setMasqueradeUser(usernameUser);
        });

        expect(result.current.masqueradeUser).toBe(usernameUser);
      });

      it('should handle empty string users', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setMasqueradeUser('');
        });

        expect(result.current.masqueradeUser).toBe('');
      });

      it('should handle users with special characters', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        const specialUser = 'user.name+tag@domain-name.co.uk';

        act(() => {
          result.current.setMasqueradeUser(specialUser);
        });

        expect(result.current.masqueradeUser).toBe(specialUser);
      });

      it('should replace existing masquerade user', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setMasqueradeUser('first-user');
        });

        act(() => {
          result.current.setMasqueradeUser('second-user');
        });

        expect(result.current.masqueradeUser).toBe('second-user');
      });

      it('should handle multiple sequential updates', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        const users = ['user1@test.com', 'user2@test.com', 'user3@test.com'];

        users.forEach(user => {
          act(() => {
            result.current.setMasqueradeUser(user);
          });
          expect(result.current.masqueradeUser).toBe(user);
        });
      });

      it('should handle unicode characters in usernames', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        const unicodeUser = 'José.García@université.fr';

        act(() => {
          result.current.setMasqueradeUser(unicodeUser);
        });

        expect(result.current.masqueradeUser).toBe(unicodeUser);
      });

      it('should handle very long usernames', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        const longUser = `${'a'.repeat(100)}@example.com`;

        act(() => {
          result.current.setMasqueradeUser(longUser);
        });

        expect(result.current.masqueradeUser).toBe(longUser);
      });
    });

    describe('masquerade workflow scenarios', () => {
      it('should handle start masquerade workflow', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        expect(result.current.masqueradeUser).toBeUndefined();

        act(() => {
          result.current.setMasqueradeUser('target-student@university.edu');
        });

        expect(result.current.masqueradeUser).toBe('target-student@university.edu');
      });

      it('should handle stop masquerade workflow', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setMasqueradeUser('masqueraded-user');
        });

        act(() => {
          result.current.setMasqueradeUser(undefined);
        });

        expect(result.current.masqueradeUser).toBeUndefined();
      });

      it('should handle switch masquerade user workflow', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.setMasqueradeUser('first-student');
        });
        expect(result.current.masqueradeUser).toBe('first-student');

        act(() => {
          result.current.setMasqueradeUser('second-student');
        });
        expect(result.current.masqueradeUser).toBe('second-student');

        act(() => {
          result.current.setMasqueradeUser(undefined);
        });
        expect(result.current.masqueradeUser).toBeUndefined();
      });

      it('should handle admin masquerade session', () => {
        const { result } = renderHook(() => useMasquerade(), {
          wrapper: createWrapper(),
        });
        const user = 'user123@institution.edu';

        act(() => {
          result.current.setMasqueradeUser(user);
        });
        expect(result.current.masqueradeUser).toBe(user);

        act(() => {
          result.current.setMasqueradeUser(undefined);
        });
        expect(result.current.masqueradeUser).toBeUndefined();
      });
    });
  });

  describe('reducer functionality', () => {
    it('should handle SET_MASQUERADE_USER action with string payload', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setMasqueradeUser('test-user');
      });

      expect(result.current.masqueradeUser).toBe('test-user');
    });

    it('should handle SET_MASQUERADE_USER action with undefined payload', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setMasqueradeUser('user');
      });

      act(() => {
        result.current.setMasqueradeUser(undefined);
      });

      expect(result.current.masqueradeUser).toBeUndefined();
    });

    it('should maintain state immutability', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.setMasqueradeUser('immutable-test');
      });

      const currentUser = result.current.masqueradeUser;

      act(() => {
        result.current.setMasqueradeUser('new-user');
      });

      expect(currentUser).toBe('immutable-test');
      expect(result.current.masqueradeUser).toBe('new-user');
    });

    it('should handle rapid successive updates', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const updates = ['user1', 'user2', 'user3', undefined, 'user4'];

      act(() => {
        updates.forEach(user => {
          result.current.setMasqueradeUser(user);
        });
      });

      expect(result.current.masqueradeUser).toBe('user4');
    });
  });

  describe('provider functionality', () => {
    it('should provide context value correctly', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.masqueradeUser).toBeUndefined();
      expect(typeof result.current.setMasqueradeUser).toBe('function');
    });

    it('should handle provider re-renders without losing state', () => {
      const TestWrapper = ({ rerenderTrigger, children }: { rerenderTrigger: number; children: React.ReactNode }) => (
        <MasqueradeProvider>
          <div data-testid={`rerender-${rerenderTrigger}`}>
            {children}
          </div>
        </MasqueradeProvider>
      );

      const { result, rerender } = renderHook(() => useMasquerade(), {
        wrapper: ({ children }) => <TestWrapper rerenderTrigger={1}>{children}</TestWrapper>,
      });

      act(() => {
        result.current.setMasqueradeUser('persistent-user');
      });

      rerender({ rerenderTrigger: 2 });

      expect(result.current.masqueradeUser).toBe('persistent-user');
    });

    it('should maintain function referential stability', () => {
      const { result, rerender } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const initialSetFunction = result.current.setMasqueradeUser;

      rerender();

      expect(result.current.setMasqueradeUser).toBe(initialSetFunction);
    });

    it('should handle multiple providers independently', () => {
      const wrapper1 = createWrapper();
      const wrapper2 = createWrapper();

      const { result: result1 } = renderHook(() => useMasquerade(), { wrapper: wrapper1 });
      const { result: result2 } = renderHook(() => useMasquerade(), { wrapper: wrapper2 });

      act(() => {
        result1.current.setMasqueradeUser('user1');
      });

      act(() => {
        result2.current.setMasqueradeUser('user2');
      });

      expect(result1.current.masqueradeUser).toBe('user1');
      expect(result2.current.masqueradeUser).toBe('user2');
    });
  });

  describe('memoization behavior', () => {
    it('should memoize context value when state does not change', () => {
      const { result, rerender } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const firstSetFunction = result.current.setMasqueradeUser;

      rerender();

      expect(result.current.setMasqueradeUser).toBe(firstSetFunction);
    });

    it('should update memoized value when state changes', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const initialUser = result.current.masqueradeUser;

      act(() => {
        result.current.setMasqueradeUser('changed-user');
      });

      expect(result.current.masqueradeUser).not.toBe(initialUser);
      expect(result.current.masqueradeUser).toBe('changed-user');
    });
  });

  describe('integration scenarios', () => {
    it('should handle realistic masquerade admin workflow', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      expect(result.current.masqueradeUser).toBeUndefined();

      act(() => {
        result.current.setMasqueradeUser('john.doe@university.edu');
      });
      expect(result.current.masqueradeUser).toBe('john.doe@university.edu');

      act(() => {
        result.current.setMasqueradeUser('jane.smith@university.edu');
      });
      expect(result.current.masqueradeUser).toBe('jane.smith@university.edu');

      act(() => {
        result.current.setMasqueradeUser(undefined);
      });
      expect(result.current.masqueradeUser).toBeUndefined();
    });

    it('should handle development testing workflow', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const testUsers = [
        'test-student-1@test.edu',
        'test-instructor@test.edu',
        'test-admin@test.edu',
      ];

      testUsers.forEach(testUser => {
        act(() => {
          result.current.setMasqueradeUser(testUser);
        });
        expect(result.current.masqueradeUser).toBe(testUser);

        act(() => {
          result.current.setMasqueradeUser(undefined);
        });
        expect(result.current.masqueradeUser).toBeUndefined();
      });
    });

    it('should handle concurrent masquerade sessions in different contexts', () => {
      const wrapper1 = createWrapper();
      const wrapper2 = createWrapper();

      const { result: admin1 } = renderHook(() => useMasquerade(), { wrapper: wrapper1 });
      const { result: admin2 } = renderHook(() => useMasquerade(), { wrapper: wrapper2 });

      act(() => {
        admin1.current.setMasqueradeUser('student1@university.edu');
        admin2.current.setMasqueradeUser('student2@university.edu');
      });

      expect(admin1.current.masqueradeUser).toBe('student1@university.edu');
      expect(admin2.current.masqueradeUser).toBe('student2@university.edu');

      act(() => {
        admin1.current.setMasqueradeUser(undefined);
      });

      expect(admin1.current.masqueradeUser).toBeUndefined();
      expect(admin2.current.masqueradeUser).toBe('student2@university.edu');
    });
  });

  describe('type safety and edge cases', () => {
    it('should handle type-safe user parameter', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const stringUser: string = 'typed-user@test.com';
      const undefinedUser: undefined = undefined;

      act(() => {
        result.current.setMasqueradeUser(stringUser);
      });
      expect(result.current.masqueradeUser).toBe(stringUser);

      act(() => {
        result.current.setMasqueradeUser(undefinedUser);
      });
      expect(result.current.masqueradeUser).toBe(undefinedUser);
    });

    it('should handle whitespace-only usernames', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const whitespaceUser = '   ';

      act(() => {
        result.current.setMasqueradeUser(whitespaceUser);
      });

      expect(result.current.masqueradeUser).toBe(whitespaceUser);
    });

    it('should handle tab and newline characters', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const specialCharsUser = 'user\t\nwith\rspecial@chars.com';

      act(() => {
        result.current.setMasqueradeUser(specialCharsUser);
      });

      expect(result.current.masqueradeUser).toBe(specialCharsUser);
    });

    it('should maintain state consistency across multiple updates', () => {
      const { result } = renderHook(() => useMasquerade(), {
        wrapper: createWrapper(),
      });

      const updates = [
        'user1',
        undefined,
        'user2',
        '',
        'user3',
        undefined,
        'final-user',
      ];

      updates.forEach(update => {
        act(() => {
          result.current.setMasqueradeUser(update);
        });
        expect(result.current.masqueradeUser).toBe(update);
      });
    });
  });
});
