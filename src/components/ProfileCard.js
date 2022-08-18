import React from 'react'
import { useEffect } from 'react'


import { useAuth } from '../context/AuthContext'

export default function ProfileCard(props) {

    const { users } = useAuth()

    console.log(props.show)


    var user = {}

    for (let q = 0; q < users.length; q++) {
        if (users[q].id == props.senderId) {
            user = users[q].data
        }
    }

    var dateJoined = new Date(user.creationTime);

    function showDate() {
        var dmy = dateJoined.toLocaleDateString();
        var hour = dateJoined.getHours().toString();
        var minutes = dateJoined.getMinutes().toString();
        var seconds = dateJoined.getSeconds().toString();

        return dmy.padStart(2, '0') + ':' + hour.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }

    function handleClick(e) {
        if (e.target.className != 'profile-card') {
            props.setShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick, true)
        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [])

    return (
        <div className='profile-card'>
            <span onClick={() => { props.setShow(false) }}>Click me to close</span>
            <img src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
            <span>{user.username}</span>
            <span>Joined: {showDate()}</span>
        </div>
    )
}

