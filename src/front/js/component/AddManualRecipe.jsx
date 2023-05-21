import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/AddManualRecipe.css'

import Button from '@material-ui/core/Button';

function AddManualRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeImage, setRecipeImage] = useState(null);
    const [formKey, setFormKey] = useState(Math.random());


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

    return (
        <div className='container-add-recipe-manual'>
            <div className='container-add-recipe-manual-title'>
                <h2>Agregar receta</h2>
            </div>
            <form key={formKey} onSubmit={handleSaveClick} className="m-3">
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="mb-3">
                    <label htmlFor="recipeImage" className="form-label">Imagen de la receta</label>
                    <input
                        type="file"
                        className="form-control"
                        id="recipeImage"
                        onChange={(e) => setRecipeImage(e.target.files[0])}
                        required
                    />
                </div>
                <div className='container-add-recipe-manual-button'>
                    <Button onClick={handleCancelClick} color="secondary">Cancelar</Button>
                    <div>
                        <Button onClick={handleSaveClick} color="primary" >Guardar</Button>
                        <Button onClick={handleSaveAndShareClick} color="primary" border="primary" >Guardar y Compartir</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddManualRecipe;
