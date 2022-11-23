import React from 'react'
import { storage } from '../firebase'
import { ref, deleteObject, getDownloadURL } from "firebase/storage"
import attachment from '../img/attachment.svg'
import * as dayjs from 'dayjs'
/**
 * Стрелочная функция отрисовывает компонент Todo
 * @param {*} param0 Параметрами принимает объект todo, функции удаления и обновления
 * @returns Возвращает JSX, который отрисовывает каждую задачу из списка
 */
const Todo = ({todo, removeTodo, updateTodo}) => {
    const imageRef = ref(storage, `images/${todo.img}`)
    /**
     * Функция удаляет объект из базы данных по указанному id
     * @param {string} id id в виде строки, автоматически сгенерированный БД
     */
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
    /**
     * Функция генерирует ссылку для изображения и открывает его в новом окне
     */
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
                        ? <img src={attachment} alt="attachment" width='20' onClick={showImg}/>
                        : <></>
                    }
                </div>
            </div>
        </li>
    );
};

export default Todo;