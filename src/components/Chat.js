import React, { useEffect } from 'react'
import { useState, useRef } from 'react'

import { useAuth } from '../context/AuthContext'

import { db } from '../firebase'
import { addDoc, collection, onSnapshot, orderBy, query, limit, serverTimestamp, limitToLast } from 'firebase/firestore'

import { auth } from '../firebase'
import UserList from './UserList'

import ProfileCard from './ProfileCard'
import { ref } from 'firebase/storage'

export default function Chat() {

    const { currentUser, messages } = useAuth();

    const [text, setText] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault()

        if (text.length > 0 && text.length <= 500) {

            let timeSent = serverTimestamp();

            addDoc(collection(db, 'messages'), {
                text: text,
                time: timeSent,
                uid: currentUser.uid,
                username: currentUser.displayName,
                photoURL: currentUser.photoURL,
            })
            setText('')
        }
    }





    useEffect(() => {

        var s = document.querySelector('.scroll-onto')

        s.scrollIntoView()

    }, [messages])
    /*
        function handleClick(e) {
            console.log(e.target.className)
            if (e.target.className == 'profile-card') {
                alert('dd')
            }
    
    
        }

    useEffect(() => {
        document.addEventListener('click', handleClick)
    }, [])
*/
    return (
        <div className='chat-component'>
            <div className='message-box'>

                {messages.map(msg => (

                    <ChatMessage key={msg.id}
                        senderId={msg.data.uid}
                        username={msg.data.username}
                        date={msg.data.time}
                        picture={msg.data.photoURL}
                        text={msg.data.text} />
                ))}
                <span className='scroll-onto' />
            </div>

            <div className='send-message-form'>
                <form onSubmit={sendMessage} >
                    <input className='message-input' value={text} onChange={(e) => { setText(e.target.value) }} maxLength={500} />
                    <div className='counter' >{text.length}/500</div>
                    <button className='send-message-button' >Send</button>

                </form>
            </div>
            {/* <div className='users-icon' >
                <UserList />
            </div> */}
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

    const [show, setShow] = useState(false)


    return (
        <div className={'message' + ' ' + messageSender}>
            <span className='left-side'>
                <span className='time-span'>{toDate(props.date)}</span>
                <img onClick={() => { setShow(!show) }} className='user-chat-icon' src={props.picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} ></img>
                {show && <ProfileCard show={show} setShow={setShow} senderId={props.senderId} />}
                <span className='username' >{props.username}</span>
            </span>
            <p className='message-content'>{props.text}</p>

        </div>
    )
}
