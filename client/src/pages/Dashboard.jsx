import { NavBar, LeftSidebar, PopSidebar } from '../components';
import Wrapper from '../assets/wrappers/Dashboard';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const [categories, user] = await Promise.all([
      customFetch.get('/categories'),
      customFetch.get('/users/current-user'),
    ]);

    const data = {
      categories: categories.data.categories,
      user: user.data.user,
    };

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const DashboardContext = createContext();

const Dashboard = () => {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const { categories, user } = useLoaderData();

  return (
    <DashboardContext.Provider
      value={{ showSidebar, toggleSidebar, categories, user }}
    >
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
