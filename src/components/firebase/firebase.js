import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDNe7waCJsxaVU9nsvdgfdnxfPs_Bb-yIg",
    authDomain: "enprotour.firebaseapp.com",
    databaseURL: "https://enprotour.firebaseio.com",
    projectId: "enprotour",
    storageBucket: "enprotour.appspot.com",
    messagingSenderId: "649496441287",
    appId: "1:649496441287:web:12587b00730691c8c069e2",
    measurementId: "G-L1L6CSL3FJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;