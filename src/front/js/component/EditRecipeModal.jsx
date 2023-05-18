import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';

import "../../styles/EditRecipeModal.css"

const EditRecipeModal = ({ open, onClose, chat, onSave }) => {
  const [editedRecipe, setEditedRecipe] = useState('');
  const [editedQuery, setEditedQuery] = useState('');
  const [editedImage, setEditedImage] = useState(null);
  const [id, setId] = useState('');

  useEffect(() => {
    if (chat) {
      setEditedRecipe(chat.description);
      setEditedQuery(chat.user_query);
      setEditedImage(chat.image_of_recipe);
      setId(chat.id);
    }
  }, [chat]);

  const handleSaveClick = (e) => {
    e.preventDefault();

    let body = new FormData();
    body.append('image_of_recipe', editedImage);  // donde editedImage es la imagen editada que seleccionó el usuario
    body.append('description', editedRecipe);
    body.append('user_query', editedQuery);
    body.append('id', id);


    const options = {
      body,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        // "Content-Type": "multipart/form-data"
      }

    };
    // you need to have the user_id in the localStorage
    // const currentUserId = localStorage.getItem("token"); //Aquí tienen que colocar el token
    fetch(`http://localhost:3001/chat/EditRecipeChat`, options)
      .then(resp => resp.json())
      .then(data => console.log("Success!!!!", data))
      .catch(error => console.error("ERRORRRRRR!!!", error));
  };


  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      // Guarda el archivo de imagen en sí, no su URL
      setEditedImage(e.target.files[0]);
    }
  };



  return (
    <Dialog open={open} onClose={onClose} className='editRecipeModalContainer'>
      <DialogTitle>Editar Receta</DialogTitle>
      <DialogContent className='editRecipeModalBody'>
        <TextField className='editRecipeModalInputUser'
          autoFocus
          margin="dense"
          id="query"
          label="Consulta"
          type="text"
          fullWidth
          value={editedQuery}
          onChange={event => setEditedQuery(event.target.value)}
        />
        <TextField className='editRecipeModalInput'
          margin="dense"
          id="recipe"
          label="Receta"
          type="text"
          fullWidth
          multiline
          minRows={4}
          value={editedRecipe}
          onChange={event => setEditedRecipe(event.target.value)}
        />

        <div className='container_image_and_uploader'>        {/* Imagen actual */}
          {editedImage && <img className='imageRecipe' src={editedImage} alt="current" />}

          {/* Subir nueva imagen */}
          <label htmlFor="Subir imagen"></label>
          <input className='' style={{ display: 'block', width: '100%' }} type="file" onChange={handleImageChange} />

          {/* <input className='inputUploadImage' type="file" onChange={handleImageChange} /> */}
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSaveClick} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRecipeModal;