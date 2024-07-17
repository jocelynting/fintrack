import Wrapper from '../assets/wrappers/NavBar';
import Logo from './Logo';
import Logout from './Logout';
import ThemeToggle from './ThemeToggle';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useDashboardContext } from '../pages/Dashboard';

const NavBar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <button className="nav__toggle-btn" onClick={toggleSidebar}>
        <AiOutlineMenuUnfold />
      </button>
      <div className="nav__center">
        <Logo />
        <p className="nav__center-title">Dashboard</p>
      </div>
      <div className="nav__right">
        <ThemeToggle />
        <Logout />
      </div>
    </Wrapper>
  );
};
export default NavBar;
