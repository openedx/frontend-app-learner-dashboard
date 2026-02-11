import React, {
  createContext, useContext, useReducer, useMemo,
  useCallback,
} from 'react';

type SortOption = 'enrolled' | 'title';

interface FiltersContextType {
  filters: string[];
  sortBy: SortOption;
  pageNumber: number;
  setFilters: (newFilters: string[]) => void;
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
  clearFilters: () => void;
  setSortBy: (sortBy: SortOption) => void;
  setPageNumber: (pageNumber: number) => void;
}

const FiltersContext = createContext<FiltersContextType | null>(null);

interface FiltersState {
  filters: string[];
  sortBy: SortOption;
  pageNumber: number;
}

const initialState: FiltersState = {
  filters: [],
  sortBy: 'enrolled',
  pageNumber: 1,
};

type FiltersAction = 
  | { type: 'SET_FILTERS'; payload: string[] }
  | { type: 'ADD_FILTER'; payload: string }
  | { type: 'REMOVE_FILTER'; payload: string }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'SET_PAGE_NUMBER'; payload: number };

const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'ADD_FILTER':
      return { ...state, filters: [...state.filters, action.payload] };
    case 'REMOVE_FILTER':
      return { ...state, filters: state.filters.filter(item => item !== action.payload) };
    case 'CLEAR_FILTERS':
      return { ...state, filters: [] };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_PAGE_NUMBER':
      return { ...state, pageNumber: action.payload };
    /* istanbul ignore next */
    default:
      return state;
  }
};

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  const setFilters = useCallback((newFilters: string[]) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  }, []);

  const addFilter = useCallback((filter: string) => {
    dispatch({ type: 'ADD_FILTER', payload: filter });
  }, []);

  const removeFilter = useCallback((filter: string) => {
    dispatch({ type: 'REMOVE_FILTER', payload: filter });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, []);

  const setSortBy = useCallback((sortOption: SortOption) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortOption });
  }, []);

  const setPageNumber = useCallback((pageNumber: number) => {
    dispatch({ type: 'SET_PAGE_NUMBER', payload: pageNumber });
  }, []);

  const contextValue = useMemo(() => ({
    filters: state.filters,
    sortBy: state.sortBy,
    pageNumber: state.pageNumber,
    setFilters,
    addFilter,
    removeFilter,
    clearFilters,
    setSortBy,
    setPageNumber,
  }), [state.filters, state.sortBy, state.pageNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
