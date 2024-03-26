import { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import "./App.css";

const App = () => {
  const [recipies, setRecipies] = useState([]);
  const [recipeFormOpen, setRecipeFormOpen] = useState(false);

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
    setRecipeFormOpen(false);
  };

  const openAddRecipeForm = () => {
    if (!recipeFormOpen) setRecipeFormOpen(true);
  };

  const openUpdateRecipeForm = () => {};

  return (
    <>
      <RecipeList recipes={recipies} />
      <button onClick={openAddRecipeForm}>Add a new recipe!</button>
      {recipeFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={closeRecipeForm}>
              &times;
            </button>
            <RecipeForm />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
