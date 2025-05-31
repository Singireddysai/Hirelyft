import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC1izKM5fqdObwWzQ2q2DKDW6KjLGznpFU",
  authDomain: "interviewassist-734a2.firebaseapp.com",
  projectId: "interviewassist-734a2",
  storageBucket: "interviewassist-734a2.firebasestorage.app",
  messagingSenderId: "448148456948",
  appId: "1:448148456948:web:99c8f3a780dfa0f0a865a1",
  measurementId: "G-BJJ0229QVD",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
