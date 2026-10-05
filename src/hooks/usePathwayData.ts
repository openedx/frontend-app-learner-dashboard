import { useMemo } from 'react';

import {
  useInitializeLearnerHome,
  usePathwaysByCategory as usePathwaysByCategoryQuery,
  usePathwaysByCourse,
} from '@src/data/hooks';
import useCourseData from '@src/hooks/useCourseData';

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
}

export interface PathwaysInCategoryData {
  categoryLabelPlural: string;
  pathways: PathwayData[];
}

const EMPTY_PATHWAYS_BY_CATEGORY: PathwaysInCategoryData[] = [];
const EMPTY_PATHWAYS: PathwayData[] = [];

export const usePathwaysByCategory = (): PathwaysInCategoryData[] => {
  const { data } = usePathwaysByCategoryQuery();
  return data ?? EMPTY_PATHWAYS_BY_CATEGORY;
};

export const useCoursePathways = (cardId: string): PathwayData[] => {
  const { data } = useInitializeLearnerHome();
  // Every card requests the pathways of all the courses, so they share a single request
  const courseIds = useMemo(
    () => (data?.courses || []).map((course) => course.courseRun?.courseId).filter(Boolean),
    [data],
  );
  const { data: pathwaysByCourse } = usePathwaysByCourse(courseIds);
  const courseId = useCourseData(cardId)?.courseRun?.courseId;
  return (courseId && pathwaysByCourse?.[courseId]) || EMPTY_PATHWAYS;
};
