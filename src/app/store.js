import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../pages/Home/postSlice';
import userReducer from '../pages/Home/userSlice';
import authReducer from '../pages/authentication/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer,
  },
});
