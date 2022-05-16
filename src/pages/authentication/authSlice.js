import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const initialState = {
  currentUser: null,
  status: 'idle',
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
      await setDoc(userRef, {
        ...userDetails,
      });
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
      return JSON.parse(JSON.stringify(response.user));
    } catch (err) {
      console.error(err);
    }
  }
);

export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
  await signOut(auth).catch(error => {
    console.error('Failed to signout user, ', error);
  });
  console.log('Logged out');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUserData: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [signInUser.pending]: (state, action) => {
      state.currentUser = action.payload;
      state.status = 'loading';
    },
    [signUpUser.pending]: (state, action) => {
      state.currentUser = action.payload;
      state.status = 'loading';
    },
    [signInUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.status = 'fulfilled';
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.status = 'fulfilled';
    },
    [signOutUser.fulfilled]: state => {
      window.location.reload(false);
    },
  },
});

export const { setCurrentUserData } = authSlice.actions;
export default authSlice.reducer;
