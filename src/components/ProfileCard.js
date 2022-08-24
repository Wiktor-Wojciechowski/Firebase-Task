import React from 'react'
import { useEffect } from 'react'
import { isCompositeComponentWithType } from 'react-dom/test-utils'


import { useAuth } from '../context/AuthContext'

export default function ProfileCard(props) {

    const { users } = useAuth()

    var user = {}

    for (let q = 0; q < users.length; q++) {
        if (users[q].id == props.senderId) {
            user = users[q].data
        }
    }

    if (Object.keys(user).length != 0) { console.log(user) }

    function showDate() {
        var dateJoined = new Date(user.creationTime);
        var dmy = dateJoined.toLocaleDateString();
        var hour = dateJoined.getHours().toString();
        var minutes = dateJoined.getMinutes().toString();
        var seconds = dateJoined.getSeconds().toString();

        return dmy.padStart(2, '0') + ' ' + hour.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }

    function handleClick(e) {
        if (e.target.className != 'profile-card' && e.target.className != 'avatar') {
            props.setShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick, true)
        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [])

    function onlineStatus() {
        return user.online ? 'Online' : 'Offline'
    }

    return (
        <div className='profile-card'>
            <img className='avatar' src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
            <h2>{user.username}</h2>
            <div><a href={`users/${user.userId}`} >Visit Profile</a></div>
            <span className={onlineStatus().toLowerCase()}>{onlineStatus()}</span>
            <span className='date-span'>Member Since: {showDate()}</span>
        </div>
    )
}

