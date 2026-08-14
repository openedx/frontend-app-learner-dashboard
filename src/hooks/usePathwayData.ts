import { getTransformedPathwayDataList, TransformedPathwayData } from "utils/dataTransformers";

export interface PathwayData {
  pathway: {
    content: {
      displayName: string;
    };
    imageUrl?: string;
    courseCount: number;
    category?: string;
    categoryLabel?: string;
    categoryBackgroundColor?: string;
    categoryTextColor?: string;
  };
  pathwayRun: {
    homeUrl: string;
    isArchived: boolean;
    hasStarted: boolean;
  };
  enrollment: {
    isEmailEnabled: boolean;
    isEnrolled: boolean;
    isVerified: boolean;
    hasStarted: boolean;
    lastEnrolled?: string | number;
  };
  provider?: {
    name: string;
  }
};

export const usePathwayData = (cardId: string): TransformedPathwayData => {
  // TODO Waiting the backend
  const pathwayList = getTransformedPathwayDataList([]);

  const data = pathwayList.find((values) => values.cardId === cardId);
  if (data) return data;

  return {
    cardId: '',
    pathway: {
      content: { displayName: '' },
      courseCount: 0,
      categoryBackgroundColor: '',
    },
    pathwayRun: {
      homeUrl: '',
      isArchived: false,
      hasStarted: true,
    },
    enrollment: {
      isEmailEnabled: true,
      isEnrolled: true,
      isVerified: false,
      hasStarted: false,
    },
    provider: {
      name: '',
    },
  };
};
