import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ authRoute = false }) => {
  const location = useLocation();
  console.log(location.pathname);
  const user = useSelector(state => state.auth);
  if (authRoute) {
    return user.currentUser ? (
      <Navigate
        to={location.state?.from?.pathname ?? '/home'}
        state={{ from: null }}
        replace
      />
    ) : (
      <Outlet />
    );
  }
  return user.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export { PrivateRoute };
