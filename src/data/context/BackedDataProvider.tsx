import React, {
  createContext, useContext, useMemo, useReducer, ReactNode,
  useCallback,
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
    /* istanbul ignore next */
    default:
      return state;
  }
};

interface BackedDataProviderProps {
  children: ReactNode;
}

export const BackedDataProvider: React.FC<BackedDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(backedDataReducer, initialState);

  const setBackUpData = useCallback((backUpData: any) => {
    dispatch({ type: 'SET_DATA', payload: backUpData });
  }, []);

  const contextValue = useMemo(() => ({
    backUpData: state.backUpData,
    setBackUpData,
  }), [setBackUpData, state.backUpData]);

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
