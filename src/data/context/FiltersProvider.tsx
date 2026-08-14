import React, {
  createContext, useContext, useReducer, useMemo,
  useCallback,
} from 'react';

export const COURSE_CATEGORY = 'Course';
type SortOption = 'enrolled' | 'title';

export interface FilterCategory {
  id: string;
  text: string;
}

interface FiltersContextType {
  filters: string[];
  sortBy: SortOption;
  pageNumber: number;
  categories: FilterCategory[];
  setFilters: (newFilters: string[]) => void;
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
  clearFilters: () => void;
  setSortBy: (sortBy: SortOption) => void;
  setPageNumber: (pageNumber: number) => void;
  addCategory: (category: FilterCategory) => void;
  removeCategory: (category: string) => void;
  clearCategories: () => void;
}

const FiltersContext = createContext<FiltersContextType | null>(null);

interface FiltersState {
  filters: string[];
  sortBy: SortOption;
  pageNumber: number;
  categories: FilterCategory[];
}

const initialState: FiltersState = {
  filters: [],
  sortBy: 'enrolled',
  pageNumber: 1,
  categories: [],
};

type FiltersAction =
  | { type: 'SET_FILTERS'; payload: string[] }
  | { type: 'ADD_FILTER'; payload: string }
  | { type: 'REMOVE_FILTER'; payload: string }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'SET_PAGE_NUMBER'; payload: number }
  | { type: 'ADD_CATEGORY'; payload: FilterCategory }
  | { type: 'REMOVE_CATEGORY'; payload: string }
  | { type: 'CLEAR_CATEGORIES'};

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
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'REMOVE_CATEGORY':
      return { ...state, categories: state.categories.filter(item => item.id !== action.payload) };
    case 'CLEAR_CATEGORIES':
      return { ...state, categories: [] };
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

  const addCategory = useCallback((category: FilterCategory) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  }, []);

  const removeCategory = useCallback((category: string) => {
    dispatch({ type: 'REMOVE_CATEGORY', payload: category});
  }, []);

  const clearCategories = useCallback(() => {
    dispatch({ type: 'CLEAR_CATEGORIES' });
  }, []);

  const contextValue = useMemo(
    () => ({
      filters: state.filters,
      sortBy: state.sortBy,
      pageNumber: state.pageNumber,
      categories: state.categories,
      setFilters,
      addFilter,
      removeFilter,
      clearFilters,
      setSortBy,
      setPageNumber,
      addCategory,
      removeCategory,
      clearCategories,
    }),
    [
      state.filters,
      state.sortBy,
      state.categories,
      state.pageNumber,
      setFilters,
      addFilter,
      removeFilter,
      clearFilters,
      setSortBy,
      setPageNumber,
      addCategory,
      removeCategory,
      clearCategories,
    ],
  );

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
