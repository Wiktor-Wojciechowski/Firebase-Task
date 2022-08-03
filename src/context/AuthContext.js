import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

import { auth } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

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
        return createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return signOut(auth)
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
    }

    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
