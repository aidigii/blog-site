import * as firebase from 'firebase/app';


import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBrpkmDkE8A95k2q2wkMnk2RZkz4qxFHt0",
  authDomain: "blog-site-dacd9.firebaseapp.com",
  databaseURL: "https://blog-site-dacd9.firebaseio.com",
  projectId: "blog-site-dacd9",
  storageBucket: "blog-site-dacd9.appspot.com",
  messagingSenderId: "699560002310",
  appId: "1:699560002310:web:3a458cec6f87ce97f41487"
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

const auth = firebase.auth();

export { db, auth}; 