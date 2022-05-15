import { Route, Routes as RoutesContainer } from 'react-router-dom';
import App from './App';
import {
  Explore,
  Home,
  NotFound,
  Notifications,
  Profile,
  Saved,
  Signin,
  Signup,
  SinglePost,
} from './pages';
import { PrivateRoute } from './utils';

function Routes() {
  return (
    <RoutesContainer>
      <Route element={<PrivateRoute />}>
        <Route element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/singlepost" element={<SinglePost />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route element={<PrivateRoute authRoute />}>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </RoutesContainer>
  );
}

export { Routes };
