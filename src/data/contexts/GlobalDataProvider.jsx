import { useState, useMemo } from 'react';

import GlobalDataContext from './GlobalDataContext';

export default function GlobalDataProvider({ children }) {
  const [emailConfirmation, setEmailConfirmation] = useState({ isNeeded: false, sendEmailUrl: '' });
  const [platformSettings, setPlatformSettings] = useState({ courseSearchUrl: '' });

  const value = useMemo(() => ({
    emailConfirmation,
    platformSettings,
    setEmailConfirmation,
    setPlatformSettings,
  }), [emailConfirmation, platformSettings]);

  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
}


