export interface PathwayData {
  pathway: {
    id: string;
    content: {
      displayName: string;
    };
    courseCount: number;
    category?: string;
    categoryLabel?: string;
    categoryBackgroundColor?: string;
    categoryTextColor?: string;
  };
  progress?: {
    completedCourseCount: number;
  };
  provider?: {
    name: string;
  };
};

export const DUMMY_PATHWAYS_BY_CATEGORY = [
  {
    categoryLabelPlural: 'Bootcamps',
    pathways: [
      {
        pathway: {
          id: 'pathway-1',
          content: { displayName: 'Data Engineering Fundamentals' },
          courseCount: 6,
          category: 'bootcamp',
          categoryLabel: 'Bootcamp',
        },
        progress: {
          completedCourseCount: 0,
        },
        provider: {
          name: 'MIT OpenCourseWare',
        },
      },
      {
        pathway: {
          id: 'pathway-2',
          content: { displayName: 'Full Stack Web Development' },
          courseCount: 12,
          category: 'bootcamp',
          categoryLabel: 'Bootcamp',
        },
        progress: {
          completedCourseCount: 5,
        },
        provider: {
          name: 'OpenCraft',
        },
      },
    ],
  },
  {
    categoryLabelPlural: 'Tutorials',
    pathways: [
      {
        pathway: {
          id: 'pathway-3',
          content: { displayName: 'Introduction to Machine Learning' },
          courseCount: 12,
          category: 'tutorial',
          categoryLabel: 'Tutorial',
          categoryBackgroundColor: '#FCE4F3',
          categoryTextColor: '#9B1766',
        },
        progress: {
          completedCourseCount: 0,
        },
        provider: {
          name: 'Stanford',
        },
      },
    ],
  },
  {
    categoryLabelPlural: 'Certificates',
    pathways: [
      {
        pathway: {
          id: 'pathway-4',
          content: { displayName: 'Data Science Foundations' },
          courseCount: 8,
          category: 'certificate',
          categoryLabel: 'Certificate',
          categoryBackgroundColor: '#000cb0',
          categoryTextColor: '#ffffff',
        },
        progress: {
          completedCourseCount: 8,
        },
      },
    ],
  },
];

export const usePathwaysByCategory = () => {
  // TODO The backend is missing.
  // The pathways must arrive from the backend already grouped by category,
  // and the backend needs to return the category label in the plural form,
  // already internationalized.
  return DUMMY_PATHWAYS_BY_CATEGORY;
};
