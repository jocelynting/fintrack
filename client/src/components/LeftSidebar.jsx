import Wrapper from '../assets/wrappers/LeftSidebar';
import { NavLinks } from './NavLinks';
import Logo from './Logo';
import { useDashboardContext } from '../pages/Dashboard';

const LeftSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar' : 'sidebar show__sidebar'}>
        <div className="sidebar__content">
          <Logo />
          <NavLinks isLeftSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default LeftSidebar;
