import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance"; // axios instance with JWT interceptor

const CreateRecipe = () => {
  const user = JSON.parse(localStorage.getItem("user")); // get logged in user

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    isPublic: false,
    userId: user?.username || "", // backend expects username
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRecipe({
      ...recipe,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/recipes", recipe); // token auto-included via interceptor
      setSuccess(true);
      setRecipe({
        name: "",
        ingredients: "",
        instructions: "",
        cookingTime: "",
        isPublic: false,
        userId: user?.username || "",
      });
    } catch (err) {
      console.error("Error creating recipe:", err);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="container mt-4">
      <h2>Create New Recipe</h2>
      {success && <div className="alert alert-success">Recipe created successfully!</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Recipe Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients (comma-separated)</label>
          <textarea
            name="ingredients"
            className="form-control"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            name="instructions"
            className="form-control"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cooking Time (minutes)</label>
          <input
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
