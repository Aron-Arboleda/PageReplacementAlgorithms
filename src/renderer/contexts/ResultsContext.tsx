import { Results } from '@utils/helpers/classes/results';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ResultsContextType {
  resultsGeneral: Results | null;
  setResultsGeneral: (results: Results | null) => void;
}

// Create context with a default value (null initially)
const ResultsContext = createContext<ResultsContextType | null>(null);

export const ResultsProvider = ({ children }: { children: ReactNode }) => {
  const [resultsGeneral, setResultsGeneral] = useState<Results | null>(null);

  const value: ResultsContextType = {
    resultsGeneral,
    setResultsGeneral,
  };

  return (
    <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
  );
};

// Custom hook with type checking
export const useResults = (): ResultsContextType => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
};
