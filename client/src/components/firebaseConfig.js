import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAQzF6eCkDzkwJgh7gH8nGtRJkVqeFzI8",
  authDomain: "prodmvp-6ca42.firebaseapp.com",
  projectId: "prodmvp-6ca42",
  storageBucket: "prodmvp-6ca42.firebasestorage.app",
  messagingSenderId: "460625366733",
  appId: "1:460625366733:web:5a03995ccfcc5c8dd26384",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
