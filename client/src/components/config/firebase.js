import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzHdOssi7AosEdhdVSaeQLa0zydWWWAxg",
  authDomain: "masterscrum-9b5b2.firebaseapp.com",
  projectId: "masterscrum-9b5b2",
  storageBucket: "masterscrum-9b5b2.appspot.com",
  messagingSenderId: "706939880526",
  appId: "1:706939880526:web:9f3c5b9b576a8190ca2f1f",
  measurementId: "G-HLJPQS5YR6",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };