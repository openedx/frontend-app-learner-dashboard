import React, {
  createContext, useContext, useMemo, useState, ReactNode,
} from 'react';

interface MasqueradeContextType {
  masqueradeUser: string | undefined,
  setMasqueradeUser: (user: string | undefined) => void,
}

const MasqueradeContext = createContext<MasqueradeContextType | null>(null);

interface MasqueradeProviderProps {
  children: ReactNode,
}

export const MasqueradeProvider: React.FC<MasqueradeProviderProps> = ({ children }) => {
  const [masqueradeUser, setMasqueradeUser] = useState<string | undefined>(undefined);

  const contextValue = useMemo(() => ({
    masqueradeUser,
    setMasqueradeUser,
  }), [masqueradeUser]);

  return (
    <MasqueradeContext.Provider value={contextValue}>
      {children}
    </MasqueradeContext.Provider>
  );
};

export const useMasquerade = (): MasqueradeContextType => {
  const context = useContext(MasqueradeContext);
  if (!context) {
    throw new Error('useMasquerade must be used within a MasqueradeProvider');
  }
  return context;
};
