
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDv8rFY8w4woS3E7IJvP3YM4FHuxpYbSXY",
  authDomain: "lecards-react.firebaseapp.com",
  projectId: "lecards-react",
  storageBucket: "lecards-react.appspot.com",
  messagingSenderId: "740007081095",
  appId: "1:740007081095:web:c50d720d7fd325d05e3422",
  measurementId: "G-246K7R4N9P",
  databaseURL: "https://nam5.firebaseio.com",
};

/**
 * Cambie "app" por "firebaseapp" al copiar desde la documentacion
 */
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);
export const auth = getAuth(firebaseapp);
// const database = getDatabase(firebaseapp);

export default firebaseapp;