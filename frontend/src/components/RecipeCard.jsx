import React from "react";

const RecipeCard = ({ recipe, handleDelete }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary">{recipe.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{recipe.description}</h6>

          <div className="mt-3 mb-2">
            <strong>Ingredients:</strong>
            <ul>
              {recipe.ingredients?.split(",").map((item, idx) => (
                <li key={idx}>{item.trim()}</li>
              ))}
            </ul>

            <strong>Instructions:</strong>
            <p>{recipe.instructions}</p>
          </div>

          <button
            className="btn btn-outline-danger mt-auto"
            onClick={() => handleDelete(recipe.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;