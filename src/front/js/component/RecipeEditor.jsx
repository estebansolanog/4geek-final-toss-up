import React, { useState } from 'react';

const RecipeEditor = ({ recipe, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleRecipeChange = (event) => {
    setEditedRecipe(event.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(editedRecipe);
  };

  return isEditing ? (
    <div>
      <textarea value={editedRecipe} onChange={handleRecipeChange} />
      <button onClick={handleSaveClick}>Guardar</button>
    </div>
  ) : (
    <div>
      <p>{recipe}</p>
      <button onClick={handleEditClick}>Editar</button>
    </div>
  );
};

export default RecipeEditor;
