import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const AssignRecipes = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedMealPlanId, setSelectedMealPlanId] = useState("");
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/mealplans").then((res) => {
      setMealPlans(res.data);
    });
    axios.get("/recipes/public").then((res) => {
      setRecipes(res.data);
    });
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMealPlanId || selectedRecipeIds.length === 0) {
      setMessage("Please select a meal plan and at least one recipe.");
      return;
    }

    try {
      await axios.post(`/mealplans/${selectedMealPlanId}/recipes`, selectedRecipeIds);
      setMessage("Recipes assigned successfully!");
      setSelectedRecipeIds([]);
    } catch (err) {
      console.error(err);
      setMessage("Error assigning recipes.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Assign Recipes to Meal Plan</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Select Meal Plan</label>
          <select
            className="form-select"
            value={selectedMealPlanId}
            onChange={(e) => setSelectedMealPlanId(e.target.value)}
            required
          >
            <option value="">-- Choose a meal plan --</option>
            {mealPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Recipes</label>
          <div className="form-check">
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`recipe-${recipe.id}`}
                  checked={selectedRecipeIds.includes(recipe.id)}
                  onChange={() => handleCheckboxChange(recipe.id)}
                />
                <label className="form-check-label ms-2" htmlFor={`recipe-${recipe.id}`}>
                  {recipe.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Assign Recipes</button>
      </form>
    </div>
  );
};

export default AssignRecipes;
