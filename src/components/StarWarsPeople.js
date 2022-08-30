import React from 'react'
import { useState, useEffect } from 'react'

export default function StarWarsPeople() {

    const [page, setPage] = useState()

    useEffect(() => {
        fetch('https://swapi.dev/api/people').then(data => data.json().then((p => {
            setPage(p)
            console.log(page)
        })))
    }, [])



    if (page) {
        return (
            <div className='starwarspeople-component'>
                <div className='person-list'>{page.results.map(person => (

                    <Person key={person.url}
                        person={person}
                    />



                ))}
                </div>

                <div className='next-button' onClick={() => {
                    if (page.previous) {
                        fetch(page.previous).then(data => data.json().then((p => {
                            setPage(p)
                            console.log(page)
                        })))
                    }
                }}>Previous</div>


                <div className='previous-button' onClick={() => {
                    if (page.next) {
                        fetch(page.next).then(data => data.json().then((p => {
                            setPage(p)
                            console.log(page)
                        })))
                    }

                }}>Next</div>
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
    console.log(props.person.name)
    return (
        <div>
            <div onClick={() => { setShow(!show) }}>{props.person.name}</div>
            {show &&
                <div>{props.person.name}</div>

            }
        </div>
    )
}
function PersonDetails(props) {

}