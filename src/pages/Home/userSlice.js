import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
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
  headerStatus: 'idle',
  avatarStatus: 'idle',
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

export const updateHeaderImage = createAsyncThunk(
  'user/updateHeaderImage',
  async ({ headerImage, currentUserID }) => {
    const userRef = doc(collection(db, 'users'), currentUserID);
    await updateDoc(userRef, {
      headerImage: headerImage,
    });
    return headerImage;
  }
);

export const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async ({ photoURL, currentUserID }) => {
    const userRef = doc(collection(db, 'users'), currentUserID);
    await updateDoc(userRef, {
      photoURL: photoURL,
    });
    return photoURL;
  }
);

export const updateOtherDetails = createAsyncThunk(
  'user/updateOtherDetails',
  async ({ name, bio, currentUserID }) => {
    const userRef = doc(collection(db, 'users'), currentUserID);
    await updateDoc(userRef, {
      name: name,
      bio: bio,
    });
    return { name, bio };
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
      return followedUserID;
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
      return unFollowedUserID;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPostToCurrentUserPosts: (state, action) => {
      state.curUser.posts = [...state.curUser.posts, action.payload];
    },
    removePostFromCurrentUserPosts: (state, action) => {
      state.curUser.posts = state.curUser.posts.filter(
        post => post !== action.payload
      );
    },
  },
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
    [followUser.fulfilled]: (state, action) => {
      state.followUnfollowStatus = 'fulfilled';
      // actions done according to if the following unfollowing is done on the logged in user's profile page
      if (state.curUser.uid === state.singleUser.uid) {
        state.singleUser.following = [
          ...state.singleUser.following,
          action.payload,
        ];
      } else {
        state.singleUser.followers = [
          ...state.singleUser.followers,
          state.curUser.uid,
        ];
      }
      state.curUser.following = [...state.curUser.following, action.payload];
      console.log(current(state.singleUser));
      console.log(current(state.curUser));
    },
    [unFollowUser.pending]: state => {
      state.followUnfollowStatus = 'loading';
    },
    [unFollowUser.fulfilled]: (state, action) => {
      state.followUnfollowStatus = 'fulfilled';
      // actions done according to if the following unfollowing is done on the logged in user's profile page
      if (state.curUser.uid === state.singleUser.uid) {
        state.singleUser.following = state.singleUser.following.filter(
          user => user !== action.payload
        );
      } else {
        state.singleUser.followers = state.singleUser.followers.filter(
          user => user !== state.curUser.uid
        );
      }
      state.curUser.following = state.curUser.following.filter(
        user => user !== action.payload
      );
      console.log(current(state.singleUser));
      console.log(current(state.curUser));
    },
    [updateOtherDetails.fulfilled]: (state, action) => {
      state.singleUser.name = action.payload.name;
      state.singleUser.bio = action.payload.bio;
      state.curUser.name = action.payload.name;
      state.curUser.bio = action.payload.bio;
    },
    [updateHeaderImage.pending]: state => {
      state.headerStatus = 'loading';
    },
    [updateHeaderImage.fulfilled]: (state, action) => {
      state.singleUser.headerImage = action.payload;
      state.curUser.headerImage = action.payload;
      state.headerStatus = 'fulfilled';
    },
    [updateProfileImage.pending]: state => {
      state.avatarStatus = 'loading';
    },
    [updateProfileImage.fulfilled]: (state, action) => {
      state.singleUser.photoURL = action.payload;
      state.curUser.photoURL = action.payload;
      state.avatarStatus = 'fulfilled';
    },
  },
});

export const { addPostToCurrentUserPosts, removePostFromCurrentUserPosts } =
  userSlice.actions;
export default userSlice.reducer;
