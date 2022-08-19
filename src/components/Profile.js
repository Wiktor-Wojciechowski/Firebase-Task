import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


export default function Profile() {

    const { currentUser, users } = useAuth();

    const [loading, setLoading] = useState(true);

    var userIdObj = useParams();
    console.log(userIdObj)
    var userId = userIdObj.userId

    function findId(user) {
        return user.id == userId
    }

    var userCreationDate = 0;

    function showDate(dateJoined) {
        var dmy = dateJoined.toLocaleDateString();
        var hour = dateJoined.getHours().toString();
        var minutes = dateJoined.getMinutes().toString();
        var seconds = dateJoined.getSeconds().toString();

        return dmy.padStart(2, '0') + ':' + hour.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }

    var paramUser = 0;

    var cU;



    if (users.length > 0) {

        if (userId.toLowerCase() == "myprofile") {
            paramUser = users.find((user) => { return user.id == currentUser.uid })
            cU = true
        }

        console.log('a')
        if (!cU) {
            paramUser = users.find(findId)
            console.log(paramUser)
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
        userCreationDate = new Date(paramUser.data.creationTime);
        return (
            <div className='profile-component'>
                <div className='avatar-container'><img className='avatar' src={paramUser.data.photoURL} ></img></div>
                <section>
                    <div>{paramUser.data.username}</div>
                    <div>{paramUser.data.description}</div>
                    <div>Date Joined: {showDate(userCreationDate)}</div>
                </section>
            </div>
        )
    }

    return (

        <div className='profile-component'>



            <div>{JSON.stringify(userId)}</div>

            <div></div>
            <div>Username</div>
            <div>Description</div>
            <div>Date joined</div>
        </div>
    )

}
