export interface PathwayData {
  pathway: {
    content: {
      displayName: string;
    };
    imageUrl?: string;
    courseCount: number;
    type?: string;
    typeBackgroundColor?: string;
    typeTextColor?: string;
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
      content: { displayName: '' },
      courseCount: 0,
      typeBackgroundColor: '',
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
