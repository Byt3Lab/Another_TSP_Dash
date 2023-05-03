// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "transport-service-plus.firebaseapp.com",
  projectId: "transport-service-plus",
  storageBucket: "transport-service-plus.appspot.com",
  messagingSenderId: "929704715460",
  appId: process.env.REACT_APP_appId,
  measurementId: "G-RNP28P9VVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);