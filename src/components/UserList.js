import React, { useEffect } from 'react'
import { useState } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';


export default function UserList() {
    const { users } = useAuth();

    function showStatus(bool) {
        return bool ? 'Online' : 'Offline';
    }

    return (
        <div className='userlist-component' >
            <table className='user-table' >
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Status</th>
                    </tr>
                    {users.map(user => (
                        <tr className='user-row' key={user.id}>
                            <td><a className='profile-link' href={`users/${user.id}`} >{user.data.username}</a></td>
                            <td><p className={user.data.loggedIn ? 'online' : 'offline'}>{showStatus(user.data.loggedIn)}</p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )

}
