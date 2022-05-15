import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const initialState = {
  currentUser: null,
};

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password, name, username }, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDetails = {
        uid: response.user.uid,
        email: response.user.email,
        photoURL: '',
        name: name,
        bio: '',
        username: username,
        headerImage: '',
        posts: [],
        followers: [],
        following: [],
        bookmarked: [],
      };
      const userRef = doc(collection(db, 'users'), response.user.uid);
      setDoc(userRef, {
        ...userDetails,
      });
      console.log(response);
      return JSON.parse(JSON.stringify(response.user));
    } catch (err) {
      console.error(err);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      return JSON.parse(JSON.stringify(response.user));
    } catch (err) {
      console.error(err);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUserData: (state, action) => {
      state.currentUser = action.payload;
      console.log(action, 'action');
    },
  },
  extraReducers: {
    [signInUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUserData } = authSlice.actions;
export default authSlice.reducer;
