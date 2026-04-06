import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { SelectSessionModalProvider, useSelectSessionModal } from './SelectSessionProvider';

describe('SelectSessionModalProvider and useSelectSessionModal', () => {
  // eslint-disable-next-line func-names
  const createWrapper = () => function ({ children }: { children: React.ReactNode }) {
    return <SelectSessionModalProvider>{children}</SelectSessionModalProvider>;
  };

  describe('useSelectSessionModal hook', () => {
    describe('initial state', () => {
      it('should return initial select session modal state', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        expect(result.current.selectSessionModal.cardId).toBeNull();
        expect(typeof result.current.updateSelectSessionModal).toBe('function');
        expect(typeof result.current.closeSelectSessionModal).toBe('function');
      });

      it('should have all expected properties in context', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        const expectedProperties = [
          'selectSessionModal',
          'updateSelectSessionModal',
          'closeSelectSessionModal',
        ];

        expectedProperties.forEach(prop => {
          expect(result.current).toHaveProperty(prop);
        });
      });

      it('should have selectSessionModal with cardId property', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        expect(result.current.selectSessionModal).toHaveProperty('cardId');
        expect(result.current.selectSessionModal.cardId).toBeNull();
      });
    });

    describe('error handling', () => {
      it('should throw error when used outside of provider', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
          renderHook(() => useSelectSessionModal());
        }).toThrow('useSelectSessionModal must be used within a SelectSessionModalProvider');

        consoleErrorSpy.mockRestore();
      });

      it('should throw error with correct message when context is null', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        try {
          renderHook(() => useSelectSessionModal());
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect((error as Error).message).toBe('useSelectSessionModal must be used within a SelectSessionModalProvider');
        }

        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe('modal state management', () => {
    describe('updateSelectSessionModal', () => {
      it('should set cardId to string value', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        const testCardId = 'card-123';

        act(() => {
          result.current.updateSelectSessionModal(testCardId);
        });

        expect(result.current.selectSessionModal.cardId).toBe(testCardId);
      });

      it('should set cardId to null', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.updateSelectSessionModal('card-123');
        });

        act(() => {
          result.current.updateSelectSessionModal(null);
        });

        expect(result.current.selectSessionModal.cardId).toBeNull();
      });

      it('should handle various cardId formats', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        const cardIds = [
          'card-1',
          'card-abc-123',
          'course-card-uuid-456',
          'simple-id',
          'id_with_underscores',
          'id-with-dashes',
          '12345',
          'a',
        ];

        cardIds.forEach(cardId => {
          act(() => {
            result.current.updateSelectSessionModal(cardId);
          });
          expect(result.current.selectSessionModal.cardId).toBe(cardId);
        });
      });

      it('should handle empty string cardId', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.updateSelectSessionModal('');
        });

        expect(result.current.selectSessionModal.cardId).toBe('');
      });

      it('should handle long cardId strings', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        const longCardId = `card-${'a'.repeat(100)}`;

        act(() => {
          result.current.updateSelectSessionModal(longCardId);
        });

        expect(result.current.selectSessionModal.cardId).toBe(longCardId);
      });

      it('should handle special characters in cardId', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        const specialCardId = 'card@123#$%^&*()';

        act(() => {
          result.current.updateSelectSessionModal(specialCardId);
        });

        expect(result.current.selectSessionModal.cardId).toBe(specialCardId);
      });

      it('should handle unicode characters in cardId', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        const unicodeCardId = 'card-节点-123';

        act(() => {
          result.current.updateSelectSessionModal(unicodeCardId);
        });

        expect(result.current.selectSessionModal.cardId).toBe(unicodeCardId);
      });

      it('should replace existing cardId', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.updateSelectSessionModal('first-card');
        });

        act(() => {
          result.current.updateSelectSessionModal('second-card');
        });

        expect(result.current.selectSessionModal.cardId).toBe('second-card');
      });

      it('should handle multiple sequential updates', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        const cardIds = ['card-1', 'card-2', 'card-3', null, 'card-4'];

        cardIds.forEach(cardId => {
          act(() => {
            result.current.updateSelectSessionModal(cardId);
          });
          expect(result.current.selectSessionModal.cardId).toBe(cardId);
        });
      });
    });

    describe('closeSelectSessionModal', () => {
      it('should set cardId to null when modal is closed', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.updateSelectSessionModal('card-123');
        });

        act(() => {
          result.current.closeSelectSessionModal();
        });

        expect(result.current.selectSessionModal.cardId).toBeNull();
      });

      it('should close modal when cardId is already null', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.closeSelectSessionModal();
        });

        expect(result.current.selectSessionModal.cardId).toBeNull();
      });

      it('should close modal multiple times without error', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        act(() => {
          result.current.closeSelectSessionModal();
          result.current.closeSelectSessionModal();
          result.current.closeSelectSessionModal();
        });

        expect(result.current.selectSessionModal.cardId).toBeNull();
      });

      it('should work correctly after multiple open and close cycles', () => {
        const { result } = renderHook(() => useSelectSessionModal(), {
          wrapper: createWrapper(),
        });

        const cycles = [
          'card-1',
          'card-2',
          'card-3',
        ];

        cycles.forEach(cardId => {
          act(() => {
            result.current.updateSelectSessionModal(cardId);
          });
          expect(result.current.selectSessionModal.cardId).toBe(cardId);

          act(() => {
            result.current.closeSelectSessionModal();
          });
          expect(result.current.selectSessionModal.cardId).toBeNull();
        });
      });
    });
  });

  describe('reducer functionality', () => {
    it('should handle UPDATE_SELECT_SESSION_MODAL action correctly', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.updateSelectSessionModal('test-card');
      });

      expect(result.current.selectSessionModal.cardId).toBe('test-card');
    });

    it('should handle CLOSE_SELECT_SESSION_MODAL action correctly', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.updateSelectSessionModal('test-card');
      });

      act(() => {
        result.current.closeSelectSessionModal();
      });

      expect(result.current.selectSessionModal.cardId).toBeNull();
    });

    it('should maintain state immutability', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.updateSelectSessionModal('immutable-test');
      });

      const currentState = result.current.selectSessionModal;

      act(() => {
        result.current.updateSelectSessionModal('new-card');
      });

      expect(currentState.cardId).toBe('immutable-test');
      expect(result.current.selectSessionModal.cardId).toBe('new-card');
      expect(result.current.selectSessionModal).not.toBe(currentState);
    });

    it('should handle rapid successive updates', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const updates = ['card1', 'card2', 'card3', null, 'card4'];

      act(() => {
        updates.forEach(cardId => {
          result.current.updateSelectSessionModal(cardId);
        });
      });

      expect(result.current.selectSessionModal.cardId).toBe('card4');
    });

    it('should create new state object on each update', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const initialState = result.current.selectSessionModal;

      act(() => {
        result.current.updateSelectSessionModal('new-card');
      });

      const updatedState = result.current.selectSessionModal;

      expect(updatedState).not.toBe(initialState);
      expect(updatedState.cardId).not.toBe(initialState.cardId);
    });
  });

  describe('provider functionality', () => {
    it('should provide context value correctly', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeDefined();
      expect(result.current.selectSessionModal).toBeDefined();
      expect(result.current.selectSessionModal.cardId).toBeNull();
      expect(typeof result.current.updateSelectSessionModal).toBe('function');
      expect(typeof result.current.closeSelectSessionModal).toBe('function');
    });

    it('should handle provider re-renders without losing state', () => {
      const TestWrapper = ({ rerenderTrigger, children }: { rerenderTrigger: number; children: React.ReactNode }) => (
        <SelectSessionModalProvider>
          <div data-testid={`rerender-${rerenderTrigger}`}>
            {children}
          </div>
        </SelectSessionModalProvider>
      );

      const { result, rerender } = renderHook(() => useSelectSessionModal(), {
        wrapper: ({ children }) => <TestWrapper rerenderTrigger={1}>{children}</TestWrapper>,
      });

      act(() => {
        result.current.updateSelectSessionModal('persistent-card');
      });

      rerender({ rerenderTrigger: 2 });

      expect(result.current.selectSessionModal.cardId).toBe('persistent-card');
    });

    it('should maintain function referential stability', () => {
      const { result, rerender } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const initialFunctions = {
        updateSelectSessionModal: result.current.updateSelectSessionModal,
        closeSelectSessionModal: result.current.closeSelectSessionModal,
      };

      rerender();

      expect(result.current.updateSelectSessionModal).toBe(initialFunctions.updateSelectSessionModal);
      expect(result.current.closeSelectSessionModal).toBe(initialFunctions.closeSelectSessionModal);
    });

    it('should handle multiple providers independently', () => {
      const wrapper1 = createWrapper();
      const wrapper2 = createWrapper();

      const { result: result1 } = renderHook(() => useSelectSessionModal(), { wrapper: wrapper1 });
      const { result: result2 } = renderHook(() => useSelectSessionModal(), { wrapper: wrapper2 });

      act(() => {
        result1.current.updateSelectSessionModal('card1');
      });

      act(() => {
        result2.current.updateSelectSessionModal('card2');
      });

      expect(result1.current.selectSessionModal.cardId).toBe('card1');
      expect(result2.current.selectSessionModal.cardId).toBe('card2');
    });
  });

  describe('memoization behavior', () => {
    it('should memoize context value when state does not change', () => {
      const { result, rerender } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const initialFunctions = {
        updateSelectSessionModal: result.current.updateSelectSessionModal,
        closeSelectSessionModal: result.current.closeSelectSessionModal,
      };

      rerender();

      expect(result.current.updateSelectSessionModal).toBe(initialFunctions.updateSelectSessionModal);
      expect(result.current.closeSelectSessionModal).toBe(initialFunctions.closeSelectSessionModal);
    });

    it('should update memoized value when selectSessionModal state changes', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const initialCardId = result.current.selectSessionModal.cardId;

      act(() => {
        result.current.updateSelectSessionModal('changed-card');
      });

      expect(result.current.selectSessionModal.cardId).not.toBe(initialCardId);
      expect(result.current.selectSessionModal.cardId).toBe('changed-card');
    });
  });

  describe('integration scenarios', () => {
    it('should handle realistic modal workflow', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      expect(result.current.selectSessionModal.cardId).toBeNull();

      act(() => {
        result.current.updateSelectSessionModal('course-card-123');
      });
      expect(result.current.selectSessionModal.cardId).toBe('course-card-123');

      act(() => {
        result.current.closeSelectSessionModal();
      });
      expect(result.current.selectSessionModal.cardId).toBeNull();
    });

    it('should handle session selection workflow for different courses', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const courseCards = [
        'course-cs101-card',
        'course-math201-card',
        'course-physics301-card',
      ];

      courseCards.forEach(cardId => {
        act(() => {
          result.current.updateSelectSessionModal(cardId);
        });
        expect(result.current.selectSessionModal.cardId).toBe(cardId);

        act(() => {
          result.current.closeSelectSessionModal();
        });
        expect(result.current.selectSessionModal.cardId).toBeNull();
      });
    });

    it('should handle switching between different cards without closing', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const cardSequence = [
        'card-A',
        'card-B',
        'card-C',
        'card-D',
      ];

      cardSequence.forEach(cardId => {
        act(() => {
          result.current.updateSelectSessionModal(cardId);
        });
        expect(result.current.selectSessionModal.cardId).toBe(cardId);
      });

      act(() => {
        result.current.closeSelectSessionModal();
      });
      expect(result.current.selectSessionModal.cardId).toBeNull();
    });

    it('should handle entitlement selection modal workflow', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const entitlementCard = 'entitlement-card-uuid-456';

      act(() => {
        result.current.updateSelectSessionModal(entitlementCard);
      });
      expect(result.current.selectSessionModal.cardId).toBe(entitlementCard);

      act(() => {
        result.current.updateSelectSessionModal(null);
      });
      expect(result.current.selectSessionModal.cardId).toBeNull();

      act(() => {
        result.current.updateSelectSessionModal(entitlementCard);
      });
      expect(result.current.selectSessionModal.cardId).toBe(entitlementCard);

      act(() => {
        result.current.closeSelectSessionModal();
      });
      expect(result.current.selectSessionModal.cardId).toBeNull();
    });

    it('should handle concurrent modal operations in different contexts', () => {
      const wrapper1 = createWrapper();
      const wrapper2 = createWrapper();

      const { result: result1 } = renderHook(() => useSelectSessionModal(), { wrapper: wrapper1 });
      const { result: result2 } = renderHook(() => useSelectSessionModal(), { wrapper: wrapper2 });

      act(() => {
        result1.current.updateSelectSessionModal('modal-1-card');
        result2.current.updateSelectSessionModal('modal-2-card');
      });

      expect(result1.current.selectSessionModal.cardId).toBe('modal-1-card');
      expect(result2.current.selectSessionModal.cardId).toBe('modal-2-card');

      act(() => {
        result1.current.closeSelectSessionModal();
      });

      expect(result1.current.selectSessionModal.cardId).toBeNull();
      expect(result2.current.selectSessionModal.cardId).toBe('modal-2-card');
    });
  });

  describe('type safety and edge cases', () => {
    it('should handle type-safe cardId parameter', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const stringCardId: string = 'typed-card-123';
      const nullCardId: null = null;

      act(() => {
        result.current.updateSelectSessionModal(stringCardId);
      });
      expect(result.current.selectSessionModal.cardId).toBe(stringCardId);

      act(() => {
        result.current.updateSelectSessionModal(nullCardId);
      });
      expect(result.current.selectSessionModal.cardId).toBe(nullCardId);
    });

    it('should maintain state consistency across multiple updates', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const updates = [
        'card-1',
        null,
        'card-2',
        '',
        'card-3',
        null,
        'final-card',
      ];

      updates.forEach(update => {
        act(() => {
          result.current.updateSelectSessionModal(update);
        });
        expect(result.current.selectSessionModal.cardId).toBe(update);
      });
    });

    it('should handle whitespace-only cardIds', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const whitespaceCardId = '   ';

      act(() => {
        result.current.updateSelectSessionModal(whitespaceCardId);
      });

      expect(result.current.selectSessionModal.cardId).toBe(whitespaceCardId);
    });

    it('should handle newlines and tabs in cardIds', () => {
      const { result } = renderHook(() => useSelectSessionModal(), {
        wrapper: createWrapper(),
      });

      const specialCharsCardId = 'card\t\nwith\rspecial-chars';

      act(() => {
        result.current.updateSelectSessionModal(specialCharsCardId);
      });

      expect(result.current.selectSessionModal.cardId).toBe(specialCharsCardId);
    });
  });
});
