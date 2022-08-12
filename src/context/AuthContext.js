import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

import { auth } from '../firebase'
import {
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth'

import { db } from '../firebase'
import { updateDoc, addDoc, collection, setDoc, doc, deleteDoc } from 'firebase/firestore'

const AuthContext = createContext();

//export context
export function useAuth() {
    return useContext(AuthContext);
}

//export element
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    if (auth.currentUser) {

        navigator.geolocation.watchPosition((pos) => {

            //upload your location and then display everyone's marks from db

            updateDoc(doc(db, 'users', currentUser.uid), {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            })


        }, (error) => {
            if (error.code == error.PERMISSION_DENIED) {
                updateDoc(doc(db, 'users', currentUser.uid), {
                    latitude: null,
                    longitude: null
                })


            }
        })
    }


    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }
    function updatePhoto(picUrl) {
        return updateProfile(auth.currentUser, { photoURL: picUrl })
    }
    function updateUsername(username) {
        return updateProfile(auth.currentUser, { displayName: username }).then(() => {
            updateDoc(doc(db, 'users', auth.currentUser.uid), {
                username: auth.currentUser.displayName
            })
        })
    }
    function addUser(uid) {
        return setDoc(doc(db, 'users', uid), {
            userId: uid,
            loggedIn: true
        })
    }
    function removeUser(uid) {
        return signOut(auth).then(() => {
            deleteDoc(doc(db, 'users', uid)).then(() => {
                deleteUser(currentUser)
            })
        })
    }
    function updateLogState(uid, bool) {
        return updateDoc(doc(db, 'users', uid), {
            loggedIn: bool
        })
    }

    useEffect(() => {
        const uns = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return uns
    })

    const values = {
        currentUser,
        login,
        logout,
        signup,
        updatePhoto,
        updateUsername,
        addUser,
        removeUser,
        updateLogState,
    }

    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
