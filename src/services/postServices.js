import { collection, doc, getDoc } from 'firebase/firestore';
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

export { getComments };
