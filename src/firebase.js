import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9E1KnOTYs8b_XOUlqlTboJOJPnHfUNQw",
    authDomain: "whatsapp-4592b.firebaseapp.com",
    projectId: "whatsapp-4592b",
    storageBucket: "whatsapp-4592b.appspot.com",
    messagingSenderId: "931984179385",
    appId: "1:931984179385:web:68f043824899c030ea1b68",
    measurementId: "G-KHTZ5FCENH"
  };

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
