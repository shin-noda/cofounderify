// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfHztJd0qTNYG9YAaS0VFolwxGM6f08kM",
  authDomain: "cofounderify-b124d.firebaseapp.com",
  projectId: "cofounderify-b124d",
  storageBucket: "cofounderify-b124d.firebasestorage.app",
  messagingSenderId: "1015050933281",
  appId: "1:1015050933281:web:c1e801c36cc2593162ff60",
  measurementId: "G-VP9940PX7M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
