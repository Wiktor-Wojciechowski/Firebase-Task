import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


export default function Profile() {

    const { users } = useAuth();

    var userIdObj = useParams();
    var userId = userIdObj.userId

    users.forEach((doc) => {
        console.log(doc.data.photoURL)
        if (doc.id == userId) {
            return (
                <div>
                    <img ></img>
                </div>
            )
        }


    })

    return (
        <div className='profile-component'>
            <div>{JSON.stringify(userId)}</div>
            {JSON.stringify(users)}
            <div>Avatar</div>
            <div>Username</div>
            <div>Description</div>
            <div>Date joined</div>
        </div>
    )
}
