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
  Category,
  Profile,
} from './pages';
import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';

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
        children: [
          {
            index: true,
            element: <Bills />,
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
          {
            path: 'category',
            element: <Category />,
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
