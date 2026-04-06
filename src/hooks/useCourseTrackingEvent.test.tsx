import { renderHook } from '@testing-library/react';
import useCourseData from './useCourseData';
import useCourseTrackingEvent from './useCourseTrackingEvent';

jest.mock('./useCourseData');

const mockUseCourseData = useCourseData as jest.MockedFunction<typeof useCourseData>;

describe('useCourseTrackingEvent', () => {
  const mockTracker = jest.fn();
  const mockEvent = new Event('click');
  const testCardId = 'test-card-id';

  beforeEach(() => {
    jest.clearAllMocks();
    mockTracker.mockImplementation(() => jest.fn());
  });

  describe('successful tracking scenarios', () => {
    it('should call tracker with courseId when course data exists', () => {
      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS101+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockUseCourseData).toHaveBeenCalledWith(testCardId);
      expect(mockTracker).toHaveBeenCalledWith('course-v1:TestX+CS101+2024');
    });

    it('should call tracker with courseId and additional arguments', () => {
      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS201+2024',
        },
      };

      const additionalArgs = ['arg1', 'arg2', { option: 'value' }];
      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId, ...additionalArgs));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockTracker).toHaveBeenCalledWith(
        'course-v1:TestX+CS201+2024',
        'arg1',
        'arg2',
        { option: 'value' },
      );
    });

    it('should call the returned tracking function with the event', () => {
      const mockTrackingFunction = jest.fn();
      mockTracker.mockReturnValue(mockTrackingFunction);

      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS301+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockTrackingFunction).toHaveBeenCalledWith(mockEvent);
    });

    it('should work with different event types', () => {
      const mockTrackingFunction = jest.fn();
      mockTracker.mockReturnValue(mockTrackingFunction);

      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS401+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;

      const clickEvent = new Event('click');
      const mouseEvent = new MouseEvent('mouseover');
      const customEvent = new CustomEvent('custom');

      trackingHandler(clickEvent);
      trackingHandler(mouseEvent);
      trackingHandler(customEvent);

      expect(mockTrackingFunction).toHaveBeenCalledTimes(3);
      expect(mockTrackingFunction).toHaveBeenNthCalledWith(1, clickEvent);
      expect(mockTrackingFunction).toHaveBeenNthCalledWith(2, mouseEvent);
      expect(mockTrackingFunction).toHaveBeenNthCalledWith(3, customEvent);
    });
  });

  describe('no courseId scenarios', () => {
    it('should not call tracker when courseData is null', () => {
      mockUseCourseData.mockReturnValue(null);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockUseCourseData).toHaveBeenCalledWith(testCardId);
      expect(mockTracker).not.toHaveBeenCalled();
    });

    it('should not call tracker when courseData is undefined', () => {
      mockUseCourseData.mockReturnValue(undefined);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockUseCourseData).toHaveBeenCalledWith(testCardId);
      expect(mockTracker).not.toHaveBeenCalled();
    });

    it('should not call tracker when courseRun is missing', () => {
      const mockCourseData = {
        courseName: 'Test Course',
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockTracker).not.toHaveBeenCalled();
    });

    it('should not call tracker when courseId is missing from courseRun', () => {
      const mockCourseData = {
        courseRun: {
          courseName: 'Test Course',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockTracker).not.toHaveBeenCalled();
    });

    it('should not call tracker when courseId is empty string', () => {
      const mockCourseData = {
        courseRun: {
          courseId: '',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockTracker).not.toHaveBeenCalled();
    });

    it('should not call tracker when courseId is null', () => {
      const mockCourseData = {
        courseRun: {
          courseId: null,
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockTracker).not.toHaveBeenCalled();
    });
  });

  describe('cardId variations', () => {
    it('should work with different cardId values', () => {
      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS501+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const cardIds = ['card-1', 'card-2', 'another-card-id'];

      cardIds.forEach(cardId => {
        mockUseCourseData.mockClear();
        mockTracker.mockClear();

        const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, cardId));

        const trackingHandler = result.current;
        trackingHandler(mockEvent);

        expect(mockUseCourseData).toHaveBeenCalledWith(cardId);
        expect(mockTracker).toHaveBeenCalledWith('course-v1:TestX+CS501+2024');
      });
    });

    it('should handle empty cardId', () => {
      mockUseCourseData.mockReturnValue(null);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, ''));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(mockUseCourseData).toHaveBeenCalledWith('');
      expect(mockTracker).not.toHaveBeenCalled();
    });
  });

  describe('hook behavior and memoization', () => {
    it('should return a function', () => {
      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS601+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      expect(typeof result.current).toBe('function');
    });

    it('should create new function when dependencies change', () => {
      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS701+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result, rerender } = renderHook(
        ({ cardId, tracker }) => useCourseTrackingEvent(tracker, cardId),
        {
          initialProps: {
            cardId: testCardId,
            tracker: mockTracker,
          },
        },
      );

      const firstHandler = result.current;

      rerender({ cardId: 'different-card-id', tracker: mockTracker });

      expect(result.current).not.toBe(firstHandler);
    });
  });

  describe('error handling', () => {
    it('should handle when tracker throws an error', () => {
      const errorTracker = jest.fn().mockImplementation(() => {
        throw new Error('Tracker error');
      });

      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS801+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(errorTracker, testCardId));

      const trackingHandler = result.current;

      expect(() => trackingHandler(mockEvent)).toThrow('Tracker error');
    });

    it('should handle when tracker returns null', () => {
      const nullTracker = jest.fn().mockReturnValue(null);

      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS901+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(nullTracker, testCardId));

      const trackingHandler = result.current;

      expect(() => trackingHandler(mockEvent)).toThrow();
    });

    it('should handle when useCourseData throws an error', () => {
      mockUseCourseData.mockImplementation(() => {
        throw new Error('Course data error');
      });

      expect(() => {
        renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));
      }).toThrow('Course data error');
    });
  });

  describe('integration scenarios', () => {
    it('should work with realistic tracking scenario', () => {
      const realTracker = jest.fn((courseId, action, category) => jest.fn(() => {
        console.log(`Tracking ${action} for ${courseId} in ${category}`);
      }));

      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:MITx+6.00.1x+2024',
          courseName: 'Introduction to Computer Science',
        },
        enrollment: {
          isActive: true,
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(realTracker, 'mit-cs-card', 'click', 'course-card'));

      const trackingHandler = result.current;
      trackingHandler(mockEvent);

      expect(realTracker).toHaveBeenCalledWith(
        'course-v1:MITx+6.00.1x+2024',
        'click',
        'course-card',
      );
    });

    it('should work with multiple tracking calls', () => {
      const mockTrackingFunction = jest.fn();
      mockTracker.mockReturnValue(mockTrackingFunction);

      const mockCourseData = {
        courseRun: {
          courseId: 'course-v1:TestX+CS1001+2024',
        },
      };

      mockUseCourseData.mockReturnValue(mockCourseData);

      const { result } = renderHook(() => useCourseTrackingEvent(mockTracker, testCardId));

      const trackingHandler = result.current;

      trackingHandler(mockEvent);
      trackingHandler(mockEvent);
      trackingHandler(mockEvent);

      expect(mockTracker).toHaveBeenCalledTimes(3);
      expect(mockTrackingFunction).toHaveBeenCalledTimes(3);
    });
  });
});
