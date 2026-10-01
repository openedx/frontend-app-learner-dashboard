import { useInitializeLearnerHome } from '@src/data/hooks';
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

export const usePathwaysByCategory = (): PathwaysInCategoryData[] => {
  // TODO The backend is missing.
  // The pathways must arrive from the backend already grouped by category,
  // and the backend needs to return the category label in the plural form,
  // already internationalized.
  return [];
};

export const useCoursePathways = (cardId: string): PathwayData[] => {
  const { data } = useInitializeLearnerHome();
  const courseId = useCourseData(cardId)?.courseRun?.courseId;
  if (!courseId) {
    return [];
  }
  return data?.pathwaysByCourse?.[courseId] ?? [];
};
