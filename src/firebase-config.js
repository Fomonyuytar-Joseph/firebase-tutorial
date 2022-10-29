import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBEdWw1BHUQjQc4WN7vbOpEihjJ2qS5OfM",
    authDomain: "fir-tutorial-d450e.firebaseapp.com",
    projectId: "fir-tutorial-d450e",
    storageBucket: "fir-tutorial-d450e.appspot.com",
    messagingSenderId: "882007136169",
    appId: "1:882007136169:web:3c9fc018ccc98ea40d56b8",
    measurementId: "G-YJ3YQMD4WR"
  };


  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app) 