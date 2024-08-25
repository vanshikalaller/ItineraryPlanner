// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpDBtvS0ZGVmmtP2HH_T8uG-aH_Yfdumk",
  authDomain: "itinearyplanner.firebaseapp.com",
  projectId: "itinearyplanner",
  storageBucket: "itinearyplanner.appspot.com",
  messagingSenderId: "931853943513",
  appId: "1:931853943513:web:59c8712da33256327574c8",
  measurementId: "G-GDGD09T73P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
// const analytics = getAnalytics(app);