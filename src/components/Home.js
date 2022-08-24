import React from 'react'
import { useEffect } from 'react'

export default function Home() {
    useEffect(() => {
        document.title = 'Home Page'
    }, [])
    return (
        <div className='home-component'>
            <h1>Welcome to the website</h1>
            <h2>Feel free to use the sidebar to navigate</h2>
        </div>
    )
}
