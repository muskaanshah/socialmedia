import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

const initialState = {
  users: [],
  singleUser: {},
};

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
});

export const getSingleUser = createAsyncThunk(
  'user/getSingleUser',
  async id => {
    const userDoc = await getDoc(doc(collection(db, 'users'), id));
    return userDoc.data();
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async ({ currentUserID, followedUserID }, thunkAPI) => {
    try {
      const currentUserDocs = await getDoc(doc(db, 'users', currentUserID));
      const currentUser = currentUserDocs?.data();
      // Add user to current user's followings list:
      const currentUserRef = doc(collection(db, 'users'), currentUserID);
      await updateDoc(currentUserRef, {
        following: [...currentUser.following, followedUserID],
      });
      const followedUserDocs = await getDoc(doc(db, 'users', followedUserID));
      const followedUser = followedUserDocs?.data();
      // Add user to followed user's followings list:
      const followedUserRef = doc(collection(db, 'users'), followedUserID);
      await updateDoc(followedUserRef, {
        followers: [...followedUser.followers, currentUserID],
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  'user/followUser',
  async ({ currentUserID, followedUserID }, thunkAPI) => {
    try {
      const currentUserDocs = await getDoc(doc(db, 'users', currentUserID));
      const currentUser = currentUserDocs?.data();
      // Add user to current user's followings list:
      const currentUserRef = doc(collection(db, 'users'), currentUserID);
      await updateDoc(currentUserRef, {
        following: [...currentUser.following, followedUserID],
      });
      const followedUserDocs = await getDoc(doc(db, 'users', followedUserID));
      const followedUser = followedUserDocs?.data();
      // Add user to followed user's followings list:
      const followedUserRef = doc(collection(db, 'users'), followedUserID);
      await updateDoc(followedUserRef, {
        followers: [...followedUser.followers, currentUserID],
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = [];
      action.payload.forEach(doc => {
        state.users.push(doc.data());
      });
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.singleUser = action.payload;
    },
    [followUser.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export default userSlice.reducer;
