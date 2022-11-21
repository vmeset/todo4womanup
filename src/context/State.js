import React, {useReducer} from 'react'
import axios from 'axios'
import {Context} from './Context'
import {reducer} from './Reducer'
import {SHOW_LOADER, CREATE_TODO, FETCH_TODOS, REMOVE_TODO, UPDATE_TODO} from '../utils/consts'

const url = 'https://todo4womanup-default-rtdb.europe-west1.firebasedatabase.app/'

export const State = ({children}) => {
  const initialState = {
    todos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const fetchTodos = async () => {
    // showLoader()
    const res = await axios.get(`${url}/todos.json`)

    const payload = Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })

    dispatch({type: FETCH_TODOS, payload})
  }

  const createTodo = async todo => {

    try {
      const res = await axios.post(`${url}/todos.json`, todo)
      const payload = {
        ...todo,
        id: res.data.name
      }

      dispatch({type: CREATE_TODO, payload})

    } catch (e) {
      throw new Error(e.message)
    }
  }

  const removeTodo = async id => {
    await axios.delete(`${url}/todos/${id}.json`)

    dispatch({
      type: REMOVE_TODO,
      payload: id
    })
  }

  return (
    <Context.Provider value={{
      showLoader, createTodo, removeTodo, fetchTodos,
      loading: state.loading,
      todos: state.todos
    }}>
      {children}
    </Context.Provider>
  )
}