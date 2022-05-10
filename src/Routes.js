import { Route, Routes as RoutesContainer } from 'react-router-dom';
import App from './App';
import { Explore, Home, Notifications, Profile, Saved, Signin } from './pages';
import { PrivateRoute } from './utils';

function Routes() {
  return (
    <RoutesContainer>
      {/* <Route element={<PrivateRoute />}> */}
      <Route element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* </Route> */}
      <Route element={<PrivateRoute authRoute />}>
        <Route path="/" element={<Signin />} />
      </Route>
    </RoutesContainer>
  );
}

export { Routes };
