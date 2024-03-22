
function RecipeList({recipes}) {
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
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            <td>{recipe.title}</td>
                            <td>{recipe.recipeType}</td>
                            <td>{recipe.prepTime}</td>
                            <td>{recipe.ingredientList}</td>
                            <td>{recipe.instructions}</td>
                            <td>
                                <button>Update</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecipeList