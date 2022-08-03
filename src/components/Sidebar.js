import React from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
    return (
        <div>
            <ul>
                <li>
                    <NavLink />
                </li>
                <li>
                    <NavLink />
                </li>
                <li>
                    <NavLink />
                </li>
            </ul>
        </div>
    )
}
