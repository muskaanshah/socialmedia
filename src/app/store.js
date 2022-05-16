import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/authentication/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
