/**
 * This file is one of the main entry points for the React application.
 */

import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes';
import ContextProvider from './contexts/ContextProvider';

export default function App() {
  return (
    <ContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ContextProvider>
  );
}
