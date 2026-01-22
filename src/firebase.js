import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase setup file.
// This module initializes the Firebase app and exports
// ready-to-use instances of Authentication, Firestore (database),
// and Storage so they can be used across the project.

const firebaseConfig = {
  apiKey: "AIzaSyDnQeBh0PmWpZI_Y3afD0pfXle_Gl0eSaU",
  authDomain: "fitrise-db.firebaseapp.com",
  projectId: "fitrise-db",
  storageBucket: "fitrise-db.appspot.com", 
  messagingSenderId: "308529933146",
  appId: "1:308529933146:web:975d3a6d7b27e87ad2a163",
  measurementId: "G-4Z02HWYQMC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);