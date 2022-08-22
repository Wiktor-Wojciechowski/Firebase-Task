import { getDocs, collection, query, where, orderBy } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'


export default function Blog() {

    const q = query(collection(db, "blog"), orderBy("date", "asc"))

    const [articles, setArticles] = useState([])
    var g = 0;
    useEffect(() => {
        getDocs(q).then((snap) => {
            console.log(snap.docs)
            setArticles(snap.docs.map(doc => ({ id: doc.id, data: doc.data() })))

        })

    }, [])

    function showDate(dateJoined) {
        var dateJoined = new Date(dateJoined)
        var dmy = dateJoined.toLocaleDateString();
        var hour = dateJoined.getHours().toString();
        var minutes = dateJoined.getMinutes().toString();
        var seconds = dateJoined.getSeconds().toString();

        return dmy.padStart(2, '0') + ' ' + hour.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }

    const [show, setShow] = useState("hide")

    function handleClick() {
        if (show == "show") {
            setShow("hide")
        } else {
            setShow("show")
        }
    }

    return (
        <div className='blog-component'>
            <h1>Blog</h1>
            <ul className='article-list'>
                {articles.length > 0 && articles.map(art => (
                    <li key={art.id}>
                        <h2>{art.data.title}</h2>
                        <span>{art.data.description}</span>
                        <div className='readmore' onClick={handleClick}>Read More</div>
                        <p className={show}>{art.data.content}</p>
                        <span>by {art.data.author}</span>
                        <div>{showDate(art.data.date.seconds * 1000)}</div>
                        <div></div>
                    </li>
                ))}
            </ul>
        </div >
    )
}
