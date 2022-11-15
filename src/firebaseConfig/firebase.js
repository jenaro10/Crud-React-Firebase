
import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC4yD_kzazlraGWgMIq15WdZngwYKAigm8",
  authDomain: "crud-react-firebase-85da2.firebaseapp.com",
  projectId: "crud-react-firebase-85da2",
  storageBucket: "crud-react-firebase-85da2.appspot.com",
  messagingSenderId: "728458046908",
  appId: "1:728458046908:web:bede10be1069eb66944fb9"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)