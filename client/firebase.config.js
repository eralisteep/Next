// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzHadaQugBYc4MuOnB2tsgqZ_D50tSt0Y",
  authDomain: "first-f3a92.firebaseapp.com",
  projectId: "first-f3a92",
  storageBucket: "first-f3a92.firebasestorage.app",
  messagingSenderId: "118196881501",
  appId: "1:118196881501:web:8322df37cfb841de82a5b4"
};

// Initialize Cloud Firestore and get a reference to the service

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };