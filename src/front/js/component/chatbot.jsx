import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/chatbot.css"

import SendIcon from '@material-ui/icons/Send';

const Chatbot = () => {
  const { store, actions } = useContext(Context);
  const [recipe, setRecipe] = useState(''); // Estado para almacenar la receta
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el indicador de carga
  const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input
  const [chatHistory, setChatHistory] = useState([]);
  const [infoUsuario, setInfoUsuario] = useState(null)
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const fetchRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/chat/recipe', {
        prompt: inputValue
      });

      setChatHistory(prevChatHistory => [...prevChatHistory, {
        user_query: inputValue,
        description: response.data.recipe,
        image_of_recipe: response.data.image_path
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
    event.preventDefault();
    fetchRecipe();
    setInputValue('');
  };

  return (
    <div className='container'>
      <h1>Receta</h1>

      <div>
        {chatHistory && chatHistory.length > 0 ? chatHistory.map((chat, index) => (
          <div key={index}>
            <p><strong>{infoUsuario}:</strong> {chat.user_query}</p>
            <div>
              <p><strong>MarIA:</strong></p>
              {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
              <p style={{ whiteSpace: 'pre-wrap' }}> {chat.description}</p>
            </div>
          </div>

        )) : <div className='container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <p>Hola, <span>{infoUsuario}</span>, soy MarIA, tu asistente de recetas desarrollada por el equipo de TossUp.</p>
          <p>Para empezar, escribe una receta que quieras preparar.</p>
        </div>}
      </div>
      {isLoading ? <p>Cargando receta...</p> : null}
      <form onSubmit={handleSubmit} className="fixed-form" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="¿Qué vas a preparar hoy?"
          style={{ flex: 1 }}
        />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
      <div ref={messagesEndRef} /> {/* Añade este div */}
    </div>
  );
};

export default Chatbot;






// import React, { useRef, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useContext } from 'react';
// import { Context } from '../store/appContext';
// import "../../styles/chatbot.css"

// import SendIcon from '@material-ui/icons/Send';

// const Chatbot = () => {
//   const { store, actions } = useContext(Context);
//   const [recipe, setRecipe] = useState(''); // Estado para almacenar la receta
//   const [isLoading, setIsLoading] = useState(false); // Estado para controlar el indicador de carga
//   const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input
//   const [chatHistory, setChatHistory] = useState([]);
//   const [infoUsuario, setInfoUsuario] = useState(null)
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       const response = await axios.get('http://localhost:3001/chat/getChatHistory', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       console.log(response.data);
//       setChatHistory(response.data);
//     };

//     fetchChatHistory();
//   }, []);

//   useEffect(() => {
//     const cargaDatos = async () => {
//       // let { respuestaJson, response } = await actions.useFetch("/api/protected")
//       const { respuestaJson, response } = await actions.useFetch("/api/myaccount");

//       console.log(response.ok)
//       console.log(respuestaJson)
//       if (response.ok) {
//         setInfoUsuario(respuestaJson.name)
//         console.log(respuestaJson.name)
//       }
//     }
//     cargaDatos()
//   }, [])

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatHistory]);

//   const fetchRecipe = async () => {
//     setIsLoading(true);
//     try {
//       // const response = await axios.post('http://localhost:3001/chat/chatgpt', original
//       const response = await axios.post('http://localhost:3001/chat/recipe', {
//         prompt: inputValue
//       });

//       // console.log(`Bearer ${localStorage.getItem("token")}`);
//       // await axios.post('http://localhost:3001/chat/saveRecipe', {
//       //   description: response.data.message,
//       //   user_query: inputValue
//       // }, {
//       //   headers: {
//       //     'Authorization': `Bearer ${localStorage.getItem("token")}`
//       //   }
//       // });

//       // setRecipe(response.data.message);
//       // Agregar la pregunta del usuario y la respuesta del bot al historial de chat
//       setChatHistory(prevChatHistory => [...prevChatHistory, {
//         user_query: inputValue,
//         description: response.data.message,
//         image_of_recipe: response.data.image_of_recipe
//       }]);
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

//       <div>
//         {chatHistory && chatHistory.length > 0 ? chatHistory.map((chat, index) => (
//           <div key={index}>
//             <p><strong>{infoUsuario}:</strong> {chat.user_query}</p>
//             <p style={{ whiteSpace: 'pre-wrap' }}><strong>MarIA:</strong> {chat.description}</p>
//           </div>

//         )) : <div className='container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//           <p>Hola, <span>{infoUsuario}</span>, soy MarIA, tu asistente de recetas desarrollada por el equipo de TossUp.</p>
//           <p>Para empezar, escribe una receta que quieras preparar.</p>
//         </div>}
//       </div>
//       {isLoading ? <p>Cargando receta...</p> : <></>}
//       <form onSubmit={handleSubmit} className="fixed-form" style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="¿Que vas preparar hoy?"
//           style={{ flex: 1 }}
//         />
//         <button type="submit">
//           <SendIcon />
//         </button>
//       </form>
//       <div ref={messagesEndRef} /> {/* Añade este div */}
//     </div>
//   );
// };

// export default Chatbot;
