import { getDocs, collection, query, where, orderBy } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'


export default function Blog() {

    const q = query(collection(db, "blog"), orderBy("date", "asc"))

    const [loading, setLoading] = useState(true)

    const [articles, setArticles] = useState([])
    var g = 0;
    useEffect(() => {
        getDocs(q).then((snap) => {
            console.log(snap.docs)
            setArticles(snap.docs.map(doc => ({ id: doc.id, data: doc.data() })))
            setLoading(false)

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





    return (
        <div className='blog-component'>
            <h1>Blog</h1>
            <ul className='article-list'>
                {loading && <div>Loading...</div>}
                {articles.length > 0 && articles.map(art => (
                    <Article key={art.id}
                        title={art.data.title}
                        description={art.data.description}
                        author={art.data.author}
                        content={art.data.content}
                        seconds={art.data.date.seconds}
                        showDate={showDate}

                    />
                ))}
            </ul>
        </div >
    )
}
function Article(props) {
    const [show, setShow] = useState("hide")

    function handleClick() {
        if (show == "show") {
            setShow("hide")
        } else {
            setShow("show")
        }
    }

    return (
        <li className="blog-article" >
            <h2>{props.title}</h2>
            <p className='article-description'>{props.description}</p>

            <div className='readmore' onClick={handleClick}>Read More</div>
            <p className={show}>{props.content}</p>
            <span>by {props.author}</span>
            <div>{props.showDate(props.seconds * 1000)}</div>
            <div></div>
        </li>
    )
}
