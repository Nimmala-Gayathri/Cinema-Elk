// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd8CbWXN0NwT5aoNIe1TeXu33kv-13-0I",
  authDomain: "cinema-elk-53a4d.firebaseapp.com",
  projectId: "cinema-elk-53a4d",
  storageBucket: "cinema-elk-53a4d.appspot.com",
  messagingSenderId: "632248685130",
  appId: "1:632248685130:web:f80c989c8e7fdca8494cb3",
  measurementId: "G-EWLN6J1HVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);


