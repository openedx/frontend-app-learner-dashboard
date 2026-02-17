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
  uuid: string,
  key: string,
  name: string,
  logoImageUrl: string,
  certificateLogoImageUrl: string | null,
}

export interface Progress {
  inProgress: number,
  notStarted: number,
  completed: number,
}

export interface ProgramCardProps {
  program: ProgramData,
}

export interface ExploreProgramsCTAProps {
  hasEnrollments?: boolean,
}
