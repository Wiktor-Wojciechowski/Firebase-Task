import React, { useEffect } from 'react'
import { useState } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function UserList() {
    const { users, logStates } = useAuth();

    function showStatus(bool) {
        return bool ? 'Online' : 'Offline';
    }
    if (users.length > 0 && logStates) {
        const p = users[2].data.userId
        console.log(p)
        console.log(logStates[p].online)
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
                            <td><Link className='profile-link' to={`${user.id}`} replace={true}>{user.data.username}</Link></td>
                            <td><p className={user.data.online ? 'online' : 'offline'}>{showStatus(user.data.online)}</p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )

}
