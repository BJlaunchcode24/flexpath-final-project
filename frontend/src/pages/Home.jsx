import React from "react";
import { Link, useNavigate } from "react-router-dom";

const fadeInStyle = {
  opacity: 0,
  animation: "fadeIn 1s ease-in forwards",
  animationDelay: "0.1s",
};

const keyframes = `
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
`;

const Home = () => {
  const navigate = useNavigate();

  const handleProtectedNav = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: { pathname: path } } });
    } else {
      navigate(path);
    }
  };

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
          Welcome to the Recipe App
        </h1>

        <div className="row mt-5 justify-content-center">
          <div className="col-md-6 mb-4" style={fadeInStyle}>
            <div className="card h-100 shadow-sm">
              <img
                src="/recipe.jpg"
                alt="Recipes"
                className="img-fluid rounded-top"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300x200?text=Recipe+Image")
                }
              />
              <div className="card-body">
                <h5 className="card-title">Browse & Create Recipes</h5>
                <p className="card-text">Search, add, and manage your recipes.</p>
                <Link to="/recipes" className="btn btn-primary m-1">
                  View Recipes
                </Link>
                <button
                  className="btn btn-outline-primary m-1"
                  onClick={() => handleProtectedNav("/create")}
                >
                  Create Recipe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5" style={fadeInStyle}>
          <p className="text-muted">©BlertaJaupajLaunchCode</p>
        </div>
      </div>
    </>
  );
};

export default Home;