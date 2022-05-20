import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes as RoutesContainer } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Center, Spinner } from '@chakra-ui/react';
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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setIsLoading(true);
      if (user) {
        const userObj = await getDoc(doc(db, `users/${user.uid}`));
        const data = userObj.data();
        if (data) dispatch(setCurrentUserData(data));
      } else {
        dispatch(setCurrentUserData(null));
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <Center minH="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
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
      )}
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
