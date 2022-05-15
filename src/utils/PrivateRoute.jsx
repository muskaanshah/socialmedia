import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ authRoute = false }) => {
  const user = useSelector(state => state.auth);
  console.log(user, 'user');
  if (authRoute) {
    return user.currentUser ? <Navigate replace to={'/home'} /> : <Outlet />;
  }
  return user.currentUser ? <Outlet /> : <Navigate to="/" />;
};

export { PrivateRoute };
