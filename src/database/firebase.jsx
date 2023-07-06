import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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

function getCurrentUser() {
  const user = getAuth();
  console.log(user);
  if (user) {
    return user;
  } else {
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

async function saveUserData(data) {
  const user = getCurrentUser();
  console.log(user);
  console.log(user.email);
  const docRef = doc(db, "users", user.email);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    await setDoc(docRef, {
      email: data.email,
      emailVerified: data.email_verified,
      name: data.name,
      pictureURL: data.picture,
      subscriptions: [],
      accountCreationDate: serverTimestamp(),
    });
  }
}

async function subscribeToUser(userMail) {
  const user = getCurrentUser();
  console.log(user);
  const docRef = doc(db, "users", user.email);
  await updateDoc(docRef, { subscriptions: arrayUnion(userMail) });
}

async function postImages(images, postInfo) {
  const user = getCurrentUser();
  await addDoc(collection(db, "users", user.email, "posts"), {
    postTitle: postInfo.postTitle,
    images: images,
    tags: postInfo.tags,
  });
}

export { saveUserData, subscribeToUser };
