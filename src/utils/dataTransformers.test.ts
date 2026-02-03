import { FilterKeys, SortKeys, ListPageSize } from 'data/constants/app';
import {
  getVisibleList,
  getTransformedCourseDataList,
  getTransformedCourseDataObject,
} from './dataTransformers';

const mockGet = jest.fn();

Object.defineProperty(window, 'location', {
  value: {
    search: '',
  },
  writable: true,
});

// Mock URLSearchParams constructor
global.URLSearchParams = jest.fn().mockImplementation(() => ({
  get: mockGet,
}));

type VisibleListResult = {
  visibleList: Array<{
    course: { courseName: string };
    enrollment: { lastEnrolled: Date }
  }>;
  numPages: number;
};

describe('dataTransformers', () => {
  const mockCourses = [
    {
      course: {
        courseName: 'Introduction to React',
        courseNumber: 'CS101',
      },
      enrollment: {
        isEnrolled: true,
        isVerified: false,
        hasStarted: true,
        lastEnrolled: '2024-01-15T00:00:00Z',
      },
      courseRun: {
        isArchived: false,
      },
    },
    {
      course: {
        courseName: 'Advanced JavaScript',
        courseNumber: 'CS201',
      },
      enrollment: {
        isEnrolled: true,
        isVerified: true,
        hasStarted: false,
        lastEnrolled: '2024-02-01T00:00:00Z',
      },
      courseRun: {
        isArchived: false,
      },
    },
    {
      course: {
        courseName: 'Data Structures',
        courseNumber: 'CS301',
      },
      enrollment: {
        isEnrolled: false,
        isVerified: false,
        hasStarted: false,
        lastEnrolled: null,
      },
      courseRun: null,
    },
    {
      course: {
        courseName: 'Algorithms',
        courseNumber: 'CS401',
      },
      enrollment: {
        isEnrolled: true,
        isVerified: false,
        hasStarted: true,
        lastEnrolled: '2024-01-01T00:00:00Z',
      },
      courseRun: {
        isArchived: true,
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockGet.mockReturnValue(null);
    window.location.search = '';
  });

  describe('getTransformedCourseDataObject', () => {
    it('should transform courses array into object with cardId keys', () => {
      const result = getTransformedCourseDataObject(mockCourses);

      expect(Object.keys(result)).toEqual(['card-0', 'card-1', 'card-2', 'card-3']);
      expect(result['card-0']).toMatchObject({
        ...mockCourses[0],
        cardId: 'card-0',
      });
      expect(result['card-1']).toMatchObject({
        ...mockCourses[1],
        cardId: 'card-1',
      });
    });

    it('should add current timestamp to lastEnrolled when null', () => {
      const coursesWithNullEnrollment = [
        {
          course: { courseName: 'Test Course' },
          enrollment: {
            lastEnrolled: null,
            isEnrolled: true,
          },
        },
      ];

      const result = getTransformedCourseDataObject(coursesWithNullEnrollment);
      const transformedCourse = result['card-0'];

      expect(transformedCourse.enrollment.lastEnrolled).toBeGreaterThan(0);
      expect(typeof transformedCourse.enrollment.lastEnrolled).toBe('number');
    });

    it('should preserve existing lastEnrolled timestamp', () => {
      const existingTimestamp = '2024-01-15T00:00:00Z';
      const coursesWithTimestamp = [
        {
          enrollment: {
            lastEnrolled: existingTimestamp,
          },
        },
      ];

      const result = getTransformedCourseDataObject(coursesWithTimestamp);

      expect(result['card-0'].enrollment.lastEnrolled).toBe(existingTimestamp);
    });

    it('should handle empty courses array', () => {
      const result = getTransformedCourseDataObject([]);

      expect(result).toEqual({});
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should handle courses without enrollment property', () => {
      const coursesWithoutEnrollment = [
        {
          course: { courseName: 'Test Course' },
        },
      ];

      const result = getTransformedCourseDataObject(coursesWithoutEnrollment);

      expect(result['card-0']).toMatchObject({
        course: { courseName: 'Test Course' },
        cardId: 'card-0',
      });
    });

    it('should generate sequential cardId for multiple courses', () => {
      const manyCourses = Array.from({ length: 5 }, (_, i) => ({
        course: { courseName: `Course ${i}` },
      }));

      const result = getTransformedCourseDataObject(manyCourses);

      expect(Object.keys(result)).toEqual([
        'card-0', 'card-1', 'card-2', 'card-3', 'card-4',
      ]);
    });
  });

  describe('getTransformedCourseDataList', () => {
    it('should transform courses array into array with cardId properties', () => {
      const result = getTransformedCourseDataList(mockCourses);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(4);
      expect(result[0]).toMatchObject({
        ...mockCourses[0],
        cardId: 'card-0',
      });
      expect(result[1]).toMatchObject({
        ...mockCourses[1],
        cardId: 'card-1',
      });
    });

    it('should return empty array for empty input', () => {
      const result = getTransformedCourseDataList([]);

      expect(result).toEqual([]);
    });

    it('should maintain course order', () => {
        type MockCourseType = {
          course: { courseName: string };
        };
        const result = getTransformedCourseDataList(mockCourses) as MockCourseType[];

        expect(result[0].course.courseName).toBe('Introduction to React');
        expect(result[1].course.courseName).toBe('Advanced JavaScript');
        expect(result[2].course.courseName).toBe('Data Structures');
        expect(result[3].course.courseName).toBe('Algorithms');
    });
  });

  describe('getVisibleList', () => {
    const transformedCourses = [
      {
        course: { courseName: 'Introduction to React' },
        enrollment: {
          isEnrolled: true,
          isVerified: false,
          hasStarted: true,
          lastEnrolled: new Date('2024-01-15'),
        },
        courseRun: { isArchived: false },
      },
      {
        course: { courseName: 'Advanced JavaScript' },
        enrollment: {
          isEnrolled: true,
          isVerified: true,
          hasStarted: false,
          lastEnrolled: new Date('2024-02-01'),
        },
        courseRun: { isArchived: false },
      },
      {
        course: { courseName: 'Data Structures' },
        enrollment: {
          isEnrolled: false,
          isVerified: false,
          hasStarted: false,
          lastEnrolled: new Date('2024-01-10'),
        },
        courseRun: null,
      },
      {
        course: { courseName: 'Algorithms' },
        enrollment: {
          isEnrolled: true,
          isVerified: false,
          hasStarted: true,
          lastEnrolled: new Date('2024-01-01'),
        },
        courseRun: { isArchived: true },
      },
    ];

    describe('filtering', () => {
      it('should filter courses by notEnrolled', () => {
        const result = getVisibleList(
          transformedCourses,
          [FilterKeys.notEnrolled],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        expect(result.visibleList).toHaveLength(1);
        expect(result.visibleList[0].course.courseName).toBe('Data Structures');
      });

      it('should filter courses by done (archived)', () => {
        const result = getVisibleList(
          transformedCourses,
          [FilterKeys.done],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        expect(result.visibleList).toHaveLength(1);
        expect(result.visibleList[0].course.courseName).toBe('Algorithms');
      });

      it('should filter courses by upgraded (verified)', () => {
        const result = getVisibleList(
          transformedCourses,
          [FilterKeys.upgraded],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        expect(result.visibleList).toHaveLength(1);
        expect(result.visibleList[0].course.courseName).toBe('Advanced JavaScript');
      });

      it('should filter courses by inProgress (hasStarted)', () => {
        const result = getVisibleList(
          transformedCourses,
          [FilterKeys.inProgress],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        expect(result.visibleList).toHaveLength(2);
        const courseNames = result.visibleList.map(c => c.course.courseName).sort();
        expect(courseNames).toEqual(['Algorithms', 'Introduction to React']);
      });

      it('should filter courses by notStarted', () => {
        const result = getVisibleList(
          transformedCourses,
          [FilterKeys.notStarted],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        expect(result.visibleList).toHaveLength(2);
        const courseNames = result.visibleList.map(c => c.course.courseName).sort();
        expect(courseNames).toEqual(['Advanced JavaScript', 'Data Structures']);
      });

      it('should apply multiple filters with AND logic', () => {
        const result = getVisibleList(
          transformedCourses,
          [FilterKeys.upgraded, FilterKeys.notStarted],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        expect(result.visibleList).toHaveLength(1);
        expect(result.visibleList[0].course.courseName).toBe('Advanced JavaScript');
      });

      it('should return all courses when no filters applied', () => {
        const result = getVisibleList(
          transformedCourses,
          [],
          SortKeys.title,
          1,
        );

        expect(result.visibleList).toHaveLength(4);
      });

      it('should return empty list when filters match no courses', () => {
        const result = getVisibleList(
          transformedCourses,
          [FilterKeys.notEnrolled, FilterKeys.upgraded],
          SortKeys.title,
          1,
        );

        expect(result.visibleList).toHaveLength(0);
      });
    });

    describe('sorting', () => {
      it('should sort by title (alphabetically)', () => {
        const result = getVisibleList(
          transformedCourses,
          [],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        const sortedNames = result.visibleList.map(c => c.course.courseName);
        expect(sortedNames).toEqual([
          'Advanced JavaScript',
          'Algorithms',
          'Data Structures',
          'Introduction to React',
        ]);
      });

      it('should sort by enrolled date (newest first - reverse order)', () => {
        const result = getVisibleList(
          transformedCourses,
          [],
          SortKeys.enrolled,
          1,
        ) as VisibleListResult;

        const enrolledDates = result.visibleList.map(c => c.enrollment.lastEnrolled);
        expect(enrolledDates[0]).toEqual(new Date('2024-02-01'));
        expect(enrolledDates[1]).toEqual(new Date('2024-01-15'));
        expect(enrolledDates[2]).toEqual(new Date('2024-01-10'));
        expect(enrolledDates[3]).toEqual(new Date('2024-01-01'));
      });

      it('should handle courses with identical sort values', () => {
        const identicalCourses = [
          {
            course: { courseName: 'Same Name' },
            enrollment: { lastEnrolled: new Date('2024-01-01') },
          },
          {
            course: { courseName: 'Same Name' },
            enrollment: { lastEnrolled: new Date('2024-01-01') },
          },
        ];

        const result = getVisibleList(
          identicalCourses,
          [],
          SortKeys.title,
          1,
        );

        expect(result.visibleList).toHaveLength(2);
      });
    });

    describe('pagination', () => {
      const manyCourses = Array.from({ length: 25 }, (_, i) => ({
        course: { courseName: `Course ${i.toString().padStart(2, '0')}` },
        enrollment: {
          isEnrolled: true,
          hasStarted: false,
          lastEnrolled: new Date(`2024-01-${(i + 1).toString().padStart(2, '0')}`),
        },
        courseRun: { isArchived: false },
      }));

      it('should paginate results correctly for first page', () => {
        const result = getVisibleList(
          manyCourses,
          [],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        expect(result.visibleList).toHaveLength(ListPageSize);
        expect(result.numPages).toBe(Math.ceil(25 / ListPageSize));
        expect(result.visibleList[0].course.courseName).toBe('Course 00');
      });

      it('should paginate results correctly for second page', () => {
        const listSize = 50;
        const manyCoursesList = Array.from({ length: listSize }, (_, i) => ({
          course: { courseName: `Course ${i.toString().padStart(2, '0')}` },
        }));
        const result = getVisibleList(
          manyCoursesList,
          [],
          SortKeys.title,
          2,
        ) as VisibleListResult;
        expect(result.visibleList).toHaveLength(listSize - ListPageSize);
        const expectedFirstCourse = `Course ${ListPageSize.toString().padStart(2, '0')}`;
        expect(result.visibleList[0].course.courseName).toBe(expectedFirstCourse);
      });

      it('should handle last page with fewer items', () => {
        const result = getVisibleList(
          manyCourses,
          [],
          SortKeys.title,
          Math.ceil(25 / ListPageSize),
        );

        expect(result.visibleList).toHaveLength(25 % ListPageSize || ListPageSize);
      });

      it('should calculate correct number of pages', () => {
        const result = getVisibleList(
          manyCourses,
          [],
          SortKeys.title,
          1,
        );

        expect(result.numPages).toBe(Math.ceil(25 / ListPageSize));
      });

      it('should disable pagination when query parameter is set', () => {
        mockGet.mockReturnValue('1');

        const result = getVisibleList(
          manyCourses,
          [],
          SortKeys.title,
          1,
        );

        expect(result.visibleList).toHaveLength(25);
        expect(result.numPages).toBe(1);
      });

      it('should use pagination when disable_pagination is not 1', () => {
        mockGet.mockReturnValue('0');

        const result = getVisibleList(
          manyCourses,
          [],
          SortKeys.title,
          1,
        );

        expect(result.visibleList).toHaveLength(ListPageSize);
      });

      it('should handle empty courses array with pagination', () => {
        const result = getVisibleList(
          [],
          [],
          SortKeys.title,
          1,
        );

        expect(result.visibleList).toHaveLength(0);
        expect(result.numPages).toBe(0);
      });
    });

    describe('edge cases', () => {
      it('should handle courses with missing properties', () => {
        const coursesWithMissingProps = [
          {
            course: { courseName: 'Course 1' },
            enrollment: {}, // Missing properties
            courseRun: null,
          },
        ];

        expect(() => {
          getVisibleList(
            coursesWithMissingProps,
            [FilterKeys.inProgress],
            SortKeys.title,
            1,
          );
        }).not.toThrow();
      });

      it('should handle invalid page number', () => {
        const result = getVisibleList(
          transformedCourses,
          [],
          SortKeys.title,
          0,
        );

        // Should handle gracefully, possibly returning empty or adjusting
        expect(result.visibleList).toBeDefined();
      });

      it('should handle very large page number', () => {
        const result = getVisibleList(
          transformedCourses,
          [],
          SortKeys.title,
          999,
        );

        expect(result.visibleList).toHaveLength(0);
      });

      it('should handle null courseRun in done filter', () => {
        const coursesWithNullCourseRun = [
          {
            course: { courseName: 'Test Course' },
            enrollment: { isEnrolled: true },
            courseRun: null,
          },
        ];

        const result = getVisibleList(
          coursesWithNullCourseRun,
          [FilterKeys.done],
          SortKeys.title,
          1,
        );

        expect(result.visibleList).toHaveLength(0);
      });
    });

    describe('integration scenarios', () => {
      it('should handle complex filtering, sorting, and pagination together', () => {
        const result = getVisibleList(
          transformedCourses,
          [FilterKeys.inProgress],
          SortKeys.enrolled,
          1,
        ) as VisibleListResult;

        // Should get in-progress courses, sorted by enrollment date (newest first)
        expect(result.visibleList).toHaveLength(2);
        expect(result.visibleList[0].course.courseName).toBe('Introduction to React');
        expect(result.visibleList[1].course.courseName).toBe('Algorithms');
      });

      it('should maintain functionality with realistic course data structure', () => {
        const realisticCourses = [
          {
            course: {
              courseName: 'Introduction to Computer Science',
              courseNumber: 'CS50',
            },
            enrollment: {
              isEnrolled: true,
              isVerified: true,
              hasStarted: true,
              lastEnrolled: new Date('2024-01-15'),
            },
            courseRun: {
              isArchived: false,
              startDate: '2024-02-01',
            },
          },
        ];

        const result = getVisibleList(
          realisticCourses,
          [],
          SortKeys.title,
          1,
        ) as VisibleListResult;

        expect(result.visibleList).toHaveLength(1);
        expect(result.visibleList[0].course.courseName).toBe('Introduction to Computer Science');
      });
    });
  });
});
