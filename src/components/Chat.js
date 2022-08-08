import React, { useEffect } from 'react'
import { useState } from 'react'

import { useAuth } from '../context/AuthContext'

import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { deepCopy } from '@firebase/util'

export default function Chat() {
    const { currentUser } = useAuth();

    const [messages, setMessages] = useState()

    //get data


    const sendMessage = () => {

    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'messages'), snapshot => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <div>
            {messages.map(msg => (
                <div key={msg.id}>{msg.id}, {msg.data.text}</div>
            ))}
            <form >
                <input />
                <button>Send</button>
            </form>
        </div>
    )
}
