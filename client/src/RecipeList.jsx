import { useState } from "react";
import RecipePanel from "./RecipePanel";
import "./RecipeList.css";

const RecipeList = ({ recipes, updateCallback }) => {
  const [isRecipePanelOpen, setIsRecipePanelOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  const closeRecipePanel = () => {
    if (!isRecipePanelOpen) return;
    setIsRecipePanelOpen(false);
  };

  const openRecipePanel = (recipe) => {
    if (isRecipePanelOpen) return;
    setCurrentRecipe(recipe);
    setIsRecipePanelOpen(true);
  };

  const onUpdate = () => {
    closeRecipePanel();
    updateCallback();
  };

  return (
    <div className="recipe-list">
      <h1>Recipes:</h1>
      {recipes.map((recipe) => (
        <div
          className="recipe-item"
          key={recipe.id}
          onClick={() => openRecipePanel(recipe)}
        >
          <div className="recipe-details">
            <div className="left-section">
              <div className="recipe-title">{recipe.title}</div>
              <div className="recipe-type-time">
                <div>{recipe.recipeType}</div>
                <div>{recipe.prepTime}</div>
              </div>
              <div className="recipe-difficulty">{recipe.recipeDiff}</div>
            </div>
            <div className="right-section">
              <div className="recipe-image-container">
                <img
                  src={`http://127.0.0.1:5000/${recipe.image_path}`}
                  alt={recipe.title}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {isRecipePanelOpen && (
        <RecipePanel
          recipe={currentRecipe}
          onClose={closeRecipePanel}
          updateCallback={onUpdate}
        ></RecipePanel>
      )}
    </div>
  );
};

export default RecipeList;
