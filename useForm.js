import { useState } from "react";

export const useForm = (initialForm = {}) => {
  //Inicializa el state
    const [formState, setformState] = useState(initialForm);
    
    // Funcion para manejar los input en un form
    const onInputChange = ({ target }) => {
        // Mediante el event.target busca el value y el name de un input
        const { name, value } = target;
        setformState({
          // se vuelve a llamar los estados del form
          ...formState,
          // Se le asigna el valor que posea el input con el name correspondiente
          [name]: value,
        });
      };

      // funcion que reinicia los inputs
      const onResetForm = ()=>{
          setformState(initialForm);
      }
  
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm

  }
}
