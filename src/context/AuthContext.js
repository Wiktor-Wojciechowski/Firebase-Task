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

const AuthContext = createContext();

//export context
export function useAuth() {
    return useContext(AuthContext);
}

//export element
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)





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
        return updateProfile(auth.currentUser, { photoURL: picUrl }).then(() => {
            updateDoc(doc(db, 'users', auth.currentUser.uid), {
                photoURL: auth.currentUser.photoURL
            })
        })
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
            photoURL: auth.currentUser.photoURL,
            creationTime: auth.currentUser.metadata.creationTime,
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

            if (snapshot != prevSnap && prevSnap && !document.hasFocus() && auth.currentUser) {
                console.log('new msg')

                Notification.requestPermission().then((result) => {
                    console.log(result);

                    var text = snapshot.docs[snapshot.docs.length - 1].data();

                    if (text.time) {
                        const notif = new Notification(text.username + " says:", {
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
