import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  addDoc,
  collection,
} from "firebase/firestore";
// import { OAuth2Client } from "google-auth-library";

// const provider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();
//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

function userIsLoggedIn() {
  return !getCurrentUser()?.currentUser?.isAnonymous;
}

function getCurrentUser() {
  const user = getAuth();
  if (user) {
    return user;
  } else {
    console.log("Not signed in");
    return {};
  }
}

// async function verifyUser(client_id, jwtToken) {
//   const client = new OAuth2Client(client_id);
//   const ticket = await client.verifyIdToken({
//     idToken: jwtToken,
//     audience: client_id,
//   });
//   const payload = ticket.getPayload();
//   console.log(payload);
//   return payload;
// }

// function signInUser(cred) {
//   console.log(firebase.auth());
//   return firebase.auth().signInWithCredential(cred);
// }

async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  saveUserData(result.user);
  return result;
}

async function saveUserData(data) {
  const docRef = doc(db, "users", data.email);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      email: data.email,
      emailVerified: data.emailVerified,
      name: data.displayName,
      pictureURL: data.photoURL,
      uid: data.uid,
      subscriptions: [],
      accountCreationDate: serverTimestamp(),
    });
  }
}

async function subscribeToUser(userEmail) {
  let succes = false;
  const user = getCurrentUser();
  const docRef = doc(db, "users", user.currentUser.email);
  await updateDoc(docRef, { subscriptions: arrayUnion(userEmail) });
  succes = true;
  return succes;
}

function checkIfSubscribed(userEmail) {
  const user = getCurrentUser().currentUser;
  if (user) {
    const docRef = doc(db, "users", user.email);
    getDoc(docRef).then((docSnap) => {
      if (docSnap?.data().subscriptions.includes(userEmail)) {
        return true;
      } else {
        return false;
      }
    });
  }
}

async function postImages(images, postInfo) {
  const user = getCurrentUser();
  await addDoc(collection(db, "users", user.email, "posts"), {
    postTitle: postInfo.postTitle,
    images: images,
    tags: postInfo.tags,
  });
}

export {
  saveUserData,
  subscribeToUser,
  postImages,
  signInWithGoogle,
  checkIfSubscribed,
  userIsLoggedIn,
};
