/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, createContext } from 'react';

type filtersType = {
  fuzzyFilter: string;
  origionalFilter: boolean;
  typeFilter: string[];
  chunkSize: number;
};

const FiltersContext = createContext<{
  filters: filtersType;
  setFilters: (filtersType: any) => void;
}>({
  filters: {
    fuzzyFilter: '',
    origionalFilter: false,
    typeFilter: [],
    chunkSize: 0,
  },
  setFilters: () => {},
});

const FiltersProvider = ({ children }: any) => {
  const [filters, setFilters] = useState({
    fuzzyFilter: '',
    origionalFilter: false,
    typeFilter: [],
    chunkSize: 25,
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersContext, FiltersProvider };
