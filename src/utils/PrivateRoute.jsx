import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ authRoute = false }) => {
  const token = localStorage.getItem('encodedToken');
  if (authRoute) {
    return token ? <Navigate replace to={'/home'} /> : <Outlet />;
  }
  return token ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoute };
