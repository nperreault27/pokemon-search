import { useState, createContext } from 'react';

type filtersType = {
  fuzzyFilter: string;
  origionalFilter: boolean;
  typeFilter: string[];
  chunkSize: number;
};

const FiltersContext = createContext<{
  filters: filtersType;
  setFilters: (filtersType) => void;
}>({
  filters: {},
  setFilters: () => {},
});

const FiltersProvider = ({ children }) => {
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
