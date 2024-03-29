import { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import "./App.css";

const App = () => {
  const [recipies, setRecipies] = useState([]);
  const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    fetchRecipies();
  }, []);

  const fetchRecipies = async () => {
    const response = await fetch("http://127.0.0.1:5000/recipies");
    const data = await response.json();
    setRecipies(data.recipies);
    console.log(data.recipies);
  };

  const closeRecipeForm = () => {
    setCurrentRecipe({});
    setIsRecipeFormOpen(false);
  };

  const openAddRecipeForm = () => {
    if (!isRecipeFormOpen) setIsRecipeFormOpen(true);
  };

  const openUpdateRecipeForm = (recipe) => {
    if (isRecipeFormOpen) return;
    setCurrentRecipe(recipe);
    setIsRecipeFormOpen(true);
  };

  const onUpdate = () => {
    fetchRecipies();
    closeRecipeForm();
  };

  return (
    <>
      <RecipeList
        recipes={recipies}
        updateRecipe={openUpdateRecipeForm}
        updateCallback={onUpdate}
      />
      <button onClick={openAddRecipeForm}>Add a new recipe!</button>
      {isRecipeFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={closeRecipeForm}>
              &times;
            </button>
            <RecipeForm
              existingRecipe={currentRecipe}
              updateCallback={onUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
