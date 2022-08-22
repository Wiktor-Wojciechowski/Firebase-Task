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
            setArticles(snap.docs.map(doc => ({ id: doc.id, data: doc.data() })))

        })

    }, [])

    function showDate(dateJoined) {
        var dmy = dateJoined.toLocaleDateString();
        var hour = dateJoined.getHours().toString();
        var minutes = dateJoined.getMinutes().toString();
        var seconds = dateJoined.getSeconds().toString();

        return dmy.padStart(2, '0') + ' ' + hour.padStart(2, '0') + ':' + minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }

    return (


        <div className='blog-component'>A list of articles
            <ul>
                {articles.length > 0 && articles.map(art => (
                    <li key={art.id}>
                        <h2>{art.data.title}</h2>
                        <span>{art.data.author}</span>
                        <p>{art.data.content}</p>
                        <div>{showDate(new Date(art.data.date))}</div>
                    </li>
                ))}
            </ul>

            <ul className='article-list'>
                <li>
                    <h2>Article</h2>
                    <span>Author</span>
                    <p>Description</p>
                </li>
                <li>
                    <h2>Article</h2>
                    <span>Author</span>
                    <p>Description</p>
                </li>
                <li>
                    <h2>Article</h2>
                    <span>Author</span>
                    <p>Description</p>
                </li>
                <li>
                    <h2>Article</h2>
                    <span>Author</span>
                    <p>Description</p>
                </li>
                <li>
                    <h2>Article</h2>
                    <span>Author</span>
                    <p>Description</p>
                </li>
                <li>
                    <h2>Article</h2>
                    <span>Author</span>
                    <p>Description</p>
                </li>

            </ul>
        </div>
    )
}
