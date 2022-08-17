import { addDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'
import { db } from '../firebase';
import { collection } from 'firebase/firestore';

export default function Login() {
    const { currentUser, login, updateLogState } = useAuth();
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const navi = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true)
            await login(email, password).then(async (userCredential) => {
                await updateLogState(userCredential.user.uid, true)
                navi('../');
            })



        } catch (error) {
            console.log((error.code))
            if (error.code.includes('auth/user-not-found')) {
                setError('User does not exist')
            }
            if (error.code.includes('auth/wrong-password')) {
                setError('Wrong Password')
            }
            setLoading(false)
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
                        <input required id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </article>
                    <article>
                        <label htmlFor="password">Password:</label>
                        <input required type="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </article>
                    <span className='error' >{error}</span>
                    <input disabled={loading} type="submit" value="Submit" />
                </form>
            </div>
    )
}
