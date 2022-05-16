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
import { v4 as uuid } from 'uuid';
import { db } from '../../firebase';

const initialState = {
  userPosts: [],
  commentStatus: 'idle',
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

export const addComment = createAsyncThunk(
  'post/addComment',
  async ({ comment, uploadDate, userID, postID }) => {
    const commentObj = {
      userID: userID,
      comment: comment,
      uid: uuid(),
      uploadDate: uploadDate,
      postID: postID,
    };
    const commentRef = doc(collection(db, 'comments'), commentObj.uid);
    await setDoc(commentRef, {
      ...commentObj,
    });
    const postsDoc = await getDoc(doc(db, 'posts', postID));
    const posts = postsDoc?.data();
    // Add comment to post's comments:
    const postRef = doc(collection(db, 'posts'), postID);
    await updateDoc(
      postRef,
      {
        comments: [...posts.comments, commentObj.uid],
      },
      { merge: true }
    );
    const postsDocAfterPostingComment = await getDoc(doc(db, 'posts', postID));
    return postsDocAfterPostingComment.data();
  }
);

export const getPostById = createAsyncThunk('post/getPostById', async id => {
  const q = query(collection(db, 'posts'), where('userID', '==', id));
  try {
    const querySnapshot = await getDocs(q);
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
    [addComment.pending]: state => {
      state.commentStatus = 'loading';
    },
    [addComment.fulfilled]: (state, action) => {
      console.log(action.payload);
      const tempUserPosts = state.userPosts.reduce(
        (acc, curr) =>
          curr.uid === action.payload.uid
            ? [...acc, action.payload]
            : [...acc, curr],
        []
      );
      state.userPosts = tempUserPosts;
      state.commentStatus = 'fulfilled';
    },
  },
});

export default postSlice.reducer;
