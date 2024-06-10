import { NavBar, LeftSidebar, PopSidebar } from '../components';
import Wrapper from '../assets/wrappers/Dashboard';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';

const DashboardContext = createContext();

const Dashboard = () => {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <DashboardContext.Provider value={{ showSidebar, toggleSidebar }}>
      <Wrapper>
        <main className="dashboard">
          <LeftSidebar />
          <PopSidebar />
          <div>
            <NavBar />
            <div className="dashboard__pages">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;
