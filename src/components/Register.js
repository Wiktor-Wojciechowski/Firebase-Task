import { updateProfile } from 'firebase/auth';
import React from 'react'
import { useState, useRef } from 'react'

import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'

export default function Register() {
    const { currentUser, signup, updatePhoto, updateUsername, addUser } = useAuth();

    const [loading, setLoading] = useState(false)

    const emailRef = useRef();
    const passRef = useRef();
    const usernameRef = useRef();

    const navi = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const username = usernameRef.current.value
        try {
            setLoading(true)
            await signup(emailRef.current.value, passRef.current.value).then(async (userCredential) => {
                await addUser((userCredential.user.uid)).then(() => {
                    updateUsername(username).then(() => {
                        updatePhoto('https://cdn-icons-png.flaticon.com/512/149/149071.png').then(() => {
                            setLoading(false)
                            navi('../');
                        })
                    })
                })
            })






        } catch (error) {
            console.log(error)
            setLoading(false)

        }

    }

    return (
        currentUser ? <Navigate to='/' replace={true} /> :
            <div className='register-component'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <article>
                        <label htmlFor="username-input">Username:</label>
                        <input id="username-input" ref={usernameRef} required />
                    </article>
                    <article>
                        <label htmlFor="email-input">Email:</label>
                        <input id="email-input" type="email" ref={emailRef} required />
                    </article>
                    <article>
                        <label htmlFor="password-input">Password:</label>
                        <input id="password-input" type="password" ref={passRef} required />
                    </article>
                    <input disabled={loading} type="submit" value="Submit" />
                </form>
            </div>
    )
}
