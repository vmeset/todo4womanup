import React, { useContext, useState } from 'react'
import * as dayjs from 'dayjs'
import { Context } from '../context/Context'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import { v4 } from 'uuid'

const Form = () => {

    const {createTodo} = useContext(Context)
    const [todo, setTodo] = useState({title: '', description: ''})
    const [imageUpload, setImageUpload] = useState(null);

    const uploadImg = (fileName) => {
        if (imageUpload == null) return
        const imageRef = ref(storage, `images/${fileName}`)
        uploadBytes(imageRef, imageUpload)
    }

    const submitHandler = event => {
        event.preventDefault()
        try {
            let fileName
            if(imageUpload) {
                fileName = v4() + ".jpg"
            }
            const newTodo = {
                title: todo.title,
                description: todo.description,
                date: dayjs().format("HH:mm DD-MM-YY"),
                img: fileName,
                completed: false
            }
            createTodo(newTodo)
            uploadImg(fileName)
        } catch(e) {
            alert('error')
        }
        setTodo({title: '', description: ''})
    }

    return (
        <form className='my-form' onSubmit={submitHandler}>
            <input className='title' type="text" value={todo.title} 
                placeholder='Enter title'
                onChange={e => setTodo({...todo, title: e.target.value})} />
            <input className='description' type="text" value={todo.description}
                placeholder='Enter description' 
                onChange={e => 
                setTodo({...todo, description: e.target.value})} />
            <input className='file' type="file" 
                onChange={e => {setImageUpload(e.target.files[0])}} />
            <button>send</button>
        </form>
    )
}

export default Form