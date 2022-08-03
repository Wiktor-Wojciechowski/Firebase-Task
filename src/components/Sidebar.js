import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
    const [show, setShow] = useState(false);
    const [button, setButton] = useState('open')
    return (
        <div>
            <button onClick={() => {
                setShow(!show)
                if (button == 'open') {
                    setButton('close')
                } else {
                    setButton('open')
                }

            }} className="hamburger">
                <i >{button}</i>

            </button>
            {show ? <Menu /> : (null)}
        </div>
    )
}
function Menu() {

    return (
        <div className="sidebar">
            <ul >
                <li>
                    <NavLink to='/' replace={true} >Chat</NavLink>
                </li>
                <li>
                    <NavLink to='/register' replace={true} >Register</NavLink>
                </li>
                <li>
                    <NavLink to='/login' replace={true} >Login</NavLink>
                </li>
            </ul>
        </div>
    )
}