export interface ProgramData {
  uuid: string,
  title: string,
  type: string,
  bannerImage: {
    small: ImageData,
    medium: ImageData,
    large: ImageData,
    xSmall: ImageData,
  },
  authoringOrganizations?: AuthoringOrganization[],
  progress: Progress,
}

export interface ImageData {
  height: number,
  width: number,
  url: string,
}

export interface AuthoringOrganization {
  key: string,
  logoImageUrl: string,
}

export interface Progress {
  inProgress: number,
  notStarted: number,
  completed: number,
}

export interface ProgramCardProps {
  program: ProgramData,
}
