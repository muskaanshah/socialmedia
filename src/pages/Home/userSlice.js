import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';

const initialState = {
  users: [],
};

export const getAllUsers = createAsyncThunk('post/getAllUsers', async id => {
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      action.payload.forEach(doc => {
        state.users.push(doc.data());
      });
      console.log(current(state));
    },
  },
});

export default userSlice.reducer;
