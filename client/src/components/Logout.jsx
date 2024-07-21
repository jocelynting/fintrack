import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Logout';
import { useState } from 'react';
import { useDashboardContext } from '../pages/Dashboard';

const Logout = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show__dropdown' : 'dropdown'}>
        <button type="button" className="dropdown__btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default Logout;
