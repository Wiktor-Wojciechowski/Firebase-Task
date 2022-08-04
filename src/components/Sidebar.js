import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import iconClose from '../images/close_black_24dp.svg'
import iconBurger from '../images/menu_black_24dp.svg'

export default function Sidebar() {
    const { currentUser } = useAuth();

    const [width, setWidth] = useState('0px');
    const [source, setSource] = useState(iconBurger)

    return (
        <div>
            <img id="burger-icon" src={source} onClick={(e) => {

                if (width == '0px') {
                    setWidth('80%')
                    setSource(iconClose)
                } else {
                    setWidth('0px')
                    setSource(iconBurger)
                }
            }} />
            <div className='side-menu' style={{ width: width }}>
                <ul >
                    <li>
                        <NavLink to='/' replace={true} >Chat</NavLink>
                    </li>
                    {!currentUser &&
                        <li>
                            <NavLink to='/register' replace={true} >Register</NavLink>
                        </li>
                    }
                    {!currentUser &&
                        <li>
                            <NavLink to='/login' replace={true} >Login</NavLink>
                        </li>
                    }

                </ul>
            </div>
        </div>
    )
}
function Menu() {

    return


}