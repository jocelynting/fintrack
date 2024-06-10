import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { useDashboardContext } from '../pages/Dashboard';

export const NavLinks = ({ isLeftSidebar }) => {
  const { toggleSidebar } = useDashboardContext();

  const navLinks = links.map((link) => {
    return (
      <NavLink
        key={link.text}
        to={link.path}
        className="nav__link"
        onClick={isLeftSidebar ? null : toggleSidebar}
        end
      >
        <span className="icon">{link.icon}</span>
        {link.text}
      </NavLink>
    );
  });

  return <div className="nav__links">{navLinks}</div>;
};
