import React from 'react'

import { useRef } from 'react';

import { useAuth } from '../context/AuthContext'

import editIcon from '../images/edit_pen.svg'

export default function AccountSettings() {
    const { currentUser, updateUsername, updatePhoto } = useAuth();

    const usernameRef = useRef()

    function updateName() {
        updateUsername(usernameRef.current.value)
    }

    return (
        <div className='account-settings-component' >
            <div className='avatar-container'><img className='avatar' src={currentUser.photoURL}></img><img className='edit-button' src={editIcon}></img></div>
            <div className='settings-form'>
                <article>
                    <label htmlFor='username-change'>Change Username</label>
                    <input ref={usernameRef} defaultValue={currentUser.displayName} id="username-change"></input><button onClick={updateName} ><img src={editIcon}></img></button>

                </article>
                <article>
                    <label htmlFor='username-change'>Change Email</label>
                    <input defaultValue={currentUser.email} id="email-change"></input><button><img src={editIcon}></img></button>

                </article>
                <article>
                    <label htmlFor='username-change'>Change Password</label>
                    <input id="password-change"></input><button><img src={editIcon}></img></button>

                </article>
            </div>
        </div>
    )
}
