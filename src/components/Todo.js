import React, { useEffect, useState } from 'react'
import { storage } from '../firebase'
import { ref, deleteObject, getDownloadURL } from "firebase/storage"
import attachment from '../img/attachment.svg'
import * as dayjs from 'dayjs'

const Todo = ({todo, removeTodo, updateTodo}) => {

    // const [imgUrl, setImgurl] = useState('')
    const imageRef = ref(storage, `images/${todo.img}`)
    
    const onRemove = (id) => {
        removeTodo(id)
        if(!!todo.img) {
            deleteObject(imageRef).then(() => {
                }).catch((error) => {
                    console.log(error)
                }
            )
        }
    }

    // useEffect(() => {
    //     if(todo.img){
    //         getDownloadURL(imageRef).then((url) => {
    //             setImgurl(url)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    //     }
    // }, [])

    const showImg = () => {
        getDownloadURL(imageRef).then((url) => {
            window.open(url)
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
                    {!!todo.date
                        ? dayjs().diff(todo.date) < 0
                            ?   
                                <>
                                    <p>expire in</p>
                                    <small>{dayjs(todo.date).format("HH:mm DD-MM-YY")}</small>
                                </>
                            : 
                                <>
                                    <p style={{backgroundColor: 'red'}}>
                                        expired
                                    </p>
                                    <small>{dayjs(todo.date).format("HH:mm DD-MM-YY")}</small>
                                </>
                        : <>
                            <p>NO DATE</p>
                        </>
                    }
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
                        ? <img src={attachment} alt="attachment" width='20' 
                            onClick={showImg}
                            />
                        : <></>
                    }
                </div>
            </div>
        </li>
    );
};

export default Todo;