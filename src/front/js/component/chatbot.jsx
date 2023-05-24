import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import Button from '@material-ui/core/Button';
import EditRecipeModal from './EditRecipeModal.jsx';
import "../../styles/chatbot.css"
import ShareIcon from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SendIcon from '@material-ui/icons/Send';

const Chatbot = () => {
  const { store, actions } = useContext(Context);
  const [recipe, setRecipe] = useState(''); // Estado para almacenar la receta
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el indicador de carga
  const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input
  const [chatHistory, setChatHistory] = useState([]);
  const [infoUsuario, setInfoUsuario] = useState(null)
  const messagesEndRef = useRef(null);
  const [refresh, setRefresh] = useState(false);

  const [selectedChat, setSelectedChat] = useState(null); //Para manejar el click en el botón de compartir y abrir la ventana modal para editar la receta
  // const [refresh, setRefresh] = useState(false);

  //relacionado con el botón de compartir
  const [anchorEl, setAnchorEl] = useState(null); //Para manejar el click en el botón de compartir
  const [id, setId] = useState('');
  const [sharedChats, setSharedChats] = useState(new Set());
  const [socialShareAnchorEl, setSocialShareAnchorEl] = useState(null);


  useEffect(() => {
    if (selectedChat) {
      setId(selectedChat.id);
    }
  }, [selectedChat]);

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
  };

  const handleOpenShareMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickShare = (option, chat) => {
    // Dependiendo del estado actual de "compartir", haremos una solicitud a diferentes endpoints
    const isCurrentlyShared = sharedChats.has(chat.id);
    const endpoint = isCurrentlyShared ? 'UnShareRecipeChat' : 'ShareRecipeChat';

    console.log(chat)

    setAnchorEl(null);
    if (option === 'TossUp') {
      axios.put(`http://localhost:3001/chat/${endpoint}/${chat.id}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((response) => {
          // Dependiendo del estado actual de "compartir", quitamos o agregamos el id del chat a los chats compartidos
          setSharedChats(prevChats => {
            const updatedChats = new Set(prevChats);
            if (isCurrentlyShared) {
              updatedChats.delete(chat.id);
            } else {
              updatedChats.add(chat.id);
            }
            return updatedChats;
          });
        })
        .catch((error) => {
          console.error(error);
          // Aquí puedes manejar los errores, por ejemplo, mostrando un mensaje al usuario
        });
    }
  };


  const handleCloseShare = () => {
    setAnchorEl(null);
  };


  const handleShareUnshare = (chat) => {
    if (sharedChats.has(chat.id)) {
      handleClickShare('TossUp', chat);  // Si la receta ya ha sido compartida, llamamos a la función para dejar de compartir
    } else {
      handleClickShare('TossUp', chat);  // Si la receta no ha sido compartida, llamamos a la función para compartir
    }
  };

  const handleSocialShare = (socialNetwork, chat) => {
    let url = '';

    const text = encodeURIComponent(chat.description); // Esto convierte tu texto a un formato que puede ser incluido en una URL

    switch (socialNetwork) {
      case 'Facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${text}`;
        break;
      case 'Twitter':
        url = `https://twitter.com/intent/tweet?text=${text}`;
        break;
      case 'WhatsApp':
        url = `https://wa.me/?text=${text}`;
        break;
      default:
        break;
    }
  }

  const handleOpenSocialShareMenu = (event) => {
    setSocialShareAnchorEl(event.currentTarget);
  };

  const handleCloseSocialShareMenu = () => {
    setSocialShareAnchorEl(null);
  };


  //fin del código relacionado con el botón de compartir


  //relacionado con la ventana modal para editar la receta

  const handleEditClick = (chat) => {
    setSelectedChat(chat);
  };

  // La función para refrescar el componente una vez se da guardar en la ventana modal
  const refreshComponent = () => {
    setRefresh(refresh + 1);
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
    refreshComponent(); // Refresca el componente para mostrar los cambios
  };


  useEffect(() => {
    const fetchChatHistory = async () => {
      const response = await axios.get('http://localhost:3001/chat/getChatHistory', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response.data);
      setChatHistory(response.data);

      // Establecer sharedChats en base a los datos de la respuesta
      const sharedChatsFromResponse = response.data.filter(chat => chat.share).map(chat => chat.id);
      setSharedChats(new Set(sharedChatsFromResponse));

    };

    fetchChatHistory();
  }, [refresh, localStorage.getItem("token")]); // <-- Agrega 'refresh' a las dependencias de useEffect

  const DeleteRecipeChat = (chat) => {
    console.log(chat);
    setAnchorEl(null);
    axios.delete(`http://localhost:3001/chat/DeleteRecipeChat/${chat.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        setSharedChats(prevChats => {
          const updatedChats = new Set(prevChats);
          updatedChats.delete(chat.id);
          return updatedChats;
        });

        // Cambia el valor de 'refresh' para forzar una actualización
        setRefresh(prevRefresh => !prevRefresh);
      })
      .catch((error) => {
        console.error(error);
        // Aquí puedes manejar los errores, por ejemplo, mostrando un mensaje al usuario
      });
  }


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
    <div className='container-principal'>
      <div className='container-maria'>
        <h1></h1>

        <div >
          {chatHistory && chatHistory.length > 0 ? chatHistory.map((chat, index) => (
            <div key={index}>
              <div className="container-maria-chat">
                <p><strong>{infoUsuario}:</strong> {chat.user_query}</p>

                <p><strong>MarIA:</strong></p>
                {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
                <p style={{ whiteSpace: 'pre-wrap' }}> {chat.description}</p>
                {/* <EditRecipeModal recipe={chat} onSave={handleSave} /> */}

                <div className="container-maria-chat__buttons">
                  <div>
                    <Button variant="outlined" color="primary" onClick={() => handleEditClick(chat)}>
                      Editar
                    </Button>
                    <EditRecipeModal
                      open={!!selectedChat}
                      onClose={() => setSelectedChat(null)}
                      chat={selectedChat}
                      onSave={handleSave}
                    />
                    <Button variant="outlined" color="primary" onClick={() => handleShareUnshare(chat)}>
                      <ShareIcon />
                      {sharedChats.has(chat.id) ? 'Dejar de compartir' : 'Compartir'}
                    </Button>
                  </div>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleOpenSocialShareMenu}
                  >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </Button>
                  <Menu
                    id="social-share-menu"
                    anchorEl={socialShareAnchorEl}
                    keepMounted
                    open={Boolean(socialShareAnchorEl)}
                    onClose={handleCloseSocialShareMenu}
                  >
                    <MenuItem onClick={() => handleSocialShare('Facebook', chat)}><ShareIcon />Facebook</MenuItem>
                    <MenuItem onClick={() => handleSocialShare('Twitter', chat)}><ShareIcon />Twitter</MenuItem>
                    <MenuItem onClick={() => handleSocialShare('WhatsApp', chat)}><ShareIcon />WhatsApp</MenuItem>
                    <Divider />
                    <Button onClick={() => { DeleteRecipeChat(chat) }}>
                      <MenuItem >Eliminar receta</MenuItem>
                    </Button>


                  </Menu>
                </div>
              </div>
            </div>

          )) : <div className='container-chatless'>
            <p>Hola, <span className='user-chat'>{infoUsuario}</span>.</p>
            <p>Soy MarIA,tu asistente de recetas desarrollada por el equipo de TossUp.</p>
            <p>Para empezar, escribe una receta que quieras preparar.</p>
          </div>}
        </div>
        {isLoading ? <p>Cargando receta...</p> : null}
        <div className="input-chat">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="¿Qué vas a preparar hoy?"
            // style={{ flex: 1 }}
            />
            <button type="submit" className='boton-send'>
              <SendIcon />
            </button>
          </form>
        </div>
        <div ref={messagesEndRef} /> {/* Añade este div */}
      </div>
    </div>
  );
};

export default Chatbot;

