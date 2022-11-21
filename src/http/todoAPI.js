const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const createTodo = async (todo) => {
    const response = await $host.post('api/note/create', todo)
    return response
}

export const fetchTodos = async (author, page, limit) => {
    const response = await $host.get('api/todo/list', {params: {
        author, page, limit
    }})
    return response.data
}

export const deleteTodo = async (id) => {
    const response = await $host.delete(`api/todo/${id}`)
    return response.data
}

export const updateTodo = async (note) => {
    const response = await $host.put('api/todo/update', todo)
    return response.data
}