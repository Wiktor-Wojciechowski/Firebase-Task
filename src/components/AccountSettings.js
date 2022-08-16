import { deleteDoc } from 'firebase/firestore';
import React from 'react'

import { useRef, useState } from 'react';

import { useAuth } from '../context/AuthContext'

import editIcon from '../images/edit_pen.svg'
import { doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function AccountSettings() {
    const { currentUser, updateUsername, updatePhoto, removeUser } = useAuth();

    const usernameRef = useRef();

    var avatar = null;

    const [photo, setPhoto] = useState(currentUser.photoURL)

    function updateName() {
        try {
            updateUsername(usernameRef.current.value)
        } catch (err) {
            alert(err);
        }

    }

    function uploadImage() {
        if (avatar) {
            const avatarRef = ref(storage, `users/${currentUser.uid}/user-avatar`);

            uploadBytes(avatarRef, avatar).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    updatePhoto(url)
                    console.log(url)
                    setPhoto(url)
                    document.getElementById('upload-avatar').value = null
                })
            })
        }

    }

    return (
        <div className='account-settings-component' >
            <div className='avatar-container'>

                <img className='avatar' src={photo}></img>

                <label htmlFor='upload-avatar'>Change Avatar:</label>
                <input type="file" id="upload-avatar" onChange={(event) => { avatar = event.target.files[0]; console.log(avatar); uploadImage() }}></input>


            </div>
            <div className='settings'>
                <article>
                    <label>Username:</label>
                    <span><input defaultValue={currentUser.displayName} ref={usernameRef} ></input><button onClick={updateName}>Save</button></span>
                </article>
                <article>
                    <label>Email:</label>
                    <span><input defaultValue={currentUser.email}></input><button>Save</button></span>
                </article>
                <div className='settings-buttons'>
                    <button>Reset Password</button>
                    <button className='delete-account-button' onClick={() => {
                        if (window.confirm('Are you sure you want to delete your account?')) {
                            deleteDoc(doc(db, 'users', currentUser.uid)).then(
                                removeUser(currentUser.uid)
                            )
                        }
                    }}>Delete Account</button>
                </div>
            </div>
        </div >
    )
}
