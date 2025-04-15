import './Navigation.css';
import { navigations } from '@utils/constants/navigations';
import logo from '@assets/icon.png';
import { NavigationItem } from '@utils/constants/navigations';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useComputing } from 'src/renderer/contexts/ComputingContext';
import { toast, ToastContainer } from 'react-toastify';
// import { useGeneralInfo } from 'src/renderer/contexts/GeneralInfoContext';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { computing } = useComputing();
  // const { isDisabled } = useGeneralInfo();

  const navFirstSection = [navigations[0]];
  const navSecondSection = navigations.slice(1);

  const handleNavigation = (path: string | null) => {
    // if (computing) {
    //   toast.error('Please wait until the current computation is finished.', {
    //     autoClose: 2000,
    //   });
    //   return;
    // }
    // if (!isDisabled) {
    //   toast.error('Please fill up general information inputs.', {
    //     autoClose: 2000,
    //   });
    //   return;
    // }
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
            alt="Draft 2 Dimen Logo"
            className="navBarLogo"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/'); // Navigate to root
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
