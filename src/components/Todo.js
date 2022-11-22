import React, { useEffect, useState } from 'react'
import { storage } from '../firebase'
import { ref, deleteObject, getDownloadURL } from "firebase/storage"
import attachment from '../img/attachment.svg'

const Todo = ({todo, removeTodo, updateTodo}) => {

    const imageRef = ref(storage, `images/${todo.img}`)
    const [imgUrl, setImgurl] = useState('')
    
    const onRemove = (id) => {
        removeTodo(id)
        deleteObject(imageRef).then(() => {
            }).catch((error) => {
        })
    }

    useEffect(() => {
        if(todo.img){
            getDownloadURL(imageRef).then((url) => {
                setImgurl(url)
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [])
    

    const viewImg = () => {
        getDownloadURL(imageRef).then((url) => {
            setImgurl(url)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <li className={!!todo.completed ? 'todo completed' : 'todo'}>
            <div>
                <strong>{todo.title}</strong>
                <p>{todo.description}</p>
            </div>
            <div className='options'>
                <div>
                    <small>{todo.date}</small>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <button onClick={() => onRemove(todo.id)}>
                        X
                    </button>
                    {!!todo.completed
                        ? <button onClick={() => updateTodo(todo)}>
                            ↩
                        </button>
                        : <button onClick={() => updateTodo(todo)}>
                            ✓
                        </button>
                        
                    }
                    {!!todo.img
                        ? <a href={imgUrl} target="_blank">
                            <img src={attachment} alt="attachment" width='20' />
                        </a>
                        : <></>
                    }
                </div>
            </div>
        </li>
    );
};

export default Todo;