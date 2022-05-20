import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes as RoutesContainer } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import App from './App';
import { auth, db } from './firebase';
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
import { setCurrentUserData } from './pages/authentication/authSlice';
import { PrivateRoute } from './utils';

function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userObj = await getDoc(doc(db, `users/${user.uid}`));
        const data = userObj.data();
        if (data) dispatch(setCurrentUserData(data));
      } else {
        dispatch(setCurrentUserData(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <>
      <RoutesContainer>
        <Route element={<PrivateRoute />}>
          <Route element={<App />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            {/* <Route path="/notifications" element={<Notifications />} /> */}
            <Route path="/profile/:userID" element={<Profile />} />
            <Route path="/post/:postID" element={<SinglePost />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoute authRoute />}>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </RoutesContainer>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export { Routes };
