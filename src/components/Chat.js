import React from 'react'

import { useAuth } from '../context/AuthContext'

export default function Chat() {

    return (
        <div>
            <h1>Chat</h1>
            <div className='chat-container'>
                <form>
                    <input></input>
                    <button>Send</button>
                </form>
            </div>

        </div>
    )
}
