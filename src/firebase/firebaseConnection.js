import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC0CYN4VSbJYPL5sR9X0dmbTk-YM9JEVzw",
    authDomain: "blue-bank-9f584.firebaseapp.com",
    projectId: "blue-bank-9f584",
    storageBucket: "blue-bank-9f584.appspot.com",
    messagingSenderId: "243912951397",
    appId: "1:243912951397:web:822c28421fad44f82aa88c",
    measurementId: "G-404G6RKG14"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;