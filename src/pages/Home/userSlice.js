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
  curUser: {},
  followUnfollowStatus: 'idle',
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

export const getCurrentUserDetails = createAsyncThunk(
  'user/getCurrentUserDetails',
  async id => {
    const userDoc = await getDoc(doc(collection(db, 'users'), id));
    return userDoc.data();
  }
);

export const updateCurrentUserDetails = createAsyncThunk(
  'user/updateCurrentUserDetails',
  async ({ headerImage, photoURL, name, bio, currentUserID }) => {
    const userRef = doc(collection(db, 'users'), currentUserID);
    await updateDoc(userRef, {
      headerImage: headerImage,
      photoURL: photoURL,
      name: name,
      bio: bio,
    });
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
  'user/unFollowUser',
  async ({ currentUserID, unFollowedUserID }, thunkAPI) => {
    try {
      const currentUserDocs = await getDoc(doc(db, 'users', currentUserID));
      const currentUser = currentUserDocs?.data();
      // Remove user from current user's followings list:
      const currentUserRef = doc(collection(db, 'users'), currentUserID);
      await updateDoc(currentUserRef, {
        following: currentUser.following.filter(id => id !== unFollowedUserID),
      });
      const followedUserDocs = await getDoc(doc(db, 'users', unFollowedUserID));
      const followedUser = followedUserDocs?.data();
      // Remove user from other user's followers list:
      const followedUserRef = doc(collection(db, 'users'), unFollowedUserID);
      await updateDoc(followedUserRef, {
        followers: followedUser.followers.filter(id => id !== currentUserID),
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
    [getCurrentUserDetails.fulfilled]: (state, action) => {
      state.curUser = action.payload;
    },
    [followUser.pending]: state => {
      state.followUnfollowStatus = 'loading';
    },
    [followUser.fulfilled]: state => {
      state.followUnfollowStatus = 'fulfilled';
    },
    [unFollowUser.pending]: state => {
      state.followUnfollowStatus = 'loading';
    },
    [unFollowUser.fulfilled]: state => {
      state.followUnfollowStatus = 'fulfilled';
    },
  },
});

export default userSlice.reducer;
