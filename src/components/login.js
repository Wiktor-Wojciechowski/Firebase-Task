import React from 'react'

import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { currentUser } = useAuth();
    return (
        <div>
            <h1>Log In</h1>
            <form>
                <input type="email" />
                <input type="password" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
