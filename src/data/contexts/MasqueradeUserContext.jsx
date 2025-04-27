import { createContext } from 'react';

const MasqueradeUserContext = createContext({
  masqueradeUser: undefined,
  masqueradeIsSuccess: undefined,
  masqueradeIsPending: undefined,
  masqueradeIsError: undefined,
  masqueradeError: undefined,
  setMasqueradeUser: undefined,
  setMasqueradeIsSuccess: undefined,
  setMasqueradeIsPending: undefined,
  setMasqueradeIsError: undefined,
  setMasqueradeError: undefined,
});

export default MasqueradeUserContext;
