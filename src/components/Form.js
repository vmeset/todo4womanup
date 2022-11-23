import React, { useContext, useState } from 'react'
import { Context } from '../context/Context'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import { v4 } from 'uuid'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/**
 * Стрелочная функция компонент для созданий задач
 * @returns Возвращает JSX, который отрисовывает форму для новых задач
 */
const Form = () => {
    const {createTodo} = useContext(Context)
    const [todo, setTodo] = useState({title: '', description: ''})
    const [imageUpload, setImageUpload] = useState(null)
    const imageInputRef = React.useRef()
    const [expiredDate, setExpiredDate] = useState('')
    /**
     * Функция проверяет наличие файла для отправки. Если файл выбран, загружает его в storage
     * @param {string} fileName автоматически генерируемое имя файла
     */
    const uploadImg = (fileName) => {
        if (imageUpload == null) return
        const imageRef = ref(storage, `images/${fileName}`)
        uploadBytes(imageRef, imageUpload)
    }
    /**
     * Функция проверяет загружен ли файл. Создает новый объект newTodo и загружает его на сервер
     * @param {*} event параметр event передаем для предовращения действия браузера по умолчанию
     */
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
                date: expiredDate,
                img: fileName,
                completed: false
            }
            createTodo(newTodo)
            uploadImg(fileName)
        } catch(e) {
            alert('error')
        }
        setTodo({title: '', description: ''})
        setExpiredDate('')
        setImageUpload(null)
        imageInputRef.current.value = ""
    }
      
    return (
        <>
            <form className='my-form' onSubmit={submitHandler}>
                <input className='title' type="text" value={todo.title} 
                    placeholder='Enter title'
                    onChange={e => setTodo({...todo, title: e.target.value})} />
                <input className='description' type="text" value={todo.description}
                    placeholder='Enter description' 
                    onChange={e => 
                    setTodo({...todo, description: e.target.value})} />
                <div style={{width: '120px'}}>
                    <DatePicker
                        showTimeSelect
                        placeholderText='select date'
                        selected={expiredDate}
                        onChange={(date) => setExpiredDate(date)}
                    />
                </div>
                <input className='file' type="file" accept="image/jpg"
                    ref={imageInputRef}
                    onChange={e => {setImageUpload(e.target.files[0])}} />
                <button>send</button>
            </form>
        </>
        
    )
}

export default Form