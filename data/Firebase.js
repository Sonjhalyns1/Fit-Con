// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlLpNY84WjhIrxyD2yc6bQjZAoaE0qTX4",
    authDomain: "fit-connect-1c1ef.firebaseapp.com",
    projectId: "fit-connect-1c1ef",
    storageBucket: "fit-connect-1c1ef.appspot.com",
    messagingSenderId: "710517131940",
    appId: "1:710517131940:web:8bdb24691adec06fca7431"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()