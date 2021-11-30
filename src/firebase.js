import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe2Vv5_zNY_bAZB7EtwmiFnXIpreueMOo",
  authDomain: "fir-wallet-acc0e.firebaseapp.com",
  projectId: "fir-wallet-acc0e",
  storageBucket: "fir-wallet-acc0e.appspot.com",
  messagingSenderId: "317939471205",
  appId: "1:317939471205:web:efe8a5990f0530b8e8078c",
  measurementId: "G-359K9Z78W7",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
