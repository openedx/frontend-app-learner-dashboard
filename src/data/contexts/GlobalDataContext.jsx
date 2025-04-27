import { createContext } from 'react';

const GlobalDataContext = createContext({
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
