import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ authRoute = false }) => {
  const location = useLocation();
  const { currentUser } = useSelector(state => state.auth);
  if (authRoute) {
    return currentUser ? (
      <Navigate
        to={location.state?.from?.pathname ?? '/home'}
        state={{ from: null }}
        replace
      />
    ) : (
      <Outlet />
    );
  }
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export { PrivateRoute };
