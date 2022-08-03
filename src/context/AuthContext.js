import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

import { auth } from '../firebase'

const authContext = createContext();
//export context
export function useAuth() {
    return useContext(authContext);
}

//export elemet
export default function AuthContext({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        unsubscribe = auth.onAutchStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    const value = {
        currentUser,
    }

    return (
        <AuthContext.Provider>
            {!loading && children}
        </AuthContext.Provider>
    )
}
