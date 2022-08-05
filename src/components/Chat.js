import React, { useEffect } from 'react'
import { useState } from 'react'

import { useAuth } from '../context/AuthContext'

import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Chat() {
    const { currentUser } = useAuth();

    const [message, setMessage] = useState('')

    const messagesRef = collection(db, 'messages')

    //get data
    const getData = async () => {
        onSnapshot(messagesRef, (snapshot) => {
            let items = []
            snapshot.docs.forEach((doc) => {
                items.push({ ...doc.data(), id: doc.id })
            })
            console.log(items)
        })
    }

    useEffect(() => {
        getData();
    })

    return (
        <div>{message}</div>
    )
}
