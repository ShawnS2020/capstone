import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, getDoc, getDocs, setDoc, doc, collection, onSnapshot, query, } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAm9KaaMat6HBexAODjYbNh5j8aafQGKY",
    authDomain: "csi4999-hobby.firebaseapp.com",
    projectId: "csi4999-hobby",
    storageBucket: "csi4999-hobby.appspot.com",
    messagingSenderId: "24190893165",
    appId: "1:24190893165:web:88c807d60aa577ec3f5364",
    measurementId: "G-CMVNSVMHC1"
  };

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export { addDoc, getDoc, getDocs, setDoc, doc, collection, onSnapshot, query, getAuth, 
          createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator }