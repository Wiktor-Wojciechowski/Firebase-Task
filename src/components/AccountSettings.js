import { deleteDoc } from 'firebase/firestore';
import React from 'react'

import { useRef } from 'react';

import { useAuth } from '../context/AuthContext'

import editIcon from '../images/edit_pen.svg'
import { doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AccountSettings() {
    const { currentUser, updateUsername, updatePhoto, removeUser } = useAuth();

    const usernameRef = useRef()

    function updateName() {
        try {
            updateUsername(usernameRef.current.value)
        } catch (err) {
            alert(err);
        }

    }

    return (
        <div className='account-settings-component' >
            <div className='avatar-container'><img className='avatar' src={currentUser.photoURL}></img><img className='edit-button' src={editIcon}></img></div>
            <div className='settings'>
                <article>
                    <label>Username:</label>
                    <span><input defaultValue={currentUser.displayName} ref={usernameRef} ></input><button onClick={updateName}>Save</button></span>
                </article>
                <article>
                    <label>Email:</label>
                    <span><input defaultValue={currentUser.email}></input><button>Save</button></span>
                </article>
                <article>
                    <label>Password:</label>
                    <span><input type="password" ></input><button>Save</button></span>
                </article>
                <button onClick={() => {
                    if (window.confirm('Are you sure?')) {
                        deleteDoc(doc(db, 'users', currentUser.uid)).then(
                            removeUser(currentUser.uid)
                        )
                    }
                }}>Delete Account</button>
            </div>
        </div >
    )
}
