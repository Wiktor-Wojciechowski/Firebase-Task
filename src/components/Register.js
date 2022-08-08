import React from 'react'
import { useState, useRef } from 'react'

import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'

export default function Register() {
    const { currentUser, signup, updatePhoto } = useAuth();

    const [loading, setLoading] = useState(false)

    const emailRef = useRef();
    const passRef = useRef();

    const navi = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true)
            await signup(emailRef.current.value, passRef.current.value)

            updatePhoto('https://cdn-icons-png.flaticon.com/512/149/149071.png')
            setLoading(false)
            navi('../');

        } catch (error) {
            console.log(error)

        }

    }

    return (
        currentUser ? <Navigate to='/' replace={true} /> :
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" ref={emailRef} />
                    <input type="password" ref={passRef} />
                    <input disabled={loading} type="submit" value="Submit" />
                </form>
            </div>
    )
}
