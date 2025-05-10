/**
 * Main.tsx file is the main container for the application.
 * It contains the navigation bar and the main content area.
 */

import Navigation from '@components/Navigation/Navigation';
import './Containers.css';

function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="mainContainer">
      <div className="centerContainer">
        <Navigation />
        {children}
      </div>
    </div>
  );
}

export default Main;
