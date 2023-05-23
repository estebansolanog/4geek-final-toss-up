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

const useStyles = makeStyles((theme) => ({
  plusButton: {
    position: 'fixed',
    bottom: '50%',
    right: '50%',
    zIndex: 2,
  },
  plusButtonWithHistoric: {
    position: 'fixed',
    top: '15%',
    right: '3%',
    zIndex: 2,
  },
}));


function AddManualRecipe() {
  const { store, actions } = useContext(Context);
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [formKey, setFormKey] = useState(Math.random());
  const [chatHistory, setChatHistory] = useState([]);
  const classes = useStyles();

  const [socialShareAnchorEl, setSocialShareAnchorEl] = useState(null);
  const [expandedChatIndex, setExpandedChatIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sharedChats, setSharedChats] = useState(new Set());
  const [refresh, setRefresh] = useState(false);
  const [infoUsuario, setInfoUsuario] = useState(null)
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); //Para manejar el click en el botón de compartir y abrir la ventana modal para editar la receta
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Aquí puedes actualizar el estado de la receta si es necesario
    setIsModalOpen(false); // cerrar la modal después de guardar
  };



  //Ruta para guardar la receta
  const handleSaveClick = (e) => {
    e.preventDefault();

    let body = new FormData();
    body.append('image_of_recipe', recipeImage);
    body.append('name', recipeName);
    body.append('description', recipeDescription);
    const options = {
      body,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    };

    fetch(`http://localhost:3001/rrecipe/AddRecipe`, options)
      .then(resp => resp.json())
      .then(data => console.log("Success!!!!", data))
      .then(data => {
        console.log("Success!!!!", data);
        setRecipeName('');
        setRecipeDescription('');
        setRecipeImage(null);
        setFormKey(Math.random());  // Esto es para que se resetee el formulario
      })
      .catch(error => {
        console.error("ERRORRRRRR!!!", error)
        setRecipeName('');
        setRecipeDescription('');
        setRecipeImage(null)
        setFormKey(Math.random());  // Esto es para que se resetee el formulario
      });
  };
  //Ruta para guardar y compartir la receta
  const handleSaveAndShareClick = (e) => {
    e.preventDefault();

    let body = new FormData();
    body.append('image_of_recipe', recipeImage);
    body.append('name', recipeName);
    body.append('description', recipeDescription);
    const options = {
      body,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    };

    fetch(`http://localhost:3001/rrecipe/AddAndShareRecipe`, options)
      .then(resp => resp.json())
      .then(data => console.log("Success!!!!", data))
      .then(data => {
        console.log("Success!!!!", data);
        setRecipeName('');
        setRecipeDescription('');
        setRecipeImage(null);
        setFormKey(Math.random());  // Esto es para que se resetee el formulario
      })
      .catch(error => {
        console.error("ERRORRRRRR!!!", error)
        setRecipeName('');
        setRecipeDescription('');
        setRecipeImage(null)
        setFormKey(Math.random());  // Esto es para que se resetee el formulario
      });
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setRecipeName('');
    setRecipeDescription('');
    setRecipeImage(null);
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
  }, []);


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

  return (
    <div className='container_manual-recipe'>
      <div className='container-add-recipe-manual-history'>
        <div className="recetas-container">
          <div className='container-add-recipe-manual-history-upper'>
            {/* <h2>Todas mis recetas</h2> */}
            {/* <div>
              <Fab className={classes.plusButtonWithHistoric} color="primary" aria-label="add" onClick={handleOpenModal}>
                <AddIcon />
              </Fab>
              <EditRecipeManualModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
              />
            </div> */}
          </div>

          <div className='container-add-recipe-manual-history-title'><h2>Otras recetas mías</h2></div>
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
              <div className="card d-none d-xs-block d-sm-block d-md-block " style={{ width: "26rem" }}>

                {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
                <div className="card-body bg bg-dark">
                  <h5 className="card-title text-white">{chat.name}</h5>
                  {expandedChatIndex === index ? (
                    <p className="card-text text-warning" style={{ whiteSpace: 'pre-wrap' }}>{chat.description}</p>
                  ) : (
                    <p className="card-text text-warning" style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.description}</p>
                  )}
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
          )) : <div>
            <div className='container-chatless'>
              <p>Hola, <span className='user-chat'>{infoUsuario}</span>.</p>
              <p>Al parecer no haz creado recetas aún.</p>
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
  );
}

export default AddManualRecipe;

{/* <div className='container-add-recipe-manual'>
        <div className='container-add-recipe-manual-title'>
          <h2>Agregar receta</h2>
        </div>
        <form key={formKey} onSubmit={handleSaveClick} className="recipe-add-form">
          <div className="mb-3 container-add-recipe-mual-single">
            <label htmlFor="recipeName" className="form-label">Nombre de la receta</label>
            <input
              type="text"
              className="form-control"
              id="recipeName"
              placeholder="Ej. Torta de chocolate"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 recipe-add-form">
            <label htmlFor="recipeDescription" className="form-label">Descripción de la receta</label>
            <textarea
              className="form-control recipe-description"
              id="recipeDescription"
              placeholder='Ej. "Esta torta de chocolate es muy rica"'
              rows="3"
              maxLength="1200"
              value={recipeDescription}
              onChange={(e) => setRecipeDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3 recipe-add-form">
            <label htmlFor="recipeImage" className="form-label">Imagen de la receta</label>
            <input
              type="file"
              className="form-control"
              id="recipeImage"
              onChange={(e) => setRecipeImage(e.target.files[0])}
              required
            />
          </div>
          <div className='container-add-recipe-manual-button '>
            <Button onClick={handleCancelClick} color="secondary">Cancelar</Button>
            <div>
              <Button onClick={handleSaveClick} color="primary" >Guardar</Button>
              <Button onClick={handleSaveAndShareClick} color="primary" border="primary" >Guardar y Compartir</Button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <div className='container-add-recipe-manual-history-title'><h2>Todas mis recetas</h2></div>
        <div className='container-add-recipe-manual-history'>
          <div className="recetas-container">
            <div>

              {chatHistory && chatHistory.length > 0 ? [...chatHistory].reverse().map((chat, index) => (
                <div key={index}>
                  <div className="card d-none d-xs-block d-sm-block d-md-block " style={{ width: "26rem" }}>

                    {chat.image_of_recipe && <img className="responsive-image" src={chat.image_of_recipe} alt="recipe" />}
                    <div className="card-body bg bg-dark">
                      <h5 className="card-title text-white">{chat.name}</h5>
                      {expandedChatIndex === index ? (
                        <p className="card-text text-warning" style={{ whiteSpace: 'pre-wrap' }}>{chat.description}</p>
                      ) : (
                        <p className="card-text text-warning" style={{ maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.description}</p>
                      )}
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
              )) : <div>
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
      </div> */}

