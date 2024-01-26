// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2-8lF3nFqzuWvKgdPlGxX6u13pJCUTSA",
  authDomain: "pehla-react-project.firebaseapp.com",
  projectId: "pehla-react-project",
  storageBucket: "pehla-react-project.appspot.com",
  messagingSenderId: "1011364576520",
  appId: "1:1011364576520:web:a7313eb0cb1997808980bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);