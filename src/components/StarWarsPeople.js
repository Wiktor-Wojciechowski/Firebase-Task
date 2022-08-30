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
            <div>
                <div className='person-list'>{page.results.map(person => (
                    <div>{person.name}</div>
                ))}</div>

                <div onClick={() => {
                    if (page.previous) {
                        fetch(page.previous).then(data => data.json().then((p => {
                            setPage(p)
                            console.log(page)
                        })))
                    }
                }}>Previous</div>


                <div onClick={() => {
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
