import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const res = query
        ? await axios.get(`/recipes/search?q=${query}`)
        : await axios.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipes.");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/recipes/${id}`);
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Recipes</h2>

      <form className="mb-4" onSubmit={handleSearch}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">Search</button>
          <button className="btn btn-outline-secondary" type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                  <p className="card-text"><strong>Instructions:</strong> {recipe.instructions}</p>
                  <p className="text-muted">Cooking time: {recipe.cookingTime} minutes</p>
                  <p className="text-muted">Public: {recipe.isPublic ? "Yes" : "No"}</p>
                  <p className="text-muted">Created at: {new Date(recipe.createdAt).toLocaleDateString()}</p>
                  <button
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => handleDelete(recipe.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recipes;