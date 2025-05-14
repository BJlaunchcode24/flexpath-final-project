import React, { useState } from "react";
import axios from "../utils/axiosInstance";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    cookingTime: 1,
    isPublic: false,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "cookingTime"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    const payload = { ...recipe, userId };
    console.log("Submitting recipe payload:", payload);
    try {
      await axios.post("/recipes", payload, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess(true);
      setRecipe({
        name: "",
        ingredients: "",
        instructions: "",
        cookingTime: 1,
        isPublic: false,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create recipe.");
      console.error("Recipe creation error:", err.response?.data || err.message || err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Recipe</h2>
      {success && <div className="alert alert-success">Recipe created successfully!</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="recipe-name">Recipe Name</label>
          <input
            id="recipe-name"
            type="text"
            name="name"
            className="form-control"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="ingredients">Ingredients (comma-separated)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="form-control"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            className="form-control"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            id="cookingTime"
            type="number"
            name="cookingTime"
            className="form-control"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="isPublic"
            id="isPublic"
            checked={recipe.isPublic}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isPublic">
            Make this recipe public
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;