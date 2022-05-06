import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAa4-AEB5fH7nTymzP9nTjAGHceRd3rG8I",
  authDomain: "fir-auth-2efb3.firebaseapp.com",
  databaseURL:
    "https://fir-auth-2efb3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-auth-2efb3",
  storageBucket: "fir-auth-2efb3.appspot.com",
  messagingSenderId: "1082071408396",
  appId: "1:1082071408396:web:6f0b37b639e6ab78f73329",
  measurementId: "G-9GNYV8WY7S",
});

export default firebaseConfig;
