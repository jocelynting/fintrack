import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Home,
  Landing,
  Register,
  Login,
  Dashboard,
  Error,
  Bills,
  Statistics,
  Profile,
} from './pages';
import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';
import { loader as categoryLoader } from './pages/Dashboard';
import { loader as billLoader } from './pages/Bills';
import { action as billAction } from './pages/Bills';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: categoryLoader,
        children: [
          {
            index: true,
            element: <Bills />,
            loader: billLoader,
            action: billAction,
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
