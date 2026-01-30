import React, {
  createContext, useContext, useMemo, useReducer, ReactNode,
} from 'react';

interface BackedDataContextType {
  backUpData: any;
  setBackUpData: (backUpData: any) => void;
}

const BackedDataContext = createContext<BackedDataContextType | null>(null);

interface BackedDataState {
  backUpData: any;
}

const initialState: BackedDataState = {
  backUpData: undefined,
};

type BackedDataAction = { type: 'SET_DATA'; payload: any };

const backedDataReducer = (state: BackedDataState, action: BackedDataAction): BackedDataState => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        backUpData: action.payload,
      };
    default:
      return state;
  }
};

interface BackedDataProviderProps {
  children: ReactNode;
}

export const BackedDataProvider: React.FC<BackedDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(backedDataReducer, initialState);

  const contextValue = useMemo(() => ({
    backUpData: state.backUpData,
    setBackUpData: (backUpData: any) => {
      dispatch({ type: 'SET_DATA', payload: backUpData });
    },
  }), [state]);

  return (
    <BackedDataContext.Provider value={contextValue}>
      {children}
    </BackedDataContext.Provider>
  );
};

export const useBackedData = (): BackedDataContextType => {
  const context = useContext(BackedDataContext);
  if (!context) {
    throw new Error('useBackedData must be used within a BackedDataProvider');
  }
  return context;
};
