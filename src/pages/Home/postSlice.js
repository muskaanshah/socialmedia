import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db } from '../../firebase';

const initialState = {};

export const addPost = createAsyncThunk(
  'post/addPost',
  async ({ description, photoURL, uploadDate, id }) => {
    console.log(photoURL);
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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
});

export default postSlice.reducer;
