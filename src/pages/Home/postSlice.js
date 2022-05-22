import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
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
  deleteStatus: 'idle',
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
    // const postsDocAfterPostingComment = await getDoc(doc(db, 'posts', postID));
    // return postsDocAfterPostingComment.data();
    return commentObj;
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

export const addPostToSaved = createAsyncThunk(
  'post/addPostToSaved',
  async ({ postID, currentUserId }) => {
    const userDocs = await getDoc(doc(db, 'users', currentUserId));
    const user = userDocs?.data();
    const userRef = doc(collection(db, 'users'), currentUserId);
    await updateDoc(userRef, {
      bookmarked: [...user.bookmarked, postID],
    });
  }
);

export const removePostFromSaved = createAsyncThunk(
  'post/removePostFromSaved',
  async ({ postID, currentUserId }) => {
    const userDocs = await getDoc(doc(db, 'users', currentUserId));
    const user = userDocs?.data();
    const userRef = doc(collection(db, 'users'), currentUserId);
    await updateDoc(userRef, {
      bookmarked: user.bookmarked.filter(post => post !== postID),
    });
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ postID, currentUserId }) => {
    await deleteDoc(doc(db, 'posts', postID));
    //delete it from users bookmarks if any
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async doc => {
      await updateDoc(doc.ref, {
        bookmarked: doc.data().bookmarked.filter(post => post !== postID),
      });
    });
    //delete it from user's posts
    const userDocs = await getDoc(doc(db, 'users', currentUserId));
    const user = userDocs?.data();
    const userRef = doc(collection(db, 'users'), currentUserId);
    await updateDoc(userRef, {
      posts: user.posts.filter(post => post !== postID),
    });
  }
);

export const editPost = createAsyncThunk(
  'post/editPost',
  async ({ postID, description }) => {
    const postRef = doc(collection(db, 'posts'), postID);
    await updateDoc(postRef, {
      description: description,
    });
  }
);

export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async ({ commentID, postID }) => {
    await deleteDoc(doc(db, 'comments', commentID));
    //delete it from post's comments
    const postDocs = await getDoc(doc(db, 'posts', postID));
    const post = postDocs?.data();
    const postRef = doc(collection(db, 'posts'), postID);
    await updateDoc(postRef, {
      comments: post.comments.filter(comment => comment !== commentID),
    });
    return { postID, commentID };
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
      state.userPosts = [...state.userPosts].sort((a, b) => {
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      });
    },
    [addComment.pending]: state => {
      state.commentStatus = 'loading';
    },
    [deletePost.pending]: state => {
      state.deleteStatus = 'loading';
    },
    [deletePost.fulfilled]: state => {
      state.deleteStatus = 'fulfilled';
    },
    [deleteComment.fulfilled]: (state, action) => {
      //if action done on profile page
      const reducerFunc = (acc, curr) =>
        curr.uid === action.payload.postID
          ? [
              ...acc,
              {
                ...curr,
                comments: curr.comments.filter(
                  comm => comm !== action.payload.commentID
                ),
              },
            ]
          : [...acc, curr];
      const tempUserPosts = state.userPosts.reduce(reducerFunc, []);
      state.userPosts = tempUserPosts;

      //if action done on single post page
      state.singlePost = {
        ...state.singlePost,
        comments: state.singlePost.comments.filter(
          comm => comm !== action.payload.commentID
        ),
      };
    },
    [addComment.fulfilled]: (state, action) => {
      //if action done on user profile page
      const reducerFunc = (acc, curr) =>
        curr.uid === action.payload.postID
          ? [
              ...acc,
              { ...curr, comments: [...curr.comments, action.payload.uid] },
            ]
          : [...acc, curr];
      const tempUserPosts = state.userPosts.reduce(reducerFunc, []);
      // console.log(tempUserPosts);
      state.userPosts = tempUserPosts;
      state.commentStatus = 'fulfilled';

      //if action done on singlepost page
      state.singlePost = {
        ...state.singlePost,
        comments: [...state.singlePost.comments, action.payload.uid],
      };
    },
  },
});

export default postSlice.reducer;
