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

export const usePathwaysByCategory = () => {
  // TODO The backend is missing.
  // The pathways must arrive from the backend already grouped by category,
  // and the backend needs to return the category label in the plural form,
  // already internationalized.
  return [];
};
