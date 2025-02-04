// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import {app} from 'firebase';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQqFA3T9P6uTXH7dlBc51oXUs6CJUk07E",
  authDomain: "placementducs.firebaseapp.com",
  projectId: "placementducs",
  storageBucket: "placementducs.firebasestorage.app",
  messagingSenderId: "166688706235",
  appId: "1:166688706235:web:b17e79e3dbaf76bf12239e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;