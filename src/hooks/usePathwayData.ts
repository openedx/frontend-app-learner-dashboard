import { usePathwaysByCategory as usePathwaysByCategoryQuery } from '@src/data/hooks';

export interface PathwayData {
  pathway: {
    id: string;
    content: {
      displayName: string;
    };
    itemCount: number;
    category?: string;
    categoryLabel?: string;
    categoryLabelPlural?: string;
    categoryBackgroundColor?: string;
    categoryTextColor?: string;
  };
  progress?: {
    completedItemCount: number;
  };
  provider?: {
    name: string;
  };
}

export interface PathwaysInCategoryData {
  pathways: PathwayData[];
}

const EMPTY_PATHWAYS_BY_CATEGORY: PathwaysInCategoryData[] = [];

export const usePathwaysByCategory = (): PathwaysInCategoryData[] => {
  const { data } = usePathwaysByCategoryQuery();
  return data ?? EMPTY_PATHWAYS_BY_CATEGORY;
};
