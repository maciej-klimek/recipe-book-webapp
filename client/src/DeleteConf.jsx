import "./DeleteConf.css";

const DeleteConf = ({ recipeId, onClose, updateCallback }) => {
  const deleteRecipe = async () => {
    const url = `http://127.0.0.1:5000/delete_recipe/${recipeId}`;
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
    onClose();
  };

  const cancelDelete = () => {
    onClose();
  };

  return (
    <div className="delete-conf-overlay">
      <div className="delete-conf-modal">
        <h2>Are you sure you want to delete this recipe?</h2>
        <div className="button-group">
          <button className="delete-confirm" onClick={deleteRecipe}>
            Yes
          </button>
          <button className="cancel" onClick={cancelDelete}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConf;
