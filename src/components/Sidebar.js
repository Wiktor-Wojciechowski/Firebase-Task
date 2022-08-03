import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
    const [width, setWidth] = useState('0px');

    return (
        <div>
            <button onClick={(e) => {
                e.persist();
                if (width == '0px') {
                    setWidth('250px')
                } else {
                    setWidth('0px')
                }
            }}>Toggle</button>
            <div className='sidebar' style={{ width: width }}>
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
        </div>
    )
}
function Menu() {

    return


}