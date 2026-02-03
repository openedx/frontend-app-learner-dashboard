import React, {
  createContext, useContext, useMemo, useReducer, ReactNode,
} from 'react';

interface MasqueradeContextType {
  masqueradeUser: string | undefined;
  setMasqueradeUser: (user: string | undefined) => void;
}

const MasqueradeContext = createContext<MasqueradeContextType | null>(null);

interface MasqueradeState {
  masqueradeUser: string | undefined;
}

const initialState: MasqueradeState = {
  masqueradeUser: undefined,
};

type MasqueradeAction = { type: 'SET_MASQUERADE_USER'; payload: string | undefined };

const masqueradeReducer = (state: MasqueradeState, action: MasqueradeAction): MasqueradeState => {
  switch (action.type) {
    case 'SET_MASQUERADE_USER':
      return {
        ...state,
        masqueradeUser: action.payload,
      };
    /* istanbul ignore next */
    default:
      return state;
  }
};

interface MasqueradeProviderProps {
  children: ReactNode;
}

export const MasqueradeProvider: React.FC<MasqueradeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(masqueradeReducer, initialState);

  const contextValue = useMemo(() => ({
    masqueradeUser: state.masqueradeUser,
    setMasqueradeUser: (user: string | undefined) => {
      dispatch({ type: 'SET_MASQUERADE_USER', payload: user });
    },
  }), [state]);

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
