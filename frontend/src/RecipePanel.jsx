import { useState } from "react";
import RecipeForm from "./RecipeForm";
import "./RecipePanel.css";
import DeleteConf from "./DeleteConf";

const RecipePanel = ({ recipe, onClose, updateCallback }) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isDeleteConfOpen, setIsDeleteConfOpen] = useState(false);

  const openUpdateRecipeForm = () => {
    if (isUpdateFormOpen) return;
    setIsUpdateFormOpen(true);
  };

  const closeUpdateRecipeForm = () => {
    setIsUpdateFormOpen(false);
  };

  const openDeleteConf = () => {
    setIsDeleteConfOpen(true);
  };

  const closeDeleteConf = () => {
    setIsDeleteConfOpen(false);
  };

  const onUpdate = () => {
    updateCallback();
    closeUpdateRecipeForm();
  };

  return (
    <div className="recipe-panel-overlay">
      <div className="recipe-panel">
        <div className="left-column">
          <h2 className="recipe-title">{recipe.title}</h2>
          <div className="recipe-photo">
            <img
              src={`http://127.0.0.1:5000/${recipe.image_path}`}
              alt={recipe.title}
            />
          </div>
          <div className="recipe-ingredients">
            <h3>Ingredients:</h3>
            <p>{recipe.ingredientList}</p>
          </div>
        </div>
        <div className="right-column">
          <div className="recipe-details">
            <p>
              <strong>Type:</strong> {recipe.recipeType}
            </p>
            <p>
              <strong>Prep Time:</strong> {recipe.prepTime}
            </p>
            <p>
              <strong>Difficulty:</strong> {recipe.recipeDiff}
            </p>
          </div>
          <div className="recipe-instructions">
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
          </div>
          <button className="update-button" onClick={openUpdateRecipeForm}>
            Update
          </button>
          <button className="delete-button" onClick={openDeleteConf}>
            Delete
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
        {isUpdateFormOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={closeUpdateRecipeForm}>
                &times;
              </button>
              <RecipeForm existingRecipe={recipe} updateCallback={onUpdate} />
            </div>
          </div>
        )}
        {isDeleteConfOpen && (
          <DeleteConf
            recipeId={recipe.id}
            onClose={closeDeleteConf}
            updateCallback={updateCallback}
          />
        )}
      </div>
    </div>
  );
};

export default RecipePanel;
