import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);

// Modify the following line to include AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore();