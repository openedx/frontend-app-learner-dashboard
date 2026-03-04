import React, {
  createContext, useContext, useState, useMemo, useCallback,
} from 'react';

type SortOption = 'enrolled' | 'title';

interface FiltersContextType {
  filters: string[],
  sortBy: SortOption,
  pageNumber: number,
  setFilters: (newFilters: string[]) => void,
  addFilter: (filter: string) => void,
  removeFilter: (filter: string) => void,
  clearFilters: () => void,
  setSortBy: (sortBy: SortOption) => void,
  setPageNumber: (pageNumber: number) => void,
}

const FiltersContext = createContext<FiltersContextType | null>(null);

export const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('enrolled');
  const [pageNumber, setPageNumber] = useState(1);

  const addFilter = useCallback((filter: string) => {
    setFilters(prev => [...prev, filter]);
  }, []);

  const removeFilter = useCallback((filter: string) => {
    setFilters(prev => prev.filter(item => item !== filter));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      filters,
      sortBy,
      pageNumber,
      setFilters,
      addFilter,
      removeFilter,
      clearFilters,
      setSortBy,
      setPageNumber,
    }),
    [filters, sortBy, pageNumber, addFilter, removeFilter, clearFilters],
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
