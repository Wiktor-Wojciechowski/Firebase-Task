import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Sidebar(props) {
    const { currentUser, logout, updateLogState } = useAuth();

    return (
        <div>

            <div className='side-menu' style={{ width: props.width }}>
                <ul className='menu-list' >
                    <li className='menu-item'>
                        <NavLink to='/' replace={true}  >Home</NavLink>
                    </li>
                    <li className='menu-item'>
                        <NavLink to='/chat' replace={true}  >Chat</NavLink>
                    </li>
                    <li className='menu-item'>
                        <NavLink to='/map' replace={true} >Map</NavLink>
                    </li>
                    {currentUser &&
                        <li className='menu-item'>
                            <NavLink to='/users' replace={true} >Users</NavLink>
                        </li>
                    }
                    <li className='menu-item'>
                        <NavLink to='/about' replace={true} >About</NavLink>
                    </li>
                    <li className='menu-item'>
                        <NavLink to='/blog' replace={true} >Blog</NavLink>
                    </li>
                    <li className='menu-item'>
                        <NavLink to='/contact' replace={true} >Contact</NavLink>
                    </li>
                    {!currentUser &&
                        <li className='menu-item'>
                            <NavLink to='/register' replace={true} >Register</NavLink>
                        </li>
                    }
                    {!currentUser &&
                        <li className='menu-item'>
                            <NavLink to='/login' replace={true} >Log In</NavLink>
                        </li>
                    }
                    {currentUser &&
                        <li className='menu-item'>
                            <NavLink to='/account-settings' replace={true} >Account Settings</NavLink>
                        </li>
                    }
                    {currentUser &&
                        <li className='menu-item'>
                            <NavLink to='users/myprofile' replace={true} >My Profile</NavLink>
                        </li>
                    }
                    {currentUser &&
                        <div className='logout-button' onClick={async () => {
                            try {
                                await updateLogState(currentUser.uid, false).then(async () => {
                                    await updateDoc(doc(db, 'users', currentUser.uid), {
                                        latitude: null,
                                        longitude: null
                                    }).then(() => {
                                        logout()
                                    })

                                })
                            } catch (err) {
                                console.log(err);
                                logout();
                            }

                        }}>
                            <button>Log Out</button>
                        </div>
                    }

                </ul>
            </div>
        </div >
    )
}
