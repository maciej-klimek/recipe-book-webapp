import { useState } from "react";
import RecipeForm from "./RecipeForm";
import DeleteConf from "./DeleteConf";
import "./RecipePanel.css";

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
        <div className="panel-left-column">
          <h2 className="panel-recipe-title">{recipe.title}</h2>
          <div className="panel-recipe-photo">
            <img
              src={`http://127.0.0.1:5000/${recipe.image_path}`}
              alt={recipe.title}
            />
          </div>
          <div className="panel-recipe-instructions">
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
        <div className="panel-right-column">
          <div className="panel-recipe-details">
            <p>
              {recipe.recipeType} | {recipe.prepTime} | {recipe.recipeDiff}
            </p>
          </div>
          <div className="panel-recipe-ingredients">
            <h3>Ingredients:</h3>
            <p>{recipe.ingredientList}</p>
          </div>
          <div className="panel-buttons">
            <button
              className="panel-update-button"
              onClick={openUpdateRecipeForm}
            >
              Update
            </button>
            <button className="panel-delete-button" onClick={openDeleteConf}>
              Delete
            </button>
          </div>
          <button className="panel-close-button" onClick={onClose}>
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
