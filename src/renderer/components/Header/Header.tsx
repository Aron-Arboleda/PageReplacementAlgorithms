import logo from '@assets/images/logo.png';
import './Header.css';

const Header = () => {
  return (
    <div className="flex bg-blue-950">
      <img src={logo} alt="Draft 2 Dimen Logo" className="logo" />
    </div>
  );
};

export default Header;
