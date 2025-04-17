/**
 * This file contains the ContextProvider component that wraps the
 * entire application with the other context provider.
 * (All Contexts Centralized here)
 */

import { ComputingProvider } from './ComputingContext';
import { ResultsProvider } from './ResultsContext';

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ComputingProvider>
      <ResultsProvider>{children}</ResultsProvider>
    </ComputingProvider>
  );
};

export default ContextProvider;
