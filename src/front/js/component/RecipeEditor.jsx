import React, { useState, useEffect } from 'react';

import "../../styles/RecipeEditor.css";

const RecipeEditor = ({ currentRecipe, onSave }) => {
  const [editedImage, setEditedImage] = useState(null);
  const [editedQuery, setEditedQuery] = useState('');
  const [editedRecipe, setEditedRecipe] = useState('');

  // Este efecto se ejecuta cada vez que currentRecipe cambia
  useEffect(() => {
    if (currentRecipe) {
      setEditedImage(currentRecipe.image_of_recipe);
      setEditedQuery(currentRecipe.user_query);
      setEditedRecipe(currentRecipe.description);
    }
  }, [currentRecipe]);

  const handleImageChange = (event) => {
    setEditedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleQueryChange = (event) => {
    setEditedQuery(event.target.value);
  };

  const handleRecipeChange = (event) => {
    setEditedRecipe(event.target.value);
  };

  const handleSaveClick = () => {
    if (currentRecipe) {
      onSave({
        ...currentRecipe,
        image_of_recipe: editedImage,
        user_query: editedQuery,
        description: editedRecipe,
      });
    }
  };

  // Si currentRecipe no está definido, no renderizamos nada
  if (!currentRecipe) {
    return null;
  }

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
          {editedImage && <img src={editedImage} alt="Preview" />}
        </label>
        <label>
          User Query:
          <input type="text" value={editedQuery} onChange={handleQueryChange} />
        </label>
        <label className='textRecipe'>
          Recipe:
          <textarea value={editedRecipe} onChange={handleRecipeChange} />
        </label>
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
      </form>
    </div>
  );
};

export default RecipeEditor;



// import React, { useState } from 'react';

// const RecipeEditor = ({ recipe, onSave }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedRecipe, setEditedRecipe] = useState(recipe);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleRecipeChange = (event) => {
//     setEditedRecipe(event.target.value);
//   };

//   const handleSaveClick = () => {
//     setIsEditing(false);
//     onSave(editedRecipe);
//   };

//   return isEditing ? (
//     <div>
//       <textarea value={editedRecipe} onChange={handleRecipeChange} />
//       <button onClick={handleSaveClick}>Guardar</button>
//     </div>
//   ) : (
//     <div>
//       <p>{recipe}</p>
//       <button onClick={handleEditClick}>Editar</button>
//     </div>
//   );
// };

// export default RecipeEditor;
