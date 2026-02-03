import React, {
  createContext, useContext, useReducer, useMemo, ReactNode,
} from 'react';

interface SelectSessionModalState {
  cardId: string | null;
}

interface SelectSessionModalContextType {
  selectSessionModal: SelectSessionModalState;
  updateSelectSessionModal: (cardId: string | null) => void;
  closeSelectSessionModal: () => void;
}

const SelectSessionModalContext = createContext<SelectSessionModalContextType | null>(null);

interface State {
  selectSessionModal: SelectSessionModalState;
}

type Action =
  | { type: 'UPDATE_SELECT_SESSION_MODAL'; payload: string | null }
  | { type: 'CLOSE_SELECT_SESSION_MODAL' };

const initialState: State = {
  selectSessionModal: { cardId: null },
};

const selectSessionModalReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_SELECT_SESSION_MODAL':
      return {
        ...state,
        selectSessionModal: { cardId: action.payload },
      };
    case 'CLOSE_SELECT_SESSION_MODAL':
      return {
        ...state,
        selectSessionModal: { cardId: null },
      };
    /* istanbul ignore next */
    default:
      return state;
  }
};

interface SelectSessionModalProviderProps {
  children: ReactNode;
}

export const SelectSessionModalProvider: React.FC<SelectSessionModalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(selectSessionModalReducer, initialState);

  const updateSelectSessionModal = (cardId: string | null) => {
    dispatch({ type: 'UPDATE_SELECT_SESSION_MODAL', payload: cardId });
  };

  const closeSelectSessionModal = () => {
    dispatch({ type: 'CLOSE_SELECT_SESSION_MODAL' });
  };

  const contextValue = useMemo(() => ({
    selectSessionModal: state.selectSessionModal,
    updateSelectSessionModal,
    closeSelectSessionModal,
  }), [state.selectSessionModal]);

  return (
    <SelectSessionModalContext.Provider value={contextValue}>
      {children}
    </SelectSessionModalContext.Provider>
  );
};

export const useSelectSessionModal = (): SelectSessionModalContextType => {
  const context = useContext(SelectSessionModalContext);
  if (!context) {
    throw new Error('useSelectSessionModal must be used within a SelectSessionModalProvider');
  }
  return context;
};
