// Modelo de como podria ser el funcionamiento al trabajar con Redux
export const todoReducer = (initialState = [], action)=>{
    // En caso de que desde el TodoApp se envie un action con el tipo type identico a lo que se especifica en el case se listara lo del initialState y se agregara la nueva data
    switch (action.type) {
        // Agregar todo nuevo
        case 'Add Todo':
            return [...initialState, action.payload];
        // Eliminar todo
        case 'Remove Todo':
            return initialState.filter(todo => todo.id !== action.payload);
        
        case 'Toggle Todo':
            return initialState.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                return todo;
            });

            
    
        default:
            return initialState;
    }
}