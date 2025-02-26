// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Импортируем getStorage
import { getAuth } from "firebase/auth"; // Импортируем getAuth

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzHadaQugBYc4MuOnB2tsgqZ_D50tSt0Y",
  authDomain: "first-f3a92.firebaseapp.com",
  projectId: "first-f3a92",
  storageBucket: "first-f3a92.appspot.com", // Исправьте значение storageBucket
  messagingSenderId: "118196881501",
  appId: "1:118196881501:web:8322df37cfb841de82a5b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Инициализируем storage
const auth = getAuth(app); // Инициализируем auth

export { db, app, storage, auth };