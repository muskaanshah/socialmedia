import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const getUserDetailsById = async (id, setUserDetails) => {
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

export { getUserDetailsById };
