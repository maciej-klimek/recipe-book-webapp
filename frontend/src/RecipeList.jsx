import "./RecipeList.css";

const RecipeList = ({ recipes, updateRecipe, updateCallback }) => {
  const deleteRecipe = async (id) => {
    const url = `http://127.0.0.1:5000/delete_recipe/${id}`;
    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(url, requestOptions);
    if (response.status !== 201 && response.status !== 200) {
      const responseData = await response.json();
      alert(responseData.message);
    } else {
      updateCallback();
      alert("Recipe deleted");
    }
  };

  return (
    <div className="recipe-list">
      <h1>Recipes:</h1>
      {recipes.map((recipe) => (
        <div className="recipe-item" key={recipe.id}>
          <div className="recipe-details">
            <div className="left-section">
              <div className="recipe-title">{recipe.title}</div>
              <div className="recipe-type-time">
                <div>{recipe.recipeType}</div>
                <div>{recipe.prepTime}</div>
              </div>
              <div className="recipe-difficulty">{recipe.recipeDiff}</div>
              <div className="recipe-actions">
                <button onClick={() => updateRecipe(recipe)}>Update</button>
                <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </div>
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
    </div>
  );
};

export default RecipeList;
