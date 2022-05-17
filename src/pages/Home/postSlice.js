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
  singlePost: {},
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
    await setDoc(postRef, {
      ...postObj,
    });
    const usersDoc = await getDoc(doc(db, 'users', id));
    const user = usersDoc?.data();
    // Add post to user's posts:
    const userRef = doc(collection(db, 'users'), id);
    await updateDoc(
      userRef,
      {
        posts: [...user.posts, postObj.uid],
      },
      { merge: true }
    );
    // return postObj;
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
    await updateDoc(postRef, {
      comments: [...posts.comments, commentObj.uid],
    });
    const postsDocAfterPostingComment = await getDoc(doc(db, 'posts', postID));
    return postsDocAfterPostingComment.data();
  }
);

export const getPostByUserId = createAsyncThunk(
  'post/getPostByUserId',
  async id => {
    const q = query(collection(db, 'posts'), where('userID', '==', id));
    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  'post/getSinglePost',
  async id => {
    const postDoc = await getDoc(doc(collection(db, 'posts'), id));
    return postDoc.data();
  }
);

export const likePost = createAsyncThunk(
  'post/likePost',
  async ({ postID, currentUserId }) => {
    const postsDoc = await getDoc(doc(db, 'posts', postID));
    const posts = postsDoc?.data();
    const postRef = doc(collection(db, 'posts'), postID);
    await updateDoc(postRef, {
      likes: [...posts.likes, currentUserId],
    });
  }
);

export const unlikePost = createAsyncThunk(
  'post/unlikePost',
  async ({ postID, currentUserId }) => {
    const postsDoc = await getDoc(doc(db, 'posts', postID));
    const posts = postsDoc?.data();
    const postRef = doc(collection(db, 'posts'), postID);
    await updateDoc(postRef, {
      likes: posts.likes.filter(user => user !== currentUserId),
    });
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [getSinglePost.fulfilled]: (state, action) => {
      state.singlePost = action.payload;
    },
    [getPostByUserId.fulfilled]: (state, action) => {
      state.userPosts = [];
      action.payload.forEach(doc => {
        state.userPosts.push(doc.data());
      });
    },
    [addComment.pending]: state => {
      state.commentStatus = 'loading';
    },
    [addComment.fulfilled]: (state, action) => {
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
