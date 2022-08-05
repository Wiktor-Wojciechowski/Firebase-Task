import React, { useLayoutEffect, useEffect, useState } from 'react'

import { useAuth } from '../context/AuthContext'

import { db } from '../firebase'
import { addDoc, collection, doc, getDoc, getDocs, query } from 'firebase/firestore'

export default function Chat() {
    const [text, setText] = useState('')

    async function sendMessage(msg) {
        try {
            var date = new Date();
            const docRef = await addDoc(collection(db, "messages"), {
                text: msg,
                time: date
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        sendMessage(text);
    }

    const [res, setRes] = useState([])

    const array = []
    const getData = async () => {

        const querySnapshot = await getDocs(collection(db, "messages"));

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            // var varia = res.slice();
            // varia.push(doc.data())
            // setRes(varia)

            array.push(doc.data())
        });



    }

    useEffect(() => {
        getData().then(() => {
            console.log(array); setRes(array)
        })
    }, [])

    return (
        <div>
            <h1>Chat</h1>
            <div className='chat-container'>

                <p>{JSON.stringify(res)}</p>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => { setText(e.target.value) }}></input>
                    <button>Send</button>
                </form>
            </div>

        </div>
    )
}

function PromiseResult(props) {
    const [state, setState] = useState(props.result)
    return (
        <p>{state}</p>
    )
}