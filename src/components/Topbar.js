import React from 'react'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

import iconClose from '../images/close_black_24dp.svg'
import iconBurger from '../images/menu_black_24dp.svg'

import Sidebar from './Sidebar';

export default function Topbar() {
    const [width, setWidth] = useState('0px');
    const [source, setSource] = useState(iconBurger)
    const { currentUser } = useAuth()

    const menuOpen = () => {
        setWidth('400px')
        setSource(iconClose)

        document.addEventListener('click', listen, true)//capture flag (true) is required

    }
    const menuClose = () => {
        setWidth('0px')
        setSource(iconBurger)

        document.removeEventListener('click', listen, true)
    }

    const listen = (e) => {
        if (e.target.id != 'burger-icon'
            && e.target.className != 'side-menu'
            && e.target.className != 'menu-item'
            && e.target.className != 'menu-list') {
            menuClose()
        }

    }

    return (
        <div id="topbar-component">
            <img id="burger-icon" src={source} onClick={(e) => {

                if (width == '0px') {
                    menuOpen()
                } else {
                    menuClose()
                }
            }} />
            {currentUser && <Link to="/users/myprofile" replace={true}><img className='mini-avatar' title="My Profile" alt="topbar profile icon" src={currentUser.photoURL}></img></Link>}
            <Sidebar width={width} />
        </div>
    )
}
