import { NavBar, LeftSidebar, PopSidebar } from '../components';
import Wrapper from '../assets/wrappers/Dashboard';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useState, createContext, useContext, useEffect } from 'react';
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

  const [isAuthError, setIsAuthError] = useState(false);

  const logoutUser = async () => {
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
    navigate('/');
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{ showSidebar, toggleSidebar, categories, user, logoutUser }}
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
