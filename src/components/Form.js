import React, { useContext, useState } from 'react'
import * as dayjs from 'dayjs'
import { Context } from '../context/Context'
import { ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage'
import { storage } from '../firebase'
import { v4 } from 'uuid'

const Form = () => {

    const {createTodo} = useContext(Context)
    const [todo, setTodo] = useState({title: '', description: ''})
    const [imageUpload, setImageUpload] = useState(null);

    // const uploadFile = () => {
    //     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    //     uploadBytes(imageRef, imageUpload).then(() => {
    //         alert('upld')
    //     })
    // }

    const submitHandler = event => {
        event.preventDefault()
        try {
            let fileName = v4() + ".jpg"
            const newTodo = {
                title: todo.title,
                description: todo.description,
                date: dayjs(),
                img: fileName
            }
            createTodo(newTodo)
            const imageRef = ref(storage, `images/${fileName}}`)
            uploadBytes(imageRef, imageUpload).then(() => {
                alert(fileName)
            })
        } catch(e) {
            alert('error')
        }
        setTodo({title: '', description: ''})
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text" value={todo.title} onChange={e => setTodo({...todo, 
                title: e.target.value})} />
            <input type="text" value={todo.description} onChange={e => setTodo({...todo, 
                description: e.target.value})} />
            <input type="file" onChange={(event) => {
                setImageUpload(event.target.files[0])
            }} />
            <button>send</button>
        </form>
    )
}

export default Form