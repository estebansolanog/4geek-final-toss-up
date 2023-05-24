import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../styles/EditRecipeManualModal.css"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  editRecipeModalContainer: {
    width: '600px',
  },
  editRecipeModalInputUser: {
    height: "100px",
    color: "red",
  },
}));

const EditRecipeManualModal = ({ open, onClose, onSave }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);

  const [id, setId] = useState('');

  const [refresh, setRefresh] = useState(false);

  const classes = useStyles();

  //FUNCION Y RUTA PARA GUARDAR RECETA
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
        onClose();
        setRefresh(prevRefresh => !prevRefresh); // Agrega esta línea aquí
        onSave()


      })
      .catch(error => {
        console.error("ERRORRRRRR!!!", error)
      });
  };
  //FIN FUNCION Y RUTA PARA GUARDAR RECETA

  //INICIO DE FUNCION Y RUTA PARA GUARDAR Y COMPARTIR RECETA
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
        onClose();
        setRefresh(prevRefresh => !prevRefresh); // Agrega esta línea aquí
        onSave()

      })
      .catch(error => {
        console.error("ERRORRRRRR!!!", error)
      });
  };
  //FIN DE FUNCION Y RUTA PARA GUARDAR Y COMPARTIR RECETA

  const handleCancelClick = (e) => {
    e.preventDefault();
    setRecipeName('');
    setRecipeDescription('');
    setRecipeImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      // Guarda el archivo de imagen en sí, no su URL
      setRecipeImage(e.target.files[0]);

      // Leer el archivo de imagen y establecer la URL de previsualización
      const reader = new FileReader();
      reader.addEventListener('load', () => setPreviewImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} >
      <DialogTitle>Agregar Receta</DialogTitle>
      <DialogContent className={classes.editRecipeModalContainer}>
        <TextField className="editRecipeModalInputUser"
          autoFocus
          margin="dense"
          id="query"
          label="Nombre de receta"
          type="text"
          fullWidth
          // value={editedQuery}
          onChange={event => setRecipeName(event.target.value)}
        />
        <TextField
          className='editRecipeModalInput'
          margin="dense"
          id="recipe"
          label="Descripcion de receta"
          type="text"
          fullWidth
          multiline
          minRows={12}
          // value={editedRecipe}
          onChange={event => setRecipeDescription(event.target.value)}
        />

        <div className='container_image_and_uploader'>
          {/* Muestra la imagen de previsualización si está disponible, de lo contrario muestra la imagen original */}
          <img className='imageRecipe'
            src={previewImage || recipeImage}
            alt="Agrega una imagen"
            style={{ width: '100px', height: '100px', objectFit: 'cover', color: "gray" }}
          />

          {/* Subir nueva imagen */}
          <label htmlFor="Subir imagen"></label>
          <input className='' style={{ display: 'block', width: '100%' }} type="file" onChange={handleImageChange} />
        </div>

      </DialogContent>
      <DialogActions>
        <div className='container-add-recipe-manual-button'>
          <Button onClick={onClose} color="secondary">Cancelar</Button>
          <div>
            <Button onClick={handleSaveClick} color="primary" >Guardar</Button>
            <Button onClick={handleSaveAndShareClick} color="primary" border="primary" >Guardar y Compartir</Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default EditRecipeManualModal;