/**
 * Navigation bar component for the application.
 */

import './Navigation.css';
import { navigations } from '@utils/constants/navigations';
import logo from '@assets/icon.png';
import { NavigationItem } from '@utils/constants/navigations';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useComputing } from 'src/renderer/contexts/ComputingContext';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { computing } = useComputing();

  const handleNavigation = (path: string | null) => {
    if (computing) {
      toast.error('Please wait until the current computation is finished.', {
        autoClose: 2000,
      });
      return;
    }
    if (path) {
      navigate(path);
    }
  };

  const isActive = (path: string | null): boolean =>
    path !== null && location.pathname === path;

  return (
    <>
      <div className="navBarHeader">
        <div className="navBarLogoContainer">
          <img
            src={logo}
            alt="Page Replacement Logo"
            className="navBarLogo"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/');
            }}
          />
        </div>
        <div className="navLinksContainer">
          <ul className="navBarLinks">
            {navigations.map((nav: NavigationItem, index: number) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(nav.path);
                  }}
                  className={isActive(nav.path) ? 'navBarLinks active' : ''}
                >
                  {nav.icon && <nav.icon size={19} />}
                  <span>{nav.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Navigation;
