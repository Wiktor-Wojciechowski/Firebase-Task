import React from 'react'

import { useAuth } from '../context/AuthContext'

export default function Chat() {
    const { logout } = useAuth();

    function handleClick() {
        logout();
    }

    return (
        <div>
            <h1>Chat</h1>
            <button onClick={handleClick} >Log Out</button>
        </div>
    )
}
