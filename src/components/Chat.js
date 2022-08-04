import React, { useState } from 'react'

import { useAuth } from '../context/AuthContext'

import { db } from '../firebase'
import { getDocs, addDoc, collection } from 'firebase/firestore'

export default function Chat() {
    const [text, setText] = useState('')

    async function sendMessage(msg) {
        try {
            var date = new Date();
            const docRef = await addDoc(collection(db, "messages"), {
                text: msg,
                time: date
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        sendMessage(text);
    }

    return (
        <div>
            <h1>Chat</h1>
            <div className='chat-container'>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => { setText(e.target.value) }}></input>
                    <button>Send</button>
                </form>
            </div>

        </div>
    )
}
