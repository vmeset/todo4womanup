import {SHOW_LOADER, CREATE_TODO, FETCH_TODOS, REMOVE_TODO, UPDATE_TODO} from '../utils/consts'

const actions = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [CREATE_TODO]: (state, {payload}) => ({
    ...state,
    todos: [...state.todos, payload]
  }),
  [FETCH_TODOS]: (state, {payload}) => ({...state, todos: payload, loading: false}),
//   [UPDATE_TODO]: (state, {payload}) => ({...state, todos: payload, loading: false}),
  [REMOVE_TODO]: (state, {payload}) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== payload)
  }),
  DEFAULT: state => state
}

export const reducer = (state, action) => {
  const handle = actions[action.type] || actions.DEFAULT
  return handle(state, action)
}