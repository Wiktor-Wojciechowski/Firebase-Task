import React from 'react'
import { useState, useEffect } from 'react'

export default function StarWarsPeople() {

    const [films, setFilms] = useState();
    const [planets, setPlanets] = useState();
    const [species, setSpecies] = useState();
    const [starships, setStarships] = useState();
    const [vehicles, setVehicles] = useState();
    /*
        useEffect(() => {
            fetch('https://swapi.dev/api/films/').then((f) => {
                f.json().then((d) => {
                    console.log(d)
                })
            })
            fetch('https://swapi.dev/api/planets/').then((f) => {
                f.json().then((d) => {
                    console.log(d)
                })
            })
            fetch('https://swapi.dev/api/species/').then((f) => {
                f.json().then((d) => {
                    console.log(d)
                })
            })
            fetch('https://swapi.dev/api/starships/').then((f) => {
                f.json().then((d) => {
                    console.log(d)
                })
            })
            fetch('https://swapi.dev/api/vehicles/').then((f) => {
                f.json().then((d) => {
                    console.log(d)
                })
            })
    
        }, [])
    */



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
            data.json().then((p => {

                setPage(p)
                setLoading(false);
                console.log(page)
            }))
        })
    }

    if (page && !loading) {
        return (
            <div className='starwarspeople-component'>
                <div className='wrapper'>
                    <h1 className='title'>People of Star Wars</h1>
                    <div className='person-list'>{page.results.map(person => (

                        <Person key={person.url}
                            person={person}

                        />



                    ))}
                    </div>
                    <div className='buttons'>

                        <div className='previous-button'>
                            {page.previous &&
                                <span onClick={() => {
                                    if (page.previous) {
                                        fetchPage(page.previous)
                                    }
                                }}>Previous Page</span>}
                        </div>


                        <div className='next-button' >{page.next && <span onClick={() => {

                            fetchPage(page.next)


                        }}>Next Page</span>}
                        </div>

                    </div>
                </div>
            </div>

        )
    } else {
        return (
            <div className='starwarspeople-component'>
                <h1 className='title'>People of Star Wars</h1>
                <div>Loading...</div>
            </div>

        )
    }
}
function Person(props) {
    const [show, setShow] = useState(false)

    const [homeworld, setHomeworld] = useState()
    const [films, setFilms] = useState([])
    const [species, setSpecies] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])

    useEffect(() => {
        fetch(props.person.homeworld).then(f => f.json().then(d => {
            setHomeworld(d.name)
        }))
    }, [])

    //get films
    useEffect(() => {
        let arr = []
        let itemsProcessed = 0;

        if (props.person.films) {
            for (let q = 0; q < props.person.films.length; q++) {
                fetch(props.person.films[q]).then(w => w.json().then((e) => {
                    arr.push(e.title)
                    itemsProcessed++;
                    if (itemsProcessed === props.person.films.length) {
                        setFilms(arr)
                    }
                }))
            }

        }

    }, [])
    //get species
    useEffect(() => {
        let arr = []
        //fetch('https://swapi.dev/api/people/1').then(q => q.json().then(w => console.log(w)))
        let itemsProcessed = 0;

        if (typeof props.person.species !== undefined) {
            if (props.person.species.length > 0) {
                for (let q = 0; q < props.person.species.length; q++) {
                    fetch(props.person.species[q]).then(w => w.json().then((e) => {
                        arr.push(e.name)
                        itemsProcessed++;
                        console.log(arr)
                        if (itemsProcessed === props.person.species.length) {
                            if (arr[0] == undefined) {
                                setSpecies(['unknown'])

                            } else {
                                setSpecies(arr)
                            }
                        }
                    }))
                }

            } else {
                setSpecies(['uknown'])
            }
        }

    }, [])

    useEffect(() => {
        let arr = []
        //fetch('https://swapi.dev/api/people/1').then(q => q.json().then(w => console.log(w)))
        let itemsProcessed = 0;

        if (typeof props.person.vehicles !== undefined) {
            if (props.person.vehicles.length > 0) {
                for (let q = 0; q < props.person.vehicles.length; q++) {
                    fetch(props.person.vehicles[q]).then(w => w.json().then((e) => {
                        arr.push(e.name)
                        itemsProcessed++;
                        console.log(arr)
                        if (itemsProcessed === props.person.vehicles.length) {
                            if (arr[0] == undefined) {
                                setVehicles(['unknown'])

                            } else {
                                setVehicles(arr)
                            }
                        }
                    }))
                }

            } else {
                setVehicles(['none'])
            }
        }

    }, [])
    useEffect(() => {
        let arr = []
        //fetch('https://swapi.dev/api/people/1').then(q => q.json().then(w => console.log(w)))
        let itemsProcessed = 0;

        if (typeof props.person.starships !== undefined) {
            if (props.person.starships.length > 0) {
                for (let q = 0; q < props.person.starships.length; q++) {
                    fetch(props.person.starships[q]).then(w => w.json().then((e) => {
                        arr.push(e.name)
                        itemsProcessed++;
                        console.log(arr)
                        if (itemsProcessed === props.person.starships.length) {
                            if (arr[0] == undefined) {
                                setStarships(['unknown'])

                            } else {
                                setStarships(arr)
                            }
                        }
                    }))
                }

            } else {
                setStarships(['none'])
            }
        }

    }, [])



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
                <div className={'property '}>Homeworld: {homeworld || 'Loading...'}</div>
                <div className={'property '}>Films: {films.join(', ') || 'Loading...'}</div>
                <div className={'property '}>Species: {species.join(', ') || 'Loading...'}</div>
                <div className={'property '}>Vehicles: {vehicles.join(', ') || 'Loading...'}</div>
                <div className={'property '}>Starships: {starships.join(', ') || 'Loading...'}</div>
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
