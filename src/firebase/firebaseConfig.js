// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJK9aDRTPE31_kygCatBZIVWgSmqJJ5WA",
  authDomain: "testdb-adbf5.firebaseapp.com",
  projectId: "testdb-adbf5",
  storageBucket: "testdb-adbf5.firebasestorage.app",
  messagingSenderId: "403099596305",
  appId: "1:403099596305:web:5c41c1dabe4e892f70a3b0",
  measurementId: "G-63X0G959B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Initialize Firebase
const analytics = getAnalytics(app);



// Now 'db' is your reference to the Cloud Firestore database!
export {db}