/**
 * This file contains the ComputingContext created using React's useContext State.
 * It provides a way to let all the parts of the application know if it is currently computing or not.
 */

import { createContext, useContext, useState, ReactNode } from 'react';

interface ComputingContextType {
  computing: boolean;
  setComputing: (computing: boolean) => void;
}

// Create context with a default value (null initially)
const ComputingContext = createContext<ComputingContextType | null>(null);

export const ComputingProvider = ({ children }: { children: ReactNode }) => {
  const [computing, setComputing] = useState<boolean>(false);

  const value: ComputingContextType = {
    computing,
    setComputing,
  };

  return (
    <ComputingContext.Provider value={value}>
      {children}
    </ComputingContext.Provider>
  );
};

// Custom hook with type checking
export const useComputing = (): ComputingContextType => {
  const context = useContext(ComputingContext);
  if (!context) {
    throw new Error('useComputing must be used within a ComputingProvider');
  }
  return context;
};
