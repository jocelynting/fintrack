import Wrapper from '../assets/wrappers/PopSidebar';
import { RiCloseFill } from 'react-icons/ri';

import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { useDashboardContext } from '../pages/Dashboard';

const PopSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  const navLinks = links.map((link) => {
    return (
      <NavLink
        key={link.text}
        to={link.path}
        className="nav__link"
        onClick={toggleSidebar}
        end
      >
        <span className="icon">{link.icon}</span>
        {link.text}
      </NavLink>
    );
  });

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar show__sidebar' : 'sidebar'}>
        <div className="sidebar__content">
          <button
            type="button"
            className="sidebar__close-btn"
            onClick={toggleSidebar}
          >
            <RiCloseFill />
          </button>
          <Logo />
          <div className="nav__links">{navLinks}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PopSidebar;
