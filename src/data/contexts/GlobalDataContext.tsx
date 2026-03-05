import { createContext, Dispatch, SetStateAction } from 'react';

interface EmailConfirmation {
  isNeeded: boolean,
  sendEmailUrl: string,
}

interface PlatformSettings {
  courseSearchUrl: string,
}

interface GlobalDataContextType {
  emailConfirmation: EmailConfirmation,
  platformSettings: PlatformSettings,
  setEmailConfirmation: Dispatch<SetStateAction<EmailConfirmation>> | null,
  setPlatformSettings: Dispatch<SetStateAction<PlatformSettings>> | null,
}

const GlobalDataContext = createContext<GlobalDataContextType>({
  emailConfirmation: {
    isNeeded: false,
    sendEmailUrl: '',
  },
  platformSettings: {
    courseSearchUrl: '',
  },
  setEmailConfirmation: null,
  setPlatformSettings: null,
});

export default GlobalDataContext;
