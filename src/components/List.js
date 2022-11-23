import React from 'react';
import Todo from './Todo';

/**
 * Стрелочная функция компонент принимает список задач и две функции
 * @param {*} param0 массив объектов todos и фукнции удаление и обновление
 * @returns Возвращает массив Todo компонент
 */

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