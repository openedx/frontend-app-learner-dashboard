import type { PathwayData, PathwaysInCategoryData } from '@src/hooks/usePathwayData';

export const dataEngineering: PathwayData = {
  pathway: {
    id: 'pathway-1',
    content: { displayName: 'Data Engineering Fundamentals' },
    itemCount: 6,
    category: 'bootcamp',
    categoryLabel: 'Bootcamp',
    categoryLabelPlural: 'Bootcamps',
  },
  progress: { completedItemCount: 0 },
  provider: { name: 'MIT OpenCourseWare' },
};

export const fullStack: PathwayData = {
  pathway: {
    id: 'pathway-2',
    content: { displayName: 'Full Stack Web Development' },
    itemCount: 12,
    category: 'bootcamp',
    categoryLabel: 'Bootcamp',
    categoryLabelPlural: 'Bootcamps',
  },
  progress: { completedItemCount: 5 },
  provider: { name: 'OpenCraft' },
};

export const machineLearning: PathwayData = {
  pathway: {
    id: 'pathway-3',
    content: { displayName: 'Introduction to Machine Learning' },
    itemCount: 12,
    category: 'tutorial',
    categoryLabel: 'Tutorial',
    categoryLabelPlural: 'Tutorials',
    categoryBackgroundColor: '#FCE4F3',
    categoryTextColor: '#9B1766',
  },
  progress: { completedItemCount: 0 },
  provider: { name: 'Stanford' },
};

export const loremIpsum: PathwayData = {
  pathway: {
    id: 'pathway-4',
    content: { displayName: 'Lorem ipsum dolor sit amet, consectetur itaque earum rerum' },
    itemCount: 4,
    category: 'tutorial',
    categoryLabel: 'Tutorial',
    categoryLabelPlural: 'Tutorials',
    categoryBackgroundColor: '#FCE4F3',
    categoryTextColor: '#9B1766',
  },
  progress: { completedItemCount: 1 },
  provider: { name: 'Stanford' },
};

export const sedUt: PathwayData = {
  pathway: {
    id: 'pathway-5',
    content: { displayName: 'Sed ut perspiciatis unde omnis iste natus' },
    itemCount: 3,
    category: 'tutorial',
    categoryLabel: 'Tutorial',
    categoryLabelPlural: 'Tutorials',
    categoryBackgroundColor: '#FCE4F3',
    categoryTextColor: '#9B1766',
  },
  progress: { completedItemCount: 0 },
  provider: { name: 'Stanford' },
};

export const nemoEnim: PathwayData = {
  pathway: {
    id: 'pathway-6',
    content: { displayName: 'Nemo enim ipsam voluptatem' },
    itemCount: 5,
    category: 'tutorial',
    categoryLabel: 'Tutorial',
    categoryLabelPlural: 'Tutorials',
    categoryBackgroundColor: '#FCE4F3',
    categoryTextColor: '#9B1766',
  },
  progress: { completedItemCount: 2 },
  provider: { name: 'Stanford' },
};

export const dataScience: PathwayData = {
  pathway: {
    id: 'pathway-7',
    content: { displayName: 'Data Science Foundations' },
    itemCount: 8,
    category: 'certificate',
    categoryLabel: 'Certificate',
    categoryLabelPlural: 'Certificates',
    categoryBackgroundColor: '#E6DDFF',
    categoryTextColor: '#4A00B8',
  },
  progress: { completedItemCount: 8 },
};

export const atVero: PathwayData = {
  pathway: {
    id: 'pathway-8',
    content: { displayName: 'At vero eos et accusamus et iusto odio' },
    itemCount: 7,
    category: 'bootcamp',
    categoryLabel: 'Bootcamp',
    categoryLabelPlural: 'Bootcamps',
  },
  progress: { completedItemCount: 3 },
  provider: { name: 'MIT OpenCourseWare' },
};

export const pathwaysByCategory: PathwaysInCategoryData[] = [
  { pathways: [dataEngineering, fullStack, atVero] },
  { pathways: [machineLearning, loremIpsum, sedUt, nemoEnim] },
  { pathways: [dataScience] },
];

// How many labels go to the "+N" popover depends on the card width; the counts below are
// what a desktop-width card shows, where about three labels fit.
const coursePathwaySets: PathwayData[][] = [
  // "+1" popover
  [dataEngineering, machineLearning, loremIpsum, sedUt],
  // "+2" popover
  [dataEngineering, machineLearning, loremIpsum, sedUt, nemoEnim],
  // "+3" popover
  [dataEngineering, machineLearning, loremIpsum, sedUt, nemoEnim, atVero],
  // A single label
  [dataEngineering],
  // No pathways, so the strip is not shown
  [],
  // Labels with different custom colors
  [dataScience, fullStack],
  // One pathway of each category, listed in the unenroll modal
  [dataEngineering, machineLearning, dataScience],
];

/**
 * Gives the courses the pathway sets above by position, cycling, since the real course IDs
 * are unknown. Courses that get no pathways are left out of the map.
 */
export const buildPathwaysByCourse = (courseIds: string[]): Record<string, PathwayData[]> => (
  courseIds.reduce((obj, courseId, index) => {
    const pathways = coursePathwaySets[index % coursePathwaySets.length];
    return pathways.length ? { ...obj, [courseId]: pathways } : obj;
  }, {})
);
