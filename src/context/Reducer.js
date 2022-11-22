import {SHOW_LOADER, CREATE_TODO, FETCH_TODOS, REMOVE_TODO, UPDATE_TODO} from '../utils/consts'

const actions = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [CREATE_TODO]: (state, {payload}) => ({
    ...state,
    todos: [...state.todos, payload]
  }),
  [FETCH_TODOS]: (state, {payload}) => ({...state, todos: payload, loading: false}),
  [REMOVE_TODO]: (state, {payload}) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== payload)
  }),
  [UPDATE_TODO]: (state, {payload}) =>(
     {...state, todos: state.todos.map(todo => {
        if(todo.id === payload) {
          if (todo.completed) {
            return {...todo, completed: false}
          } else {return {...todo, completed: true}}
        }
        return todo
    })}),
  DEFAULT: state => state
}

export const reducer = (state, action) => {
  const handle = actions[action.type] || actions.DEFAULT
  return handle(state, action)
}