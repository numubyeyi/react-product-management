// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvynSxo-1uZQ9xi267lfbjB6xgEl3FoOM",
  authDomain: "react-product-management-fcb4f.firebaseapp.com",
  projectId: "react-product-management-fcb4f",
  storageBucket: "react-product-management-fcb4f.firebasestorage.app",
  messagingSenderId: "122657333622",
  appId: "1:122657333622:web:b8226d329fca24f8af9a57"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
