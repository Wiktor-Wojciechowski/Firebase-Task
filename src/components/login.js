import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { currentUser, login } = useAuth();
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navi = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true)
            await login(email, password)
            navi('../');

        } catch (error) {
            console.log(error)

        }
        setLoading(false)
    }

    return (
        //if user logged in redirect to home
        currentUser ? <Navigate to='/' /> :
            <div id="login-component">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <article>
                        <label htmlFor="email">Email:</label>
                        <input id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </article>
                    <article>
                        <label htmlFor="password">Password:</label>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </article>
                    <input disabled={loading} type="submit" value="Submit" />
                </form>
            </div>
    )
}
