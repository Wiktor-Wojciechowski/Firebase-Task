import React from 'react'
import { useEffect } from 'react'
export default function Error404() {
    useEffect(() => {
        document.title = 'Error 404'
    }, [])
    return (
        <div><h1>Error 404</h1></div>
    )
}
