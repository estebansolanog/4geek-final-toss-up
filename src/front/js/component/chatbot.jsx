import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../store/appContext';
const Chatbot = () => {
  const { store, actions } = useContext(Context);
  const [recipe, setRecipe] = useState(''); // Estado para almacenar la receta
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el indicador de carga
  const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input
  const [chatHistory, setChatHistory] = useState([]);
  const [infoUsuario, setInfoUsuario] = useState(null)

  useEffect(() => {
    const fetchChatHistory = async () => {
      const response = await axios.get('http://localhost:3001/chat/getChatHistory', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response.data);
      setChatHistory(response.data);
    };

    fetchChatHistory();
  }, []);

  useEffect(() => {
    const cargaDatos = async () => {
      // let { respuestaJson, response } = await actions.useFetch("/api/protected")
      const { respuestaJson, response } = await actions.useFetch("/api/myaccount");

      console.log(response.ok)
      console.log(respuestaJson)
      if (response.ok) {
        setInfoUsuario(respuestaJson.name)
        console.log(respuestaJson.name)
      }
    }
    cargaDatos()
  }, [])

  const fetchRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/chat/chatgpt', {
        prompt: inputValue
      });

      console.log(`Bearer ${localStorage.getItem("token")}`);
      await axios.post('http://localhost:3001/chat/saveRecipe', {
        description: response.data.message,
        user_query: inputValue
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      // setRecipe(response.data.message);
      // Agregar la pregunta del usuario y la respuesta del bot al historial de chat
      setChatHistory(prevChatHistory => [...prevChatHistory, {
        user_query: inputValue,
        description: response.data.message
      }]);
    } catch (error) {
      console.error('Hubo un error al obtener la receta:', error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento de envío de formulario por defecto
    fetchRecipe();
    setInputValue('');
  };

  return (
    <div className='container'>
      <h1>Receta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Introduce la receta que quieres buscar"
        />
        <button type="submit">Buscar receta</button>
      </form>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <p><strong>{infoUsuario}</strong> {chat.user_query}</p>
            <p><strong>MarIA:</strong> {chat.description}</p>
          </div>

        ))}
      </div>
      {/* {isLoading ? <p>Cargando receta...</p> : <div style={{ whiteSpace: 'pre-wrap' }}>{recipe}</div>} */}
    </div>
  );
};

export default Chatbot;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Chatbot = () => {
//   const [recipe, setRecipe] = useState(''); // Estado para almacenar la receta
//   const [isLoading, setIsLoading] = useState(false); // Estado para controlar el indicador de carga
//   const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input

//   const fetchRecipe = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3001/chat/chatgpt', {
//         prompt: inputValue
//       });

//       setRecipe(response.data.message);
//     } catch (error) {
//       console.error('Hubo un error al obtener la receta:', error);
//     }
//     setIsLoading(false);
//   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);

//   };

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Previene el comportamiento de envío de formulario por defecto
//     fetchRecipe();
//     setInputValue('');
//   };

//   return (
//     <div className='container'>
//       <h1>Receta</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Introduce la receta que quieres buscar"
//         />
//         <button type="submit">Buscar receta</button>
//       </form>
//       {isLoading ? <p>Cargando receta...</p> : <div style={{ whiteSpace: 'pre-wrap' }}>{recipe}</div>}
//     </div>
//   );
// };

// export default Chatbot;