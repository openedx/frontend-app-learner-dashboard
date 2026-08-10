export interface PathwayData {
  pathway: {
    name: string;
    bannerImgSrc?: string;
    courseCount: number;
  };
  pathwayRun: {
    homeUrl: string;
    isArchived: boolean;
    hasStarted: boolean;
  };
  enrollment: {
    isEmailEnabled: boolean;
  };
  provider?: {
    name: string;
  }
};

export const usePathwayData = (cardId: string): PathwayData => {
  // TODO Waiting the backend
  return {
    pathway: {
      name: '',
      courseCount: 0,
    },
    pathwayRun: {
      homeUrl: '',
      isArchived: false,
      hasStarted: true,
    },
    enrollment: {
      isEmailEnabled: true,
    },
    provider: {
      name: '',
    },
  };
};
