import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

// Estado inicial de la Aplicacion sin algun storage definido.
// const initialState = [
//     // {
//     // id: new Date().getTime(),
//     // description: 'Levantarse',
//     // done: false,
//     // },
//     // {
//     // id: new Date().getTime() * 2,
//     // description: 'Lavarse la Cara',
//     // done: false,
//     // },
//   ];

//Estado inicial alojado en el localStorage
const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  // Se define el Reducer apuntando al archivo independiente todoReducer.js
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  // Desde este punto se utilizara el localStorage para almacenar las tareas mediante el useEffect
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Se define la funcion que sera llamada desde el formulario TodoAdd
  const handleNewTodo = (todo) => {
    //Se define el objeto que se enviara hacia todoReducer.js en el cual el to-do que obtiene es la informacion que se envio desde el form
    const action = {
      type: "Add Todo",
      payload: todo,
    };

    // El dispatch se encarga de empujar el action hacia el archivo todoReducer.js
    dispatch(action);
  };

  //Funcion para eliminar un Todo
  const handleDeleteTodo = (id) => {
    dispatch({
      type: "Remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "Toggle Todo",
      payload: id,
    });
  };


  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
  };
};
