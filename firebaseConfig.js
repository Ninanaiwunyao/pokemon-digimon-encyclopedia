// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pokemon-digimon-encyclopedia.firebaseapp.com",
  projectId: "pokemon-digimon-encyclopedia",
  storageBucket: "pokemon-digimon-encyclopedia.firebasestorage.app",
  messagingSenderId: "640920072988",
  appId: "1:640920072988:web:ae7c58a6b9b242de8000d9",
  measurementId: "G-5FERZJLFWQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
