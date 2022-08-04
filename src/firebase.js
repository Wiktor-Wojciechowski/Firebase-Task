// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBIAw-vTA05L4qErMBiAhvbwI5RLzIm5k8",

    authDomain: "task-aaa65.firebaseapp.com",

    projectId: "task-aaa65",

    storageBucket: "task-aaa65.appspot.com",

    messagingSenderId: "1072364639649",

    appId: "1:1072364639649:web:2bd3cbabc0a43f6004e7e0"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
export default app;