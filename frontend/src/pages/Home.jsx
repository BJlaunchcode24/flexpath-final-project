import React from "react";
import { Link } from "react-router-dom";

const fadeInStyle = {
  opacity: 0,
  animation: "fadeIn 1s ease-in forwards",
  animationDelay: "0.3s",
};

const keyframes = `
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
`;

const Home = () => {
  return (
    <>
      <style>{keyframes}</style>

      <div className="container mt-5 text-center">
        <div className="mb-4">
          <img
            src="/banner.jpg"
            alt="Banner"
            className="img-fluid rounded"
            style={{ objectFit: "cover", maxHeight: "300px", width: "100%" }}
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/800x300?text=Banner+Image")
            }
          />
        </div>

        <h1 className="display-4" style={fadeInStyle}>
          Welcome to the Recipe & Meal Planner App
        </h1>
        <p className="lead" style={fadeInStyle}>
          Organize your meals, save your favorite recipes, and build weekly plans.
        </p>

        <div className="row mt-5">
          <div className="col-md-6 mb-4" style={fadeInStyle}>
            <div className="card h-100 shadow-sm">
              <img
                src="/recipe.jpg"
                alt="Recipes"
                className="img-fluid rounded-top"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300x200?text=Recipe+Image") } />
              <div className="card-body">
                <h5 className="card-title">Browse & Create Recipes</h5>
                <p className="card-text">Search, add, and manage your recipes.</p>
                <Link to="/recipes" className="btn btn-primary m-1">
                  View Recipes
                </Link>
                <Link to="/create" className="btn btn-outline-primary m-1">
                  Create Recipe
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4" style={fadeInStyle}>
            <div className="card h-100 shadow-sm">
              <img
                src="/mealplan.jpg"
                alt="Meal Plans"
                className="img-fluid rounded-top"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300x200?text=Meal+Plan+Image")}/>
              <div className="card-body">
                <h5 className="card-title">Plan Your Meals</h5>
                <p className="card-text">Group recipes into meal plans.</p>
                <Link to="/mealplans" className="btn btn-success m-1">
                  View Meal Plans
                </Link>
                <Link to="/mealplans/create" className="btn btn-outline-success m-1">
                  Create Meal Plan
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5" style={fadeInStyle}>
          <p className="text-muted">Built with React, Bootstrap, and Spring Boot</p>
        </div>
      </div>
    </>
  );
};

export default Home;

      
         // <p className="text-muted">©Blerta Jaupaj Launch Code </p>