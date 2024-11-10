// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import app from "firebase/app";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWxQpxk8O0IjGCAgOgG4ci1q9CyA98X8o",
  authDomain: "proyectointegrador-react-96cb4.firebaseapp.com",
  projectId: "proyectointegrador-react-96cb4",
  storageBucket: "proyectointegrador-react-96cb4.firebasestorage.app",
  messagingSenderId: "660323293958",
  appId: "1:660323293958:web:6267862276d09877ba5c87"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();