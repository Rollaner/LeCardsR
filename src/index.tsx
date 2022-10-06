import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

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
const auth = getAuth(firebaseapp);
const database = getDatabase(firebaseapp);


//iniciar aplicación 
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);