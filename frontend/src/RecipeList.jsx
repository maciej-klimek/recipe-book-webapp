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
    <div>
      <h1>Recipes</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Recipe Type</th>
            <th>Preparation Time</th>
            <th>Ingredient List</th>
            <th>Instructions</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => {
            return (
              <tr key={recipe.id}>
                <td>
                  <img
                    src={`http://127.0.0.1:5000/${recipe.image_path}`}
                    alt={recipe.title}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{recipe.title}</td>
                <td>{recipe.recipeType}</td>
                <td>{recipe.prepTime}</td>
                <td>{recipe.ingredientList}</td>
                <td>{recipe.instructions}</td>
                <td>
                  <button onClick={() => updateRecipe(recipe)}>Update</button>
                  <button onClick={() => deleteRecipe(recipe.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeList;
