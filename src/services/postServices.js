import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { getUserDetailsById } from './userServices';

const getComments = async (id, setCommentDetails, setUserDetails) => {
  const commentDoc = await getDoc(doc(collection(db, 'comments'), id));
  try {
    setCommentDetails({
      uploadDate: commentDoc.data().uploadDate,
      comment: commentDoc.data().comment,
      userID: commentDoc.data().userID,
    });
    getUserDetailsById(commentDoc.data().userID, setUserDetails);
  } catch (err) {
    console.error(err);
  }
};

// const getPostByPostId = async (id, setFeedPosts) => {
//   const q = query(collection(db, 'posts'), where('uid', '==', id));
//   try {
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach(doc => {
//       setFeedPosts(prev => {
//         console.log(prev);
//         return [...prev, doc.data()];
//       });
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

const getPostByPostId = async (feedArray, setFeedPosts) => {
  let tempArray = [];
  const q = query(collection(db, 'posts'), where('uid', 'in', feedArray));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      tempArray = [...tempArray, doc.data()];
    });
    setFeedPosts(tempArray);
  } catch (err) {
    console.error(err);
  }
};

export { getComments, getPostByPostId };
