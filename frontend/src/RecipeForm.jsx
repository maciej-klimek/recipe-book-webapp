import { useState } from "react";

const RecipeForm = ({ existingRecipe = {}, updateCallback }) => {
  const [title, setTitle] = useState(existingRecipe.title || "");
  const [recipeType, setRecipeType] = useState(existingRecipe.recipeType || "");
  const [prepTime, setPrepTime] = useState(existingRecipe.prepTime || "");
  const [ingredientList, setIngredientList] = useState(
    existingRecipe.ingredientList || ""
  );
  const [instructions, setInstructions] = useState(
    existingRecipe.instructions || ""
  );

  const updating = Object.entries(existingRecipe).length !== 0;

  const submitRecipe = async (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      recipeType,
      prepTime,
      ingredientList,
      instructions,
    };

    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_recipe/${existingRecipe.id}` : "add_recipe");
    const requestOptions = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(recipeData),
    };

    const response = await fetch(url, requestOptions);
    if (response.status !== 201 && response.status !== 200) {
      const responseData = await response.json();
      alert(responseData.message);
    } else {
      updateCallback();
      alert("giiiit");
    }
  };

  return (
    <form onSubmit={submitRecipe}>
      <div>
        <label htmlFor="title">Recipe Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="recipeType">Recipe Type:</label>
        <input
          type="text"
          id="recipeType"
          value={recipeType}
          onChange={(e) => setRecipeType(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="prepTime">Preparation Time:</label>
        <input
          type="text"
          id="prepTime"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ingredientList">Ingredient List:</label>
        <input
          type="text"
          id="ingredientList"
          value={ingredientList}
          onChange={(e) => setIngredientList(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="instructions">Instructions:</label>
        <input
          type="text"
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>
      <button type="submit">
        {updating ? "Update this recipe." : "Add this recipe."}
      </button>
    </form>
  );
};

export default RecipeForm;
