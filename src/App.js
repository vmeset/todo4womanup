import React, { useContext, useEffect } from 'react'
import Form from './components/Form'
import List from './components/List'
import { Context } from './context/Context'
import './App.css';

const App = () => {

  const {fetchTodos, todos, removeTodo, updateTodo} = useContext(Context)

  useEffect(() => {
      fetchTodos()
  }, [])

  return (
    <div className='container'>
      <Form />
      <List todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  )
}

export default App