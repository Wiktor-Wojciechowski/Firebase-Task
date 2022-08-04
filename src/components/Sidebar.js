import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import iconClose from '../images/close_black_24dp.svg'
import iconBurger from '../images/menu_black_24dp.svg'

export default function Sidebar() {
    const { currentUser, logout } = useAuth();

    const [width, setWidth] = useState('0px');
    const [source, setSource] = useState(iconBurger)

    const menuOpen = () => {
        setWidth('80%')
        setSource(iconClose)
    }
    const menuClose = () => {
        setWidth('0px')
        setSource(iconBurger)
    }

    useEffect(() => {
        //const sidebar = document.querySelector('.side-menu')
        document.addEventListener('click', (e) => {
            if (e.target.id != 'burger-icon'
                && e.target.className != 'side-menu'
                && e.target.className != 'menu-item'
                && e.target.className != 'menu-list') {
                menuClose()
            }
            console.log(e.target.tagName)
        })

    }, [])

    return (
        <div>
            <img id="burger-icon" src={source} onClick={(e) => {

                if (width == '0px') {
                    menuOpen()
                } else {
                    menuClose()
                }
            }} />
            <div className='side-menu' style={{ width: width }}>
                <ul className='menu-list' >
                    <li className='menu-item'>
                        <NavLink to='/' replace={true} >Chat</NavLink>
                    </li>
                    <li className='menu-item'>
                        <NavLink to='/about' replace={true} >About</NavLink>
                    </li>
                    {!currentUser &&
                        <li className='menu-item'>
                            <NavLink to='/register' replace={true} >Register</NavLink>
                        </li>
                    }
                    {!currentUser &&
                        <li className='menu-item'>
                            <NavLink to='/login' replace={true} >Login</NavLink>
                        </li>
                    }
                    {currentUser &&
                        <div onClick={() => { logout() }}>
                            <button>Log Out</button>
                        </div>
                    }

                </ul>
            </div>
        </div >
    )
}
function Menu() {

    return


}