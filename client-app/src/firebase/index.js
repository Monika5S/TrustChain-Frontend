import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnSMmM6qS_oQSdiLSxe6vqnjaknfbfauI",
  authDomain: "trustchain-client.firebaseapp.com",
  projectId: "trustchain-client",
  storageBucket: "trustchain-client.appspot.com",
  messagingSenderId: "805155987247",
  appId: "1:805155987247:web:f510c1a0a18c45029c0bda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  collection,
  addDoc,
  getDocs,
  query,
  where,
};
