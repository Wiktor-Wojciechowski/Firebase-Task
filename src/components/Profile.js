import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


export default function Profile() {

    const { currentUser, users } = useAuth();

    const [loading, setLoading] = useState(true);

    var userIdObj = useParams();

    var userId = userIdObj.userId

    function findId(user) {
        return user.id == userId
    }

    var userCreationDate = 0;

    function showDate(dateJoined) {
        var dateJoined = new Date(dateJoined)
        var dmy = dateJoined.toLocaleDateString();
        var hour = dateJoined.getHours().toString();
        var minutes = dateJoined.getMinutes().toString();
        var seconds = dateJoined.getSeconds().toString();

        return dmy.padStart(2, '0') + ' ' + hour.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }

    var paramUser = 0;

    var cU;



    if (users.length > 0) {

        if (userId.toLowerCase() == "myprofile") {
            paramUser = users.find((user) => { return user.id == currentUser.uid })
            cU = true
        }


        if (!cU) {
            paramUser = users.find(findId)

        }

    }

    if (paramUser == 0) {
        return (
            <div>Loading</div>
        )
    } else if (paramUser == undefined) {
        return (
            <div>User not found</div>
        )
    } else {
        userCreationDate = paramUser.data.creationTime;
        return (
            <div className='profile-component'>
                <div className='avatar-container'><img className='avatar' src={paramUser.data.photoURL} ></img></div>
                <section>
                    <h1 className='profile-username'>{paramUser.data.username}</h1>
                    <div className='text-section'>
                        <div className='profile-description'>{paramUser.data.description}</div>
                        <div className='profile-email'>{paramUser.data.email}</div>
                        <div className='date-span'>Member Since: {showDate(userCreationDate)}</div>
                        {paramUser.data.dateOfBirth && <div classname='dob-span'>Born: {showDate(paramUser.data.dateOfBirth)}</div>}
                    </div>
                </section>
            </div>
        )
    }
}
