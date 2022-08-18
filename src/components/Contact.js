import React from 'react'

import emailIcon from '../images/email-icon.svg'
import phoneIcon from '../images/phone-outline-icon.svg'
import markerIcon from '../images/map-pin-point-icon.svg'

export default function Contact() {
    return (
        <div className='contact-component'>
            <h1>Contact us:</h1>
            <address>
                <ul>
                    <li><a href="tel:+123456789"><img src={phoneIcon} className='icon' alt='phone icon'></img><span>Phone number: 123 456 789</span></a></li>
                    <li><a href="mailto:email@email.com"><img src={emailIcon} className='icon' alt='email icon'></img><span>Email: email@email.com</span></a></li>
                    <li><img src={markerIcon} className='icon' alt='marker icon'></img><span>Country, City, Street, Number</span></li>
                </ul>
            </address>
        </div>
    )
}
