import { FilterKeys, SortKeys, ListPageSize } from 'data/constants/app';
import {
  getVisibleCourses,
  getVisiblePathways,
  getVisibleItems,
  getTransformedCourseDataList,
  getTransformedCourseDataObject,
  getTransformedPathwayDataList,
  getTransformedPathwayDataObject,
  type VisibleItem,
} from './dataTransformers';

const mockGet = jest.fn();

Object.defineProperty(window, 'location', {
  value: {
    search: '',
  },
  writable: true,
});

// Mock URLSearchParams constructor
Object.defineProperty(globalThis, 'URLSearchParams', {
  value: jest.fn().mockImplementation(() => ({
    get: mockGet,
  })),
  writable: true,
});

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

  const mockPathways = [
    {
      pathway: {
        content: { displayName: 'Data Science Pathway' },
        courseCount: 3,
        type: 'professional',
      },
      pathwayRun: {
        homeUrl: '/pathway/1',
        isArchived: false,
        hasStarted: true,
      },
      enrollment: {
        isEmailEnabled: true,
        isEnrolled: true,
        isVerified: false,
        hasStarted: true,
        lastEnrolled: '2024-01-15T00:00:00Z',
      },
    },
    {
      pathway: {
        content: { displayName: 'Web Development Pathway' },
        courseCount: 5,
        type: 'verified',
      },
      pathwayRun: {
        homeUrl: '/pathway/2',
        isArchived: false,
        hasStarted: false,
      },
      enrollment: {
        isEmailEnabled: true,
        isEnrolled: true,
        isVerified: true,
        hasStarted: false,
        lastEnrolled: '2024-02-01T00:00:00Z',
      },
    },
    {
      pathway: {
        content: { displayName: 'Machine Learning Pathway' },
        courseCount: 4,
        type: 'professional',
      },
      pathwayRun: {
        homeUrl: '/pathway/3',
        isArchived: true,
        hasStarted: true,
      },
      enrollment: {
        isEmailEnabled: false,
        isEnrolled: false,
        isVerified: false,
        hasStarted: false,
        lastEnrolled: null,
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

  describe('getTransformedPathwayDataObject', () => {
    it('should transform pathways array into object with p-card cardId keys', () => {
      const result = getTransformedPathwayDataObject(mockPathways);

      expect(Object.keys(result)).toEqual(['p-card-0', 'p-card-1', 'p-card-2']);
      expect(result['p-card-0']).toMatchObject({
        ...mockPathways[0],
        cardId: 'p-card-0',
      });
      expect(result['p-card-1']).toMatchObject({
        ...mockPathways[1],
        cardId: 'p-card-1',
      });
    });

    it('should add current timestamp to lastEnrolled when null', () => {
      const pathwaysWithNullEnrollment = [
        {
          pathway: { content: { displayName: 'Test Pathway' } },
          enrollment: {
            lastEnrolled: null,
            isEnrolled: true,
          },
        },
      ];

      const result = getTransformedPathwayDataObject(pathwaysWithNullEnrollment);
      const transformedPathway = result['p-card-0'];

      expect(transformedPathway.enrollment.lastEnrolled).toBeGreaterThan(0);
      expect(typeof transformedPathway.enrollment.lastEnrolled).toBe('number');
    });

    it('should preserve existing lastEnrolled timestamp', () => {
      const existingTimestamp = '2024-01-15T00:00:00Z';
      const pathwaysWithTimestamp = [
        {
          enrollment: {
            lastEnrolled: existingTimestamp,
          },
        },
      ];

      const result = getTransformedPathwayDataObject(pathwaysWithTimestamp);

      expect(result['p-card-0'].enrollment.lastEnrolled).toBe(existingTimestamp);
    });

    it('should handle empty pathways array', () => {
      const result = getTransformedPathwayDataObject([]);

      expect(result).toEqual({});
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should handle pathways without enrollment property', () => {
      const pathwaysWithoutEnrollment = [
        {
          pathway: { content: { displayName: 'Test Pathway' } },
        },
      ];

      const result = getTransformedPathwayDataObject(pathwaysWithoutEnrollment);

      expect(result['p-card-0']).toMatchObject({
        pathway: { content: { displayName: 'Test Pathway' } },
        cardId: 'p-card-0',
      });
    });
  });

  describe('getTransformedPathwayDataList', () => {
    it('should transform pathways array into array with cardId properties', () => {
      const result = getTransformedPathwayDataList(mockPathways);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3);
      expect(result[0]).toMatchObject({
        ...mockPathways[0],
        cardId: 'p-card-0',
      });
      expect(result[1]).toMatchObject({
        ...mockPathways[1],
        cardId: 'p-card-1',
      });
    });

    it('should return empty array for empty input', () => {
      const result = getTransformedPathwayDataList([]);

      expect(result).toEqual([]);
    });

    it('should maintain pathway order', () => {
      type MockPathwayType = {
        pathway: { content: { displayName: string } };
      };
      const result = getTransformedPathwayDataList(mockPathways) as MockPathwayType[];

      expect(result[0].pathway.content.displayName).toBe('Data Science Pathway');
      expect(result[1].pathway.content.displayName).toBe('Web Development Pathway');
      expect(result[2].pathway.content.displayName).toBe('Machine Learning Pathway');
    });
  });

  describe('getVisibleCourses', () => {
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

    it('should filter courses by notEnrolled', () => {
      const result = getVisibleCourses(transformedCourses, [FilterKeys.notEnrolled]);

      expect(result).toHaveLength(1);
      expect(result[0].course.courseName).toBe('Data Structures');
    });

    it('should filter courses by done (archived)', () => {
      const result = getVisibleCourses(transformedCourses, [FilterKeys.done]);

      expect(result).toHaveLength(1);
      expect(result[0].course.courseName).toBe('Algorithms');
    });

    it('should filter courses by upgraded (verified)', () => {
      const result = getVisibleCourses(transformedCourses, [FilterKeys.upgraded]);

      expect(result).toHaveLength(1);
      expect(result[0].course.courseName).toBe('Advanced JavaScript');
    });

    it('should filter courses by inProgress (hasStarted)', () => {
      const result = getVisibleCourses(transformedCourses, [FilterKeys.inProgress]);

      expect(result).toHaveLength(2);
      const courseNames = result.map(c => c.course.courseName).sort();
      expect(courseNames).toEqual(['Algorithms', 'Introduction to React']);
    });

    it('should filter courses by notStarted', () => {
      const result = getVisibleCourses(transformedCourses, [FilterKeys.notStarted]);

      expect(result).toHaveLength(2);
      const courseNames = result.map(c => c.course.courseName).sort();
      expect(courseNames).toEqual(['Advanced JavaScript', 'Data Structures']);
    });

    it('should apply multiple filters with AND logic', () => {
      const result = getVisibleCourses(
        transformedCourses,
        [FilterKeys.upgraded, FilterKeys.notStarted],
      );

      expect(result).toHaveLength(1);
      expect(result[0].course.courseName).toBe('Advanced JavaScript');
    });

    it('should return all courses when no filters applied', () => {
      const result = getVisibleCourses(transformedCourses, []);

      expect(result).toHaveLength(4);
    });

    it('should return empty list when filters match no courses', () => {
      const result = getVisibleCourses(
        transformedCourses,
        [FilterKeys.notEnrolled, FilterKeys.upgraded],
      );

      expect(result).toHaveLength(0);
    });

    it('should handle courses with missing properties', () => {
      const coursesWithMissingProps = [
        {
          course: { courseName: 'Course 1' },
          enrollment: {}, // Missing properties
          courseRun: null,
        },
      ];

      expect(() => {
        getVisibleCourses(coursesWithMissingProps, [FilterKeys.inProgress]);
      }).not.toThrow();
    });

    it('should handle null courseRun in done filter', () => {
      const coursesWithNullCourseRun = [
        {
          course: { courseName: 'Test Course' },
          enrollment: { isEnrolled: true },
          courseRun: null,
        },
      ];

      const result = getVisibleCourses(coursesWithNullCourseRun, [FilterKeys.done]);

      expect(result).toHaveLength(0);
    });
  });

  describe('getVisiblePathways', () => {
    const transformedPathways = [
      {
        cardId: 'p-card-0',
        pathway: {
          content: { displayName: 'Data Science Pathway' },
          courseCount: 3,
          type: 'professional',
        },
        pathwayRun: { isArchived: false, hasStarted: true, homeUrl: '/1' },
        enrollment: {
          isEmailEnabled: true,
          isEnrolled: true,
          isVerified: false,
          hasStarted: true,
          lastEnrolled: '2024-01-15T00:00:00Z',
        },
      },
      {
        cardId: 'p-card-1',
        pathway: {
          content: { displayName: 'Web Development Pathway' },
          courseCount: 5,
          type: 'verified',
        },
        pathwayRun: { isArchived: false, hasStarted: false, homeUrl: '/2' },
        enrollment: {
          isEmailEnabled: true,
          isEnrolled: true,
          isVerified: true,
          hasStarted: false,
          lastEnrolled: '2024-02-01T00:00:00Z',
        },
      },
      {
        cardId: 'p-card-2',
        pathway: {
          content: { displayName: 'Machine Learning Pathway' },
          courseCount: 4,
          type: 'professional',
        },
        pathwayRun: { isArchived: true, hasStarted: true, homeUrl: '/3' },
        enrollment: {
          isEmailEnabled: false,
          isEnrolled: false,
          isVerified: false,
          hasStarted: false,
          lastEnrolled: '2024-01-01T00:00:00Z',
        },
      },
    ];

    it('should filter pathways by notEnrolled', () => {
      const result = getVisiblePathways(transformedPathways, [FilterKeys.notEnrolled], []);

      expect(result).toHaveLength(1);
      expect(result[0].pathway.content.displayName).toBe('Machine Learning Pathway');
    });

    it('should filter pathways by done (archived)', () => {
      const result = getVisiblePathways(transformedPathways, [FilterKeys.done], []);

      expect(result).toHaveLength(1);
      expect(result[0].pathway.content.displayName).toBe('Machine Learning Pathway');
    });

    it('should filter pathways by upgraded (verified)', () => {
      const result = getVisiblePathways(transformedPathways, [FilterKeys.upgraded], []);

      expect(result).toHaveLength(1);
      expect(result[0].pathway.content.displayName).toBe('Web Development Pathway');
    });

    it('should filter pathways by inProgress (hasStarted)', () => {
      const result = getVisiblePathways(transformedPathways, [FilterKeys.inProgress], []);

      expect(result).toHaveLength(1);
      expect(result[0].pathway.content.displayName).toBe('Data Science Pathway');
    });

    it('should filter pathways by notStarted', () => {
      const result = getVisiblePathways(transformedPathways, [FilterKeys.notStarted], []);

      expect(result).toHaveLength(2);
      const names = result.map(p => p.pathway.content.displayName).sort();
      expect(names).toEqual(['Machine Learning Pathway', 'Web Development Pathway']);
    });

    it('should apply multiple filters with AND logic', () => {
      const result = getVisiblePathways(
        transformedPathways,
        [FilterKeys.upgraded, FilterKeys.notStarted],
        [],
      );

      expect(result).toHaveLength(1);
      expect(result[0].pathway.content.displayName).toBe('Web Development Pathway');
    });

    it('should return all pathways when no filters or types applied', () => {
      const result = getVisiblePathways(transformedPathways, [], []);

      expect(result).toHaveLength(3);
    });

    it('should return empty list when filters match no pathways', () => {
      const result = getVisiblePathways(
        transformedPathways,
        [FilterKeys.notEnrolled, FilterKeys.upgraded],
        [],
      );

      expect(result).toHaveLength(0);
    });

    it('should filter pathways by a single type', () => {
      const result = getVisiblePathways(
        transformedPathways,
        [],
        [{ id: 'professional', text: 'Professional' }],
      );

      expect(result).toHaveLength(2);
      const names = result.map(p => p.pathway.content.displayName).sort();
      expect(names).toEqual(['Data Science Pathway', 'Machine Learning Pathway']);
    });

    it('should filter pathways by multiple types with OR logic', () => {
      const result = getVisiblePathways(
        transformedPathways,
        [],
        [
          { id: 'professional', text: 'Professional' },
          { id: 'verified', text: 'Verified' },
        ],
      );

      expect(result).toHaveLength(3);
    });

    it('should return empty list when no pathway matches the given type', () => {
      const result = getVisiblePathways(
        transformedPathways,
        [],
        [{ id: 'nonexistent', text: 'Nonexistent' }],
      );

      expect(result).toHaveLength(0);
    });

    it('should combine filters and types', () => {
      const result = getVisiblePathways(
        transformedPathways,
        [FilterKeys.notEnrolled],
        [{ id: 'professional', text: 'Professional' }],
      );

      expect(result).toHaveLength(1);
      expect(result[0].pathway.content.displayName).toBe('Machine Learning Pathway');
    });

    it('should handle null pathwayRun in done filter', () => {
      const pathwaysWithNullRun = [
        {
          cardId: 'p-card-0',
          pathway: { content: { displayName: 'Test Pathway' }, courseCount: 1, type: 'professional' },
          pathwayRun: null,
          enrollment: { isEnrolled: true },
        },
      ];

      const result = getVisiblePathways(pathwaysWithNullRun as any, [FilterKeys.done], []);

      expect(result).toHaveLength(0);
    });
  });

  describe('getVisibleItems', () => {
    const items: VisibleItem[] = [
      { cardId: 'card-0', lastEnrolled: new Date('2024-01-15'), title: 'Introduction to React', itemType: 'curse' },
      { cardId: 'card-1', lastEnrolled: new Date('2024-02-01'), title: 'Advanced JavaScript', itemType: 'curse' },
      { cardId: 'p-card-0', lastEnrolled: new Date('2024-01-10'), title: 'Data Science Pathway', itemType: 'pathway' },
      { cardId: 'card-2', lastEnrolled: new Date('2024-01-01'), title: 'Algorithms', itemType: 'curse' },
    ];

    describe('sorting', () => {
      it('should sort items by title (alphabetically)', () => {
        const result = getVisibleItems([...items], SortKeys.title, 1);

        const sortedTitles = result.visibleList.map(i => i.title);
        expect(sortedTitles).toEqual([
          'Advanced JavaScript',
          'Algorithms',
          'Data Science Pathway',
          'Introduction to React',
        ]);
      });

      it('should sort items by enrolled date (newest first - reverse order)', () => {
        const result = getVisibleItems([...items], SortKeys.enrolled, 1);

        const enrolledDates = result.visibleList.map(i => i.lastEnrolled);
        expect(enrolledDates[0]).toEqual(new Date('2024-02-01'));
        expect(enrolledDates[1]).toEqual(new Date('2024-01-15'));
        expect(enrolledDates[2]).toEqual(new Date('2024-01-10'));
        expect(enrolledDates[3]).toEqual(new Date('2024-01-01'));
      });

      it('should include both courses and pathways in the sorted result', () => {
        const result = getVisibleItems([...items], SortKeys.title, 1);

        const itemTypes = result.visibleList.map(i => i.itemType);
        expect(itemTypes).toContain('curse');
        expect(itemTypes).toContain('pathway');
      });

      it('should handle items with identical sort values', () => {
        const identicalItems: VisibleItem[] = [
          { cardId: 'card-0', lastEnrolled: new Date('2024-01-01'), title: 'Same Name', itemType: 'curse' },
          { cardId: 'p-card-0', lastEnrolled: new Date('2024-01-01'), title: 'Same Name', itemType: 'pathway' },
        ];

        const result = getVisibleItems(identicalItems, SortKeys.title, 1);

        expect(result.visibleList).toHaveLength(2);
      });
    });

    describe('pagination', () => {
      const manyItems = Array.from({ length: 25 }, (_, i) => ({
        cardId: `card-${i}`,
        lastEnrolled: new Date(`2024-01-${(i + 1).toString().padStart(2, '0')}`),
        title: `Item ${i.toString().padStart(2, '0')}`,
        itemType: 'curse' as const,
      }));

      it('should paginate results correctly for first page', () => {
        const result = getVisibleItems([...manyItems], SortKeys.title, 1);

        expect(result.visibleList).toHaveLength(ListPageSize);
        expect(result.numPages).toBe(Math.ceil(25 / ListPageSize));
        expect(result.visibleList[0].title).toBe('Item 00');
      });

      it('should paginate results correctly for second page', () => {
        const listSize = 50;
        const manyItemsList = Array.from({ length: listSize }, (_, i) => ({
          cardId: `card-${i}`,
          lastEnrolled: new Date(),
          title: `Item ${i.toString().padStart(2, '0')}`,
          itemType: 'curse' as const,
        }));
        const result = getVisibleItems([...manyItemsList], SortKeys.title, 2);

        expect(result.visibleList).toHaveLength(listSize - ListPageSize);
        const expectedFirstItem = `Item ${ListPageSize.toString().padStart(2, '0')}`;
        expect(result.visibleList[0].title).toBe(expectedFirstItem);
      });

      it('should handle last page with fewer items', () => {
        const result = getVisibleItems(
          [...manyItems],
          SortKeys.title,
          Math.ceil(25 / ListPageSize),
        );

        expect(result.visibleList).toHaveLength(25 % ListPageSize || ListPageSize);
      });

      it('should calculate correct number of pages', () => {
        const result = getVisibleItems([...manyItems], SortKeys.title, 1);

        expect(result.numPages).toBe(Math.ceil(25 / ListPageSize));
      });

      it('should disable pagination when query parameter is set', () => {
        mockGet.mockReturnValue('1');

        const result = getVisibleItems([...manyItems], SortKeys.title, 1);

        expect(result.visibleList).toHaveLength(25);
        expect(result.numPages).toBe(1);
      });

      it('should use pagination when disable_pagination is not 1', () => {
        mockGet.mockReturnValue('0');

        const result = getVisibleItems([...manyItems], SortKeys.title, 1);

        expect(result.visibleList).toHaveLength(ListPageSize);
      });

      it('should handle empty items array with pagination', () => {
        const result = getVisibleItems([], SortKeys.title, 1);

        expect(result.visibleList).toHaveLength(0);
        expect(result.numPages).toBe(0);
      });

      it('should handle very large page number', () => {
        const result = getVisibleItems([...items], SortKeys.title, 999);

        expect(result.visibleList).toHaveLength(0);
      });
    });
  });
});
