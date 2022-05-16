import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db } from '../../firebase';

const initialState = {
  userPosts: [],
};

export const addPost = createAsyncThunk(
  'post/addPost',
  async ({ description, photoURL, uploadDate, id }) => {
    const postObj = {
      userID: id,
      description: description,
      uid: uuid(),
      likes: [],
      comments: [],
      uploadDate: uploadDate,
      photo: photoURL,
    };
    const postRef = doc(collection(db, 'posts'), postObj.uid);
    console.log(postRef);
    await setDoc(postRef, {
      ...postObj,
    });
    console.log('Added');
  }
);

export const getPostById = createAsyncThunk('post/getPostById', async id => {
  const q = query(collection(db, 'posts'), where('userID', '==', id));
  try {
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach(doc => {
    //   console.log(doc.id, ' => ', doc.data());
    // });
    // console.log(querySnapshot.docs);
    return querySnapshot;
  } catch (err) {
    console.log(err);
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [getPostById.fulfilled]: (state, action) => {
      action.payload.forEach(doc => {
        const postExists = state.userPosts.find(
          post => post.uid === doc.data().uid
        );
        !postExists && state.userPosts.push(doc.data());
      });
      console.log(current(state.userPosts));
    },
  },
});

export default postSlice.reducer;
