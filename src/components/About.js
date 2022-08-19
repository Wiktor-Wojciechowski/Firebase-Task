import React from 'react'

import reactLogo from '../images/react_icon.png'
import firebaseLogo from '../images/firebase_logo.png'

export default function About() {
    return (
        <div className='about-component'>

            <h1>About</h1>

            <div>
                <h2>Project created with:</h2>
                <h3>React</h3>

                <a href='https://reactjs.org/' target='_blank'><img className='react-logo' src={reactLogo}></img></a>

                <h3>Firebase</h3>

                <a href="https://firebase.google.com" target='_blank'><img className='firebase-logo' src={firebaseLogo}></img></a>

            </div>
        </div>
    )
}
