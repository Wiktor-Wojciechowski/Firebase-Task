import React, { useEffect } from 'react'
import { useState } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';


export default function UserList() {
    const { users } = useAuth();

    /*
        useEffect(() => {
            const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
                setUsers(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return () => {
                unsubscribe();
            }
        }, [])
    */
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
                        <tr key={user.id}><td>{user.data.username}</td><td><p className={user.data.loggedIn ? 'online' : 'offline'}>{showStatus(user.data.loggedIn)}</p></td></tr>

                    ))}
                </tbody>
            </table>
        </div>
    )

}
