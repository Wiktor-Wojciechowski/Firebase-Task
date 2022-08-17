// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBi13Kd1nJSROVRsbuLacMDvDfMgx8BK84",

    authDomain: "task1-af204.firebaseapp.com",

    projectId: "task1-af204",

    storageBucket: "task1-af204.appspot.com",

    messagingSenderId: "901065334945",

    appId: "1:901065334945:web:a88d7c006d9198c3df10e0"

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app)

export const auth = getAuth();
export default app;