import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMealPlans = async () => {
    try {
      const res = await axios.get("/mealplans");
      setMealPlans(res.data);
    } catch (err) {
      console.error("Failed to fetch meal plans", err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/mealplans/search?keyword=${searchTerm}`);
      setMealPlans(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    fetchMealPlans();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/mealplans/${id}`);
      setMealPlans(mealPlans.filter((plan) => plan.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Meal Plans</h2>

      <div className="mb-4 d-flex gap-2">
        <input
          type="text"
          placeholder="Search meal plans..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="row">
        {mealPlans.map((plan) => (
          <div key={plan.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{plan.name}</h5>
                <p className="card-text">{plan.description}</p>
                <p className="text-muted">
                  Public: {plan.isPublic ? "Yes" : "No"}
                </p>
                <p className="text-muted">
                  Created at: {new Date(plan.createdAt).toLocaleDateString()}
                </p>

                <div className="d-flex justify-content-between mt-3">
                  <Link
                    to={`/mealplans/view?id=${plan.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Recipes
                  </Link>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlans;
