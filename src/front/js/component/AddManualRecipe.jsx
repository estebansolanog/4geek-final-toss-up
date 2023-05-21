import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/AddManualRecipe.css'

function AddManualRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeImage, setRecipeImage] = useState(null);

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
            .catch(error => console.error("ERRORRRRRR!!!", error));
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
            .catch(error => console.error("ERRORRRRRR!!!", error));
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setRecipeName('');
        setRecipeDescription('');
        setRecipeImage(null);
    };

    return (
        <div className='container'>
            <form onSubmit={handleSaveClick} className="m-3">
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
                <button type="button" className="btn btn-alert" onClick={handleCancelClick}>Cancelar</button>
                <button type="submit" className="btn btn-primary" onClick={handleSaveClick} >Guardar</button>
                <button type="submit" className="btn btn-primary" onClick={handleSaveAndShareClick} >Guardar y Compartir</button>

            </form>
        </div>
    );
}

export default AddManualRecipe;
