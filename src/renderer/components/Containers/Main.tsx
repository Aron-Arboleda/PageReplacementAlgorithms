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
