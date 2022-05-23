import { collection, doc, getDoc } from 'firebase/firestore';
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

// const getFeedPosts = async (feedArray, setFeedPosts) => {
//   let tempArray = [];
//   try {
//     for (let i = 0; i < feedArray.length; i++) {
//       const q = query(
//         collection(db, 'posts'),
//         where('uid', '==', feedArray[i])
//       );
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach(doc => {
//         tempArray = [...tempArray, doc.data()];
//       });
//     }
//     const tempPosts = [...tempArray].sort((a, b) => {
//       return new Date(b.uploadDate) - new Date(a.uploadDate);
//     });
//     setFeedPosts(tempPosts);
//   } catch (err) {
//     console.error(err);
//   }
// };

export { getComments };
