// import { Sample } from '@utils/helpers/classes/sample';
// import { createContext, useContext, useState, ReactNode } from 'react';

// interface SampleContextType {
//   sample: Sample | null;
//   setSample: (sample: Sample | null) => void;
// }

// // Create context with a default value (null initially)
// const SampleContext = createContext<SampleContextType | null>(null);

// export const SampleProvider = ({ children }: { children: ReactNode }) => {
//   const [sample, setSample] = useState<Sample | null>(null);

//   const value: SampleContextType = {
//     sample,
//     setSample,
//   };

//   return (
//     <SampleContext.Provider value={value}>{children}</SampleContext.Provider>
//   );
// };

// // Custom hook with type checking
// export const useSample = (): SampleContextType => {
//   const context = useContext(SampleContext);
//   if (!context) {
//     throw new Error('useSample must be used within a SampleProvider');
//   }
//   return context;
// };
