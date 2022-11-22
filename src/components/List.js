import React from 'react';
import Todo from './Todo';

const List = ({todos, removeTodo, updateTodo}) => {

    return (
        <ul>
            {todos.map(todo => (
                <Todo key={todo.id} todo={todo} 
                removeTodo={removeTodo} updateTodo={updateTodo} />
            ))}
        </ul>
    );
};

export default List;