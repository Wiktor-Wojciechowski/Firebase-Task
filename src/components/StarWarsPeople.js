import React from 'react'
import { useState, useEffect } from 'react'

export default function StarWarsPeople() {

    fetch('https://swapi.dev/api/people/1').then(r => console.log(r))


    useEffect(() => {
        document.title = 'People of Star Wars'
    }, [])

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState()

    useEffect(() => {
        fetchPage('https://swapi.dev/api/people')
    }, [])

    function fetchPage(url) {
        setLoading(true)
        fetch(url).then(data => {
            console.log(data); data.json().then((p => {

                setPage(p)
                setLoading(false);
                console.log(page)
            }))
        })
    }

    if (page && !loading) {
        return (
            <div className='starwarspeople-component'>
                <div className='person-list'>{page.results.map(person => (

                    <Person key={person.url}
                        person={person}
                    />



                ))}
                </div>
                <div className='buttons'>
                    <div className='previous-button'><span onClick={() => {
                        if (page.previous) {
                            fetchPage(page.previous)
                        }
                    }}>Previous Page</span></div>

                    <div className='next-button' ><span onClick={() => {
                        if (page.next) {
                            fetchPage(page.next)
                        }

                    }}>Next Page</span></div>
                </div>
            </div>

        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}
function Person(props) {
    const [show, setShow] = useState(false)

    return (
        <div className='person'>
            <h2 onClick={() => { setShow(!show) }}>{props.person.name}</h2>
            {show && <div className='properties'>
                <div className={'property '}>Name: {props.person.name}</div>
                <div className={'property '}>Height: {props.person.height}</div>
                <div className={'property '}>Weight: {props.person.mass}</div>
                <div className={'property '}>Hair Color: {props.person.hair_color}</div>
                <div className={'property '}>Skin Color: {props.person.skin_color}</div>
                <div className={'property '}>Eye Color: {props.person.eye_color}</div>
                <div className={'property '}>Birth Year: {props.person.birth_year}</div>
                <div className={'property '}>Gender: {props.person.gender}</div>
                <div className={'property '}>Homeworld: {props.person.homeworld}</div>
                <div className={'property '}>Films: {props.person.films}</div>
                <div className={'property '}>Species: {props.person.species}</div>
                <div className={'property '}>Vehicles: {props.person.vehicles}</div>
                <div className={'property '}>Starships: {props.person.starships}</div>
                <div className={'property '}>Created: {props.person.created}</div>
                <div className={'property '}>Edited: {props.person.edited}</div>
                <div className={'property '}>URL: {props.person.url}</div>

                {/* displays all properties (less customizable) */}
                {/*
                {Object.entries(props.person).map(property => (
                    <div key={property} className={'property ' + property[0]}>{property[0]}: {property[1]}</div>
                ))}
                */}
            </div>
            }

        </div>
    )
}
