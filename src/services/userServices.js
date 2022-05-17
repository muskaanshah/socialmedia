import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const getUserDetailsByIdForHeader = async (id, setUserDetails) => {
  const userDoc = await getDoc(doc(collection(db, 'users'), id));
  try {
    setUserDetails({
      name: userDoc.data().name,
      photoURL: userDoc.data().photoURL,
      uid: userDoc.data().uid,
      username: userDoc.data().username,
    });
  } catch (err) {
    console.error(err);
  }
};

const getUserObjectsInArray = async (idArray, setUserObjectArray) => {
  try {
    let tempArray = [];
    const q = query(collection(db, 'users'), where('uid', 'in', idArray));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      tempArray = [...tempArray, doc.data()];
    });
    setUserObjectArray(tempArray);
  } catch (err) {
    console.error(err);
  }
};

export { getUserDetailsByIdForHeader, getUserObjectsInArray };
