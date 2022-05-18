import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { getUserDetailsByIdForHeader } from './userServices';

const getComments = async (id, setCommentDetails, setUserDetails) => {
  const commentDoc = await getDoc(doc(collection(db, 'comments'), id));
  try {
    setCommentDetails({
      uploadDate: commentDoc.data().uploadDate,
      comment: commentDoc.data().comment,
      userID: commentDoc.data().userID,
    });
    getUserDetailsByIdForHeader(commentDoc.data().userID, setUserDetails);
  } catch (err) {
    console.error(err);
  }
};

const getFeedPosts = async (feedArray, setFeedPosts, setLoading) => {
  let tempArray = [];
  setLoading(true);
  try {
    for (let i = 0; i < feedArray.length; i++) {
      const q = query(
        collection(db, 'posts'),
        where('uid', '==', feedArray[i])
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        tempArray = [...tempArray, doc.data()];
      });
    }
    setFeedPosts(tempArray);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

export { getComments, getFeedPosts };
