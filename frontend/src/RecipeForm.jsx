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
  const [image, setImage] = useState();

  const updating = Object.entries(existingRecipe).length !== 0;

  const handleImageUpload = async (e) => {
    setImage(e.target.files[0]);
  };
  const submitRecipe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const recipeData = {
      title,
      recipeType,
      prepTime,
      ingredientList,
      instructions,
    };

    formData.append("recipe_data", JSON.stringify(recipeData));
    formData.append("image", image);

    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_recipe/${existingRecipe.id}` : "add_recipe");
    const requestOptions = {
      method: updating ? "PATCH" : "POST",
      body: formData,
    };

    const response = await fetch(url, requestOptions);
    if (response.status !== 201 && response.status !== 200) {
      const responseData = await response.json();
      alert(responseData.message);
    } else {
      updateCallback();
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
      <div>
        <label htmlFor="image">Recipe image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => handleImageUpload(e)}
        />
      </div>
      <button type="submit">
        {updating ? "Update this recipe." : "Add this recipe."}
      </button>
    </form>
  );
};

export default RecipeForm;
