import React from 'react'
import { useState, useRef } from 'react'

import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'

export default function Register() {
    const { currentUser, signup } = useAuth();

    const [loading, setLoading] = useState(false)

    const emailRef = useRef();
    const passRef = useRef();

    const navi = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true)
            await signup(emailRef.current.value, passRef.current.value)
            navi('../');

        } catch (error) {
            console.log(error)

        }
        setLoading(false)
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
