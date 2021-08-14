import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECTID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECTID}-default-rtdb.europe-west1.firebasedatabase.app`,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: `${process.env.FIREBASE_PROJECTID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_SENDERID,
  appId: process.env.FIREBASE_APPID,
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
