// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8NYjyTDeQIzj2VU2j3_z0CBKvBS-jEns",
  authDomain: "test-db-fcba4.firebaseapp.com",
  projectId: "test-db-fcba4",
  storageBucket: "test-db-fcba4.firebasestorage.app",
  messagingSenderId: "441883601518",
  appId: "1:441883601518:web:3c03919742710c63db147f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

// Now 'db' is your reference to the Cloud Firestore database!
export {db}