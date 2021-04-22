import firebase from 'firebase'

const firebaseapp = firebase.initializeApp( {
    apiKey: "AIzaSyDBY4XX5BSoc2XU8J15wpV6PZju6CGDN3w",
    authDomain: "calcium-firefly-296017.firebaseapp.com",
    projectId: "calcium-firefly-296017",
    storageBucket: "calcium-firefly-296017.appspot.com",
    messagingSenderId: "646783129169",
    appId: "1:646783129169:web:86ce4829c5c5db9d944a70",
    measurementId: "G-ENQLLZ7NBN"
  });

  const db = firebaseapp.firestore();
  export default db;