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
