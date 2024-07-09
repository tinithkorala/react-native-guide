import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUpApi = async (username, email, password) => {
  // Create user in firebase authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;
  
  // Update user data in firebase FireStore
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    username: username,
  });
  console.log("User signed up successfully:", user.uid);
  return true;
}

const signOutApi = async () => {
  try {
    await auth.signOut();
    console.log('User signed out successfully');
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export {
  signUpApi,
  signOutApi
}