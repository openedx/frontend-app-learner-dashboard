import { useState, useMemo } from 'react';

import MasqueradeUserContext from './MasqueradeUserContext';

export default function MasqueradeUserProvider({ children }) {
  const [masqueradeUser, setMasqueradeUser] = useState(null);
  const [masqueradeIsSuccess, setMasqueradeIsSuccess] = useState(false);
  const [masqueradeIsPending, setMasqueradeIsPending] = useState(false);
  const [masqueradeIsError, setMasqueradeIsError] = useState(false);
  const [masqueradeError, setMasqueradeError] = useState(null);

  const value = useMemo(() => ({
    masqueradeUser,
    masqueradeIsPending,
    masqueradeIsSuccess,
    masqueradeIsError,
    masqueradeError,
    setMasqueradeUser,
    setMasqueradeIsPending,
    setMasqueradeIsSuccess,
    setMasqueradeIsError,
    setMasqueradeError,
  }), [masqueradeUser, masqueradeIsSuccess, masqueradeIsPending, masqueradeIsError, masqueradeError]);

  return (
    <MasqueradeUserContext.Provider value={value}>
      {children}
    </MasqueradeUserContext.Provider>
  );
}

