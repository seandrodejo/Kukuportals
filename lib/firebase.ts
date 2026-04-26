import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your verified Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaQ-JXXmzPdvy3KdDwS3wpxjpdi0TVjZc",
  authDomain: "kukuportals.firebaseapp.com",
  projectId: "kukuportals",
  storageBucket: "kukuportals.firebasestorage.app",
  messagingSenderId: "248109975111",
  appId: "1:248109975111:web:c3f2890ac4dff748af9362",
  measurementId: "G-EHDBGQEG1K"
};

// Initialize Firebase for Next.js (Prevents multi-initialization errors)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };