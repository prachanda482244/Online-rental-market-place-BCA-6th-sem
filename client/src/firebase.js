// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "mern-estate-85714.firebaseapp.com",
    projectId: "mern-estate-85714",
    storageBucket: "mern-estate-85714.appspot.com",
    messagingSenderId: "823566454536",
    appId: "1:823566454536:web:e32b83059efced35fd66bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);