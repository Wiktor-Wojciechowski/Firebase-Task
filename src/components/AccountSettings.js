
import React from 'react'

import { useRef, useState, useEffect } from 'react';

import { useAuth } from '../context/AuthContext'

import editIcon from '../images/edit_pen.svg'

import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth } from '../firebase';
import { sendPasswordResetEmail, updateEmail } from 'firebase/auth';



export default function AccountSettings() {
    useEffect(() => {
        document.title = 'Account Settings'
    }, [])
    const { currentUser, updateUsername, updatePhoto, removeUser } = useAuth();

    const usernameRef = useRef();

    var avatar = null;

    const [photo, setPhoto] = useState(currentUser.photoURL)
    const [username, setUsername] = useState(currentUser.displayName)
    const [email, setEmail] = useState(currentUser.email)
    const [show, setShow] = useState(false)


    function updateName() {
        try {
            updateUsername(usernameRef.current.value)
            alert("Username Updated")
        } catch (err) {
            alert(err);
        }

    }

    async function changeEmail() {

        try {
            await updateEmail(currentUser, email).then(() => {
                alert("Email updated");
                window.location.reload();
            })

        } catch (error) {
            console.log(error)
            if (error.code == 'auth/requires-recent-login') {

                alert('Please re-login')
            }
        }
    }


    function uploadImage() {
        if (avatar) {
            const avatarRef = ref(storage, `users/${currentUser.uid}/user-avatar`);

            uploadBytes(avatarRef, avatar).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    updatePhoto(url)

                    setPhoto(url)
                    document.getElementById('upload-avatar').value = null
                })
            })
        }

    }

    function resetPassword() {
        sendPasswordResetEmail(auth, currentUser.email).then(() => {
            setShow(true)
        }).catch((error) => {
            alert(error.code)
        })
    }

    var display = false;
    var display1 = false;




    if (username != currentUser.displayName && username.length > 0) {
        display = true
    }
    if (email != currentUser.email && email.length > 0) {
        display1 = true
    }
    return (
        <div className='account-settings-component' >
            <div className='account-settings-wrapper' >
                <div className='avatar-container'>

                    <img className='avatar' src={photo}></img>

                    <label htmlFor='upload-avatar'>Change Avatar:</label>
                    <input type="file" id="upload-avatar" onChange={(event) => { avatar = event.target.files[0]; uploadImage() }}></input>


                </div>
                <div className='settings'>
                    <article>
                        <label>Username:</label>
                        <span><input onChange={(e) => { setUsername(e.target.value) }} defaultValue={currentUser.displayName} ref={usernameRef} ></input>
                            <button disabled={!display} title='Save Changes' className='edit-button' onClick={() => { updateName() }}><img className="edit-icon" src={editIcon}></img></button> </span>
                    </article>
                    <article>
                        <label>Email:</label>
                        <span><input type='email' onChange={(e) => { setEmail(e.target.value) }} defaultValue={currentUser.email}></input>
                            <button onClick={() => { changeEmail() }} disabled={!display1} title='Save Changes' className='edit-button'><img className="edit-icon" src={editIcon}></img></button> </span>
                    </article>
                    {/* <article>
                        <label>Date of Birth:</label>
                        <span><input type="date"></input>
                            <button className='edit-button' ><img className='edit-icon' src={editIcon} ></img></button></span>
                    </article> */}
                    <div className='settings-buttons'>
                        <button onClick={() => { resetPassword() }}>Reset Password</button>

                        {show && <p className='action-done'>Password Reset Email Sent <div className='close' onClick={() => { setShow(false) }}>X</div></p>}

                        <button className='delete-account-button' onClick={() => {
                            if (window.confirm('Are you sure you want to delete your account?')) {
                                try {

                                    removeUser(currentUser.uid)

                                }
                                catch (error) {
                                    alert(error.code)
                                }
                            }
                        }}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
