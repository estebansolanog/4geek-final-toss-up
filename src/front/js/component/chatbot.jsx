import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import Button from '@material-ui/core/Button';
import EditRecipeModal from './EditRecipeModal.jsx';
import "../../styles/chatbot.css"

import RecipeEditor from './RecipeEditor.jsx';
// import EditRecipeModal from './EditRecipeModal.jsx';

import SendIcon from '@material-ui/icons/Send';

const Chatbot = () => {
  const { store, actions } = useContext(Context);
  const [recipe, setRecipe] = useState(''); // Estado para almacenar la receta
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el indicador de carga
  const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input
  const [chatHistory, setChatHistory] = useState([]);
  const [infoUsuario, setInfoUsuario] = useState(null)
  const messagesEndRef = useRef(null);

  //relacionado con la ventana modal para editar la receta

  const [selectedChat, setSelectedChat] = useState(null);

  const handleEditClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSave = async (editedChat) => {
    // Aquí puedes hacer una petición a tu backend para actualizar el chat con los nuevos datos
    try {
      await axios.post('http://localhost:3001/chat/saveRecipe', editedChat, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      fetchChatHistory();
    } catch (error) {
      console.error('Hubo un error al obtener la receta:', error);
    }

    setSelectedChat(null); // Cierra el modal al terminar de guardar
  };

  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [currentRecipe, setCurrentRecipe] = useState(null);

  // const handleEditClick = (recipe) => {
  //   setCurrentRecipe(recipe);
  //   setIsEditModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsEditModalOpen(false);
  // };

  // const handleSave = async (editedRecipe) => {
  //   // setRecipe(editedRecipe);
  //   // Aquí también puedes hacer una petición a tu backend para guardar la receta editada.
  //   try {
  //     await axios.post('http://localhost:3001/chat/saveRecipe', {
  //       ...editedRecipe,
  //       ...editedQuery
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem("token")}`
  //       }
  //     });
  //     fetchChatHistory();
  //   } catch (error) {
  //     console.error('Hubo un error al obtener la receta:', error);
  //   }
  //   // Luego, cierra el modal.
  //   setIsEditModalOpen(false);
  // };
  // FIn del código relacionado con la ventana modal para editar la receta

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

  //Cada vez que se recarga la pagina, hace escroll hacia abajo para ver el ultimo mensaje.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const fetchRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/chat/recipe', {
        prompt: inputValue
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
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
              {/* <EditRecipeModal recipe={chat} onSave={handleSave} /> */}

              <Button variant="outlined" color="primary" onClick={() => handleEditClick(chat)}>
                Editar
              </Button>
              <EditRecipeModal
                open={!!selectedChat}
                onClose={() => setSelectedChat(null)}
                chat={selectedChat}
                onSave={handleSave}
              />

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

// const fetchRecipe = async () => {
//   setIsLoading(true);
//   try {
//     // const response = await axios.post('http://localhost:3001/chat/chatgpt', original
//     const response = await axios.post('http://localhost:3001/chat/recipe', {
//       prompt: inputValue
//     });

//     // console.log(`Bearer ${localStorage.getItem("token")}`);
//     // await axios.post('http://localhost:3001/chat/saveRecipe', {
//     //   description: response.data.message,
//     //   user_query: inputValue
//     // }, {
//     //   headers: {
//     //     'Authorization': `Bearer ${localStorage.getItem("token")}`
//     //   }
//     // });

//     // setRecipe(response.data.message);
//     // Agregar la pregunta del usuario y la respuesta del bot al historial de chat
//     setChatHistory(prevChatHistory => [...prevChatHistory, {
//       user_query: inputValue,
//       description: response.data.message,
//       image_of_recipe: response.data.image_of_recipe
//     }]);
//   } catch (error) {
//     console.error('Hubo un error al obtener la receta:', error);
//   }
//   setIsLoading(false);
// };

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
