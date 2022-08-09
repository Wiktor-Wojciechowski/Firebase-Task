import React, { useEffect } from 'react'
import { useState, useRef } from 'react'

import { useAuth } from '../context/AuthContext'

import { db } from '../firebase'
import { addDoc, collection, onSnapshot, orderBy, query, limit, serverTimestamp, limitToLast } from 'firebase/firestore'


export default function Chat() {
    const { currentUser } = useAuth();

    const [messages, setMessages] = useState([])


    const [text, setText] = useState('')

    const scrollOnTo = document.querySelector('.scroll-onto');

    const dbRef = collection(db, 'messages');
    const q = query(dbRef, orderBy('time', "asc"), limitToLast(25));
    //get data


    const sendMessage = async (e) => {
        e.preventDefault()
        let timeSent = serverTimestamp();

        addDoc(dbRef, {
            text: text,
            time: timeSent,
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
        })
        setText('')
        scrollOnTo.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        })
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
            )

        })



        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <div className='chat-component'>
            <div className='message-box'>
                {/* {messages.map(msg => (
                <div key={msg.id}>{



                    msg.data.time ? toDate(msg.data.time) : 'sending'}, {msg.data.text
                    }</div>
            ))} */}

                {messages.map(msg => (

                    <ChatMessage key={msg.id}
                        senderId={msg.data.uid}
                        date={msg.data.time}
                        picture={msg.data.photoURL}
                        text={msg.data.text} />
                ))}
                <span className='scroll-onto' />
            </div>

            <div className='send-message-form'>
                <form onSubmit={sendMessage} >
                    <input className='message-input' value={text} onChange={(e) => { setText(e.target.value) }} />
                    <button className='send-message-button' >Send</button>

                </form>
            </div>
        </div>
    )
}

function ChatMessage(props) {
    const { currentUser } = useAuth();
    var messageSender = '';
    if (props.senderId == currentUser.uid) {
        messageSender = 'owner'
    } else {
        messageSender = 'foreign'
    }

    function toDate(t) {
        var a = new Date(t * 1000);
        var hours = a.getHours().toString()

        var minutes = a.getMinutes().toString()

        return hours.padStart(2, '0') + ':' + minutes.padStart(2, '0');
    }

    return (
        <div className={'message' + ' ' + messageSender}>

            <span className='time-span'>{toDate(props.date)}</span>
            <img className='user-chat-icon' src={props.picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} ></img>
            <p className='message-content'>{props.text}</p>

        </div>
    )
}