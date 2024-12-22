
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDW9fZUipSmMbQyMVYEPhC2Op3oTGpRHPw",
  authDomain: "newslock-6ce5e.firebaseapp.com",
  projectId: "newslock-6ce5e",
  storageBucket: "newslock-6ce5e.firebasestorage.app",
  messagingSenderId: "277237394990",
  appId: "1:277237394990:web:f52f567318db67af3a79bf",
  measurementId: "G-SR04QXR8BQ"
};

// Initialize Firebase
const firebaseAppConfig = initializeApp(firebaseConfig);
export default firebaseAppConfig