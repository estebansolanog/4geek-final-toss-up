import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/AddManualRecipe.css'
// import EditRecipeModal from './EditRecipeModal';
import '../../styles/AddManualRecipe.css'
import { Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ShareIcon from '@material-ui/icons/Share';
import Divider from '@material-ui/core/Divider';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import EditRecipeManualModal from './EditRecipeManualModal.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  plusButton: {
    position: 'fixed',
    bottom: '50%',
    right: '49%',
    zIndex: 2,
  },
  plusButtonWithHistoric: {
    position: 'fixed',
    bottom: '3%',
    right: '3%',
    zIndex: 2,
  },
}));


function AddManualRecipe() {
  const { store, actions } = useContext(Context);
  const [chatHistory, setChatHistory] = useState([]);
  const classes = useStyles();

  const [socialShareAnchorEl, setSocialShareAnchorEl] = useState(null);
  const [expandedChatIndex, setExpandedChatIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sharedChats, setSharedChats] = useState(new Set());
  const [refresh, setRefresh] = useState(false);
  const [infoUsuario, setInfoUsuario] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const refreshComponent = () => {
    setRefresh(refresh + 1);
  };

  const handleSave = () => {
    // Aquí puedes actualizar el estado de la receta si es necesario
    setIsModalOpen(false); // cerrar la modal después de guardar
    // Cambia el valor de 'refresh' para forzar una actualización de las recetas en la seccion "Mis Recetas"
    // setRefresh(prevRefresh => !prevRefresh);
    setChatHistory();
    refreshComponent(); // Refresca el componente para mostrar los cambios
  };

  //SECION HISTORICO DE RECETAS



  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rrecipe/AllManuelRecipes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setChatHistory(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChatHistory();
  }, [refresh]);


  const handleOpenSocialShareMenu = (event) => {
    setSocialShareAnchorEl(event.currentTarget);
  };

  const handleCloseSocialShareMenu = () => {
    setSocialShareAnchorEl(null);
  };

  const handleToggleExpandChat = (index) => {
    if (expandedChatIndex === index) {
      setExpandedChatIndex(null);
    } else {
      setExpandedChatIndex(index);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //DELETE RECIPE
  const DeleteRecipeChat = (chat) => {
    console.log(chat);
    setAnchorEl(null);
    setSocialShareAnchorEl(null);
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
  //FIN DE DELETE RECIPE

  //TRAER INFORMACIION DE USUARIO
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
  //FIN DE TRAER INFORMACIION DE USUARIO


  const handleLinkClick = () => {
    navigate("/myaccount")
  }

  // La función para refrescar el componente una vez se da guardar en la ventana modal


  return (
    <>
      <div className='recetas-container-upper'>
        {chatHistory && chatHistory.length > 0 ?
          <div className='container-add-recipe-manual-history-upper'>
            <Link className='link-to-myaccount' onClick={() => handleLinkClick('/myaccount')}>
              <h5 >Todas mis recetas</h5>
            </Link>
            <div>
              <Fab className={classes.plusButtonWithHistoric} color="primary" aria-label="add" onClick={handleOpenModal}>
                <AddIcon />
              </Fab>
              <EditRecipeManualModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
              />
            </div>
          </div> : <></>}
      </div>
      <div className="recetas-container">
        <div className='recetas-container-boby'>
          <div className='container-recipe-body-title'>
            {chatHistory && chatHistory.length > 0 ?
              <h2>Mis recetas</h2>
              :
              <></>}

          </div>
          <div className='.recetas-container-recipe'>
            {chatHistory && chatHistory.length > 0 ? [...chatHistory].reverse().map((chat, index) => (
              <div key={index}>
                <div>
                  <Fab className={classes.plusButtonWithHistoric} color="primary" aria-label="add" onClick={handleOpenModal}>
                    <AddIcon />
                  </Fab>
                  <EditRecipeManualModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                  />
                </div>
                <div>
                  {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
                  <div className="card-body bg bg-dark">
                    <h5 className="card-title text-white">{chat.name}</h5>
                    {expandedChatIndex === index ? (
                      <p className="card-text text-warning" style={{ whiteSpace: 'pre-wrap' }}>{chat.description}</p>
                    ) : (
                      <p className="card-text text-warning" style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.description}</p>
                    )}
                    <div className='add-manual-recipe_button-group'>
                      {chat.description && chat.description.split('\n').length > 3 && (
                        <Button className="btn-link text-warning" onClick={() => handleToggleExpandChat(index)}>
                          {expandedChatIndex === index ? "Ver menos" : "Ver más"}
                        </Button>
                      )}
                      <Button className="btn-warning rounded" color="warning" onClick={handleOpenSocialShareMenu}>
                        <i className="fa-solid fa-ellipsis-vertical btn-warning p-3 rounded"></i>
                      </Button>
                      <Menu
                        id="social-share-menu"
                        anchorEl={socialShareAnchorEl}
                        keepMounted
                        open={Boolean(socialShareAnchorEl)}
                        onClose={handleCloseSocialShareMenu}
                      >
                        {/* <MenuItem onClick={() => handleSocialShare('Facebook', chat)}><ShareIcon />Facebook</MenuItem>
                        <MenuItem onClick={() => handleSocialShare('Twitter', chat)}><ShareIcon />Twitter</MenuItem>
                        <MenuItem onClick={() => handleSocialShare('WhatsApp', chat)}><ShareIcon />WhatsApp</MenuItem> */}
                        <Divider />
                        {/* <Button onClick={() => { DeleteRecipeChat(chat) }}>
                          <MenuItem >Eliminar receta</MenuItem>
                        </Button> */}
                        <MenuItem onClick={() => DeleteRecipeChat(chat)}>Eliminar receta</MenuItem>

                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            )) : <div>
              <div className='container-chatless'>
                <p>Hola, <strong className='user-chat'>{infoUsuario}</strong>.</p>
                <p>Al parecer no haz creado ninguna receta aún.</p>
                <p>Para empezar. ¿Que tal si agregas una?</p>
              </div>
              <Fab className={classes.plusButton} color="primary" aria-label="add" onClick={handleOpenModal}>
                <AddIcon />
              </Fab>
              <EditRecipeManualModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
              />
            </div>}
          </div>
        </div>

      </div>
    </>
  );
}

export default AddManualRecipe;