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
import { onSnapshot, updateDoc, addDoc, collection, setDoc, doc, deleteDoc, query, orderBy, limitToLast } from 'firebase/firestore'
import { useDebugValue } from 'react'

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

    const [users, setUsers] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))

        })
        return () => {
            unsubscribe();
        }
    }, [])

    const [messages, setMessages] = useState([])

    const dbRef = collection(db, 'messages');

    const q = query(dbRef, orderBy('time', "asc"), limitToLast(25));

    var prevSnap = null;

    useEffect(() => {
        const unsubscribe = onSnapshot(q, snapshot => {

            if (snapshot != prevSnap && prevSnap) {
                console.log('new msg')

                Notification.requestPermission().then((result) => {
                    console.log(result);

                    var text = snapshot.docs[snapshot.docs.length - 1].data();

                    if (text.time) {
                        const notif = new Notification('New Message', {
                            body: text.text,

                        })
                    }



                })
            }
            prevSnap = snapshot;

            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
            )

        })

        console.log('loaded')
        return () => {
            unsubscribe()
        }
    }, [])

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

        users,
        messages
    }

    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
